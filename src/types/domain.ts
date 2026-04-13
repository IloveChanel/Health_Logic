export type ProductCategory =
  | "food"
  | "supplement"
  | "skincare"
  | "haircare"
  | "makeup"
  | "bodycare";

export type AgeGroup = "under18" | "adult" | "mature";

export type IngredientRecommendation =
  | "safe"
  | "caution"
  | "avoid"
  | "beneficial"
  | "neutral"
  | "unknown";

export type IngredientAnalysis = {
  name: string;
  normalizedName?: string;
  purpose: string;
  benefits: string[];
  concerns: string[];
  personalizedFlags: string[];
  recommendation: IngredientRecommendation;
};

export type ProductAnalysis = {
  productName?: string;
  brandName?: string;
  category: ProductCategory;
  overallScore: number;
  fitForUserScore: number;
  redFlags: string[];
  benefits: string[];
  ingredients: IngredientAnalysis[];
  explanation?: string;
};

export type UserProfile = {
  allergies: string[];
  healthConditions: string[];
  dietPreferences: string[];
  skinTypes: string[];
  skinConditions: string[];
  avoidIngredients: string[];
  preferIngredients: string[];
  ageGroup: AgeGroup;
  pregnancyMode: boolean;
  breastfeedingMode: boolean;
  customFlags: string[];
};

export type HouseholdProfileType = "you" | "child" | "pet";
export type SubscriptionTier =
  | "single_monthly"
  | "family_monthly"
  | "single_annual"
  | "family_annual";

export type HouseholdProfile = {
  id: string;
  label: string;
  type: HouseholdProfileType;
  sex?: "female" | "male" | "pet";
  email?: string;
  zipCode?: string;
  petType?: string;
  petLifeStage?: string;
  petDietaryNeed?: string[];
  profile: UserProfile;
};

export type HouseholdAccount = {
  subscriptionTier: SubscriptionTier;
  activeProfileId: string | null;
  profiles: HouseholdProfile[];
};

export type ScanHistoryItem = {
  id: string;
  createdAt: string;
  mode: "barcode" | "camera";
  barcode?: string;
  imageUri?: string;
  analysis?: ProductAnalysis;
};

export const defaultUserProfile: UserProfile = {
  allergies: [],
  healthConditions: [],
  dietPreferences: [],
  skinTypes: [],
  skinConditions: [],
  avoidIngredients: [],
  preferIngredients: [],
  ageGroup: "adult",
  pregnancyMode: false,
  breastfeedingMode: false,
  customFlags: [],
};

export const defaultHouseholdAccount: HouseholdAccount = {
  subscriptionTier: "single_monthly",
  activeProfileId: null,
  profiles: [],
};
