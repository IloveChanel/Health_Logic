import { ProductAnalysis, ProductCategory, UserProfile } from "../../types/domain";

export function createEmptyAnalysis(category: ProductCategory, profile: UserProfile): ProductAnalysis {
  const redFlags: string[] = [];
  const benefits: string[] = [];

  if (profile.skinConditions.includes("Psoriasis")) {
    redFlags.push("Psoriasis-sensitive mode enabled");
  }

  if (profile.skinTypes.includes("Dry Skin")) {
    benefits.push("Prioritize barrier-supporting and hydrating ingredients");
  }

  return {
    category,
    overallScore: 50,
    fitForUserScore: 50,
    redFlags,
    benefits,
    ingredients: [],
    explanation: "Analysis pipeline placeholder. Barcode and camera modules will feed ingredient intelligence here.",
  };
}
