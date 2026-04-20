export type SourceName =
  | "openFoodFacts"
  | "openBeautyFacts"
  | "openPetFoodFacts"
  | "barcodeFallback"
  | "petFallback"
  | "supplementFallback"
  | "householdFallback"
  | "aiEnrichment";

export const SOURCE_REGISTRY: SourceName[] = [
  "openFoodFacts",
  "openBeautyFacts",
  "openPetFoodFacts",
  "barcodeFallback",
  "petFallback",
  "supplementFallback",
  "householdFallback",
  "aiEnrichment"
];
