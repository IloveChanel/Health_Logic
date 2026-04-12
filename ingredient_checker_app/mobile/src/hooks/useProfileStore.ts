import { useCallback, useEffect, useState } from "react";
import { defaultUserProfile, UserProfile } from "../types/domain";
import { loadUserProfile, saveUserProfile } from "../services/storage/profileStorage";

export function useProfileStore() {
  const [profile, setProfile] = useState<UserProfile>(defaultUserProfile);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const stored = await loadUserProfile();
      setProfile(stored);
      setIsLoaded(true);
    })();
  }, []);

  const updateProfile = useCallback(async (patch: Partial<UserProfile>) => {
    setProfile((prev) => {
      const next = { ...prev, ...patch };
      void saveUserProfile(next);
      return next;
    });
  }, []);

  const toggleListValue = useCallback(
    async (key: keyof UserProfile, value: string) => {
      setProfile((prev) => {
        const current = Array.isArray(prev[key]) ? ([...prev[key]] as string[]) : [];
        const exists = current.includes(value);
        const nextList = exists
          ? current.filter((item) => item !== value)
          : [...current, value];

        const next = {
          ...prev,
          [key]: nextList,
        } as UserProfile;

        void saveUserProfile(next);
        return next;
      });
    },
    []
  );

  return {
    profile,
    isLoaded,
    updateProfile,
    toggleListValue,
  };
}
