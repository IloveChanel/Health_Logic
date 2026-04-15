import AsyncStorage from "@react-native-async-storage/async-storage";

const CUSTOM_PROFILE_OPTIONS_KEY = "healthlogic_custom_profile_options_v1";

type CustomProfileOptionsMap = Record<string, string[]>;

function normalizeSection(section: string) {
  return section.trim();
}

function normalizeValue(value: string) {
  return value.trim();
}

export async function loadCustomProfileOptions(): Promise<CustomProfileOptionsMap> {
  try {
    const raw = await AsyncStorage.getItem(CUSTOM_PROFILE_OPTIONS_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return {};
    return parsed as CustomProfileOptionsMap;
  } catch {
    return {};
  }
}

export async function saveCustomProfileOption(section: string, value: string): Promise<CustomProfileOptionsMap> {
  const safeSection = normalizeSection(section);
  const safeValue = normalizeValue(value);

  if (!safeSection || !safeValue) {
    return loadCustomProfileOptions();
  }

  const existing = await loadCustomProfileOptions();
  const current = existing[safeSection] ?? [];

  const alreadyExists = current.some(
    (item) => item.trim().toLowerCase() === safeValue.toLowerCase()
  );

  const updated: CustomProfileOptionsMap = {
    ...existing,
    [safeSection]: alreadyExists ? current : [...current, safeValue],
  };

  await AsyncStorage.setItem(CUSTOM_PROFILE_OPTIONS_KEY, JSON.stringify(updated));
  return updated;
}

export function mergeCustomOptions(baseOptions: string[], customOptions: string[]) {
  const seen = new Set<string>();
  const merged: string[] = [];

  for (const item of [...baseOptions, ...customOptions]) {
    const safe = item.trim();
    const key = safe.toLowerCase();
    if (!safe || seen.has(key)) continue;
    seen.add(key);
    merged.push(safe);
  }

  return merged;
}
