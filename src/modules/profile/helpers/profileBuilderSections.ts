import {
  ALLERGIES,
  DIET_PREFERENCES,
  HEALTH_CONDITIONS,
  LIFE_STAGE_FLAGS,
  SKIN_CONDITIONS,
  SKIN_TYPES,
  WELLNESS_GOALS,
  PET_ALLERGIES,
  PET_BREED_TYPES,
  PET_DIETARY_NEEDS,
  PET_HEALTH_CONDITIONS,
  PET_LIFE_STAGES,
  PET_WELLNESS_GOALS,
} from "../../../constants/profileOptions";

export type ProfileType = "you" | "adult" | "child" | "pet";

export const PROFILE_TYPE_OPTIONS = [
  { id: "you", label: "You" },
  { id: "adult", label: "Adult" },
  { id: "child", label: "Child" },
  { id: "pet", label: "Pet" },
] as const;

export const AGE_OPTIONS = {
  you: ["Under 18", "Adult", "Mature", "Senior"],
  adult: ["Adult", "Mature", "Senior"],
  child: ["Baby", "Toddler", "Child", "Teen"],
  pet: ["Young", "Adult", "Senior"],
} as const;

export const SEX_OPTIONS = ["Female", "Male", "Other"] as const;
export const PET_TYPE_OPTIONS = ["Dog", "Cat", "Other Pet"] as const;

export const PROFILE_SECTIONS = {
  diet: {
    title: "Diet preferences",
    subtitle: "Food, sugar, organic, ingredient and nutrition preferences.",
    options: DIET_PREFERENCES,
  },
  allergies: {
    title: "Allergies and sensitivities",
    subtitle: "Food and ingredient sensitivities.",
    options: ALLERGIES,
  },
  conditions: {
    title: "Health conditions",
    subtitle: "Conditions that affect scoring and product fit.",
    options: HEALTH_CONDITIONS,
  },
  skinTypes: {
    title: "Skin type",
    subtitle: "Skin and beauty scanning preferences.",
    options: SKIN_TYPES,
  },
  skinConditions: {
    title: "Skin concerns",
    subtitle: "Acne, dryness, irritation, sensitivity and more.",
    options: SKIN_CONDITIONS,
  },
  lifeStage: {
    title: "Life stage",
    subtitle: "Pregnancy, postpartum, senior, and other stages.",
    options: LIFE_STAGE_FLAGS,
  },
  wellness: {
    title: "Wellness goals",
    subtitle: "General wellness and nutrition goals.",
    options: WELLNESS_GOALS,
  },
  petBreed: {
    title: "Pet breed / type",
    subtitle: "Breed and pet profile setup.",
    options: PET_BREED_TYPES,
  },
  petLifeStage: {
    title: "Pet life stage",
    subtitle: "Young, adult, senior and related stages.",
    options: PET_LIFE_STAGES,
  },
  petDiet: {
    title: "Pet dietary needs",
    subtitle: "Feeding and stomach support needs.",
    options: PET_DIETARY_NEEDS,
  },
  petAllergies: {
    title: "Pet allergies",
    subtitle: "Pet ingredient and food sensitivities.",
    options: PET_ALLERGIES,
  },
  petConditions: {
    title: "Pet health conditions",
    subtitle: "Pet health concerns that affect product fit.",
    options: PET_HEALTH_CONDITIONS,
  },
  petWellness: {
    title: "Pet wellness goals",
    subtitle: "Weight, coat, mobility and other pet goals.",
    options: PET_WELLNESS_GOALS,
  },
} as const;





