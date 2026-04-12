import AsyncStorage from "@react-native-async-storage/async-storage";
import { defaultUserProfile, ScanHistoryItem, UserProfile } from "../../types/domain";

const PROFILE_KEY = "ingredient_checker:user_profile:v1";
const HISTORY_KEY = "ingredient_checker:scan_history:v1";

export async function loadUserProfile(): Promise<UserProfile> {
  const raw = await AsyncStorage.getItem(PROFILE_KEY);
  if (!raw) return defaultUserProfile;
  try {
    return { ...defaultUserProfile, ...JSON.parse(raw) };
  } catch {
    return defaultUserProfile;
  }
}

export async function saveUserProfile(profile: UserProfile): Promise<void> {
  await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

export async function loadScanHistory(): Promise<ScanHistoryItem[]> {
  const raw = await AsyncStorage.getItem(HISTORY_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export async function saveScanHistory(items: ScanHistoryItem[]): Promise<void> {
  await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(items));
}
