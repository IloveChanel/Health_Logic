import AsyncStorage from "@react-native-async-storage/async-storage";

const PROFILE_STORAGE_KEY = "healthlogic_profiles";

export async function auditProfiles() {
  try {
    const raw = await AsyncStorage.getItem(PROFILE_STORAGE_KEY);

    if (!raw) {
      console.log("PROFILE AUDIT → FALSE (no storage found)");
      return;
    }

    const data = JSON.parse(raw);
    const profiles = data?.profiles ?? [];

    console.log("=== PROFILE STORAGE AUDIT ===");
    console.log("Profiles saved:", profiles.length);

    profiles.forEach((p: any, i: number) => {
      console.log(`${i + 1}. ${p.label} → TRUE`);
    });

    if (profiles.length === 5) {
      console.log("5 PROFILE TEST → TRUE");
    } else {
      console.log("5 PROFILE TEST → FALSE");
    }

  } catch (err) {
    console.log("PROFILE AUDIT → FALSE", err);
  }
}
