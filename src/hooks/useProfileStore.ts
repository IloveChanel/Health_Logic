import { useCallback, useEffect, useMemo, useState } from "react";
import {
  defaultUserProfile,
  HouseholdAccount,
  HouseholdProfile,
  HouseholdProfileType,
  SubscriptionTier,
} from "../types/domain";
import {
  loadHouseholdAccount,
  saveHouseholdAccount,
} from "../services/storage/profileStorage";

function newId() {
  return `profile_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function getTierLimits(subscriptionTier: SubscriptionTier) {
  switch (subscriptionTier) {
    case "single_monthly":
      return { humanLimit: 1, petLimit: 0 };
    case "family_monthly":
      return { humanLimit: 5, petLimit: 0 };
    case "single_annual":
      return { humanLimit: 1, petLimit: 1 };
    case "family_annual":
      return { humanLimit: 5, petLimit: 1 };
  }
}

function countProfilesByType(profiles: HouseholdProfile[]) {
  const humanCount = profiles.filter((item) => item.type !== "pet").length;
  const petCount = profiles.filter((item) => item.type === "pet").length;
  return { humanCount, petCount };
}

export function useProfileStore() {
  const [account, setAccount] = useState<HouseholdAccount & { hasActiveSubscription?: boolean }>({
    subscriptionTier: "single_monthly",
    activeProfileId: null,
    profiles: [],
    hasActiveSubscription: false,
  });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const stored: any = await loadHouseholdAccount();
      setAccount({
        ...stored,
        hasActiveSubscription: stored?.hasActiveSubscription ?? false,
      });
      setIsLoaded(true);
    })();
  }, []);

  const persist = useCallback((next: HouseholdAccount & { hasActiveSubscription?: boolean }) => {
    setAccount(next);
    void saveHouseholdAccount(next as any);
  }, []);

  const activeProfile = useMemo(() => {
    return account.profiles.find((item) => item.id === account.activeProfileId) ?? null;
  }, [account]);

  const tierLimits = useMemo(() => getTierLimits(account.subscriptionTier), [account.subscriptionTier]);

  const canAddProfile = useCallback(
    (type: HouseholdProfileType) => {
      const { humanCount, petCount } = countProfilesByType(account.profiles);

      if (type === "pet") {
        return petCount < tierLimits.petLimit;
      }

      return humanCount < tierLimits.humanLimit;
    },
    [account.profiles, tierLimits]
  );

  const setSubscriptionTier = useCallback(
    (subscriptionTier: SubscriptionTier) => {
      const next = {
        ...account,
        subscriptionTier,
        hasActiveSubscription: true,
      };
      persist(next);
    },
    [account, persist]
  );

  const saveOrUpdateProfile = useCallback(
    (input: {
      id?: string | null;
      label: string;
      type: HouseholdProfileType;
      sex?: "female" | "male" | "pet";
      email?: string;
      zipCode?: string;
      petType?: string;
      petLifeStage?: string;
      petDietaryNeed?: string[];
      profilePatch?: Partial<HouseholdProfile["profile"]>;
    }) => {
      const label = input.label.trim();
      if (!label) {
        return { ok: false as const, reason: "NAME_REQUIRED" as const };
      }

      const existing = input.id
        ? account.profiles.find((item) => item.id === input.id)
        : null;

      if (!existing && !canAddProfile(input.type)) {
        return {
          ok: false,
          reason: (input.type === "pet" ? "PET_LIMIT" : "PROFILE_LIMIT") as "PET_LIMIT" | "PROFILE_LIMIT",
        };
      }

      const nextProfile: HouseholdProfile = existing
        ? {
            ...existing,
            label,
            type: input.type,
            sex: input.sex,
            email: input.email ?? "",
            zipCode: input.zipCode ?? "",
            petType: input.petType ?? existing.petType,
            petLifeStage: input.petLifeStage ?? existing.petLifeStage,
            petDietaryNeed: input.petDietaryNeed ?? existing.petDietaryNeed ?? [],
            profile: {
              ...existing.profile,
              ...(input.profilePatch ?? {}),
            },
          }
        : {
            id: newId(),
            label,
            type: input.type,
            sex: input.sex,
            email: input.email ?? "",
            zipCode: input.zipCode ?? "",
            petType: input.petType ?? "",
            petLifeStage: input.petLifeStage ?? "",
            petDietaryNeed: input.petDietaryNeed ?? [],
            profile: {
              ...defaultUserProfile,
              ...(input.profilePatch ?? {}),
            },
          };

      const profiles = existing
        ? account.profiles.map((item) => (item.id === existing.id ? nextProfile : item))
        : [...account.profiles, nextProfile];

      const next: HouseholdAccount & { hasActiveSubscription?: boolean } = {
        ...account,
        profiles,
        activeProfileId: nextProfile.id,
      };

      persist(next);
      return { ok: true as const, profile: nextProfile };
    },
    [account, canAddProfile, persist]
  );

  const deleteProfile = useCallback(
    (profileId: string) => {
      const target = account.profiles.find((item) => item.id === profileId);
      if (!target) return { ok: false };

      const profiles = account.profiles.filter((item) => item.id !== profileId);
      const nextActiveId =
        account.activeProfileId === profileId
          ? profiles[0]?.id ?? null
          : account.activeProfileId;

      const next: HouseholdAccount & { hasActiveSubscription?: boolean } = {
        ...account,
        profiles,
        activeProfileId: nextActiveId,
      };

      persist(next);
      return { ok: true };
    },
    [account, persist]
  );

  const setActiveProfileId = useCallback(
    (profileId: string) => {
      const exists = account.profiles.some((item) => item.id === profileId);
      if (!exists) return;

      const next = {
        ...account,
        activeProfileId: profileId,
      };

      persist(next);
    },
    [account, persist]
  );

  return {
    account,
    isLoaded,
    activeProfile,
    tierLimits,
    setSubscriptionTier,
    canAddProfile,
    saveOrUpdateProfile,
    deleteProfile,
    setActiveProfileId,
  };
}







