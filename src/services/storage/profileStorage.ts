import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  defaultHouseholdAccount,
  HouseholdAccount,
  ScanHistoryItem,
  SubscriptionTier,
} from "../../types/domain";

const ACCOUNT_KEY = "healthlogic:household_account:v2";
const HISTORY_KEY = "healthlogic:scan_history:v1";

function normalizeTier(value: unknown): SubscriptionTier {
  switch (value) {
    case "single_monthly":
    case "family_monthly":
    case "single_annual":
    case "family_annual":
      return value;
    default:
      return "single_monthly";
  }
}

export async function loadHouseholdAccount(): Promise<HouseholdAccount> {
  const raw = await AsyncStorage.getItem(ACCOUNT_KEY);
  if (!raw) return defaultHouseholdAccount;

  try {
    const parsed = JSON.parse(raw) as Partial<HouseholdAccount>;
    return {
      ...defaultHouseholdAccount,
      ...parsed,
      subscriptionTier: normalizeTier(parsed.subscriptionTier),
      profiles: Array.isArray(parsed.profiles) ? parsed.profiles : [],
      activeProfileId:
        typeof parsed.activeProfileId === "string" ? parsed.activeProfileId : null,
    };
  } catch {
    return defaultHouseholdAccount;
  }
}

export async function saveHouseholdAccount(account: HouseholdAccount): Promise<void> {
  await AsyncStorage.setItem(ACCOUNT_KEY, JSON.stringify(account));
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
