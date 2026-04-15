export type BuildProfileSaveInputArgs = {
  activeProfileId?: string | null;
  label: string;
  profileType: "you" | "adult" | "child" | "pet";
  ageGroup: string;
  sex: string;
  petType: string;
  dietPreferences: string[];
  allergies: string[];
  healthConditions: string[];
  skinTypes: string[];
  skinConditions: string[];
  lifeStageFlags: string[];
  wellnessGoals: string[];
  petBreedTypes: string[];
  petLifeStages: string[];
  petDietaryNeed: string[];
  petAllergies: string[];
  petHealthConditions: string[];
  petWellnessGoals: string[];
  avoidIngredients: string[];
  preferIngredients: string[];
  otherEntries: Record<string, string[]>;
};

export function buildProfileSaveInput(args: BuildProfileSaveInputArgs) {
  const normalizedType: "you" | "child" | "pet" =
    args.profileType === "adult" ? "you" : args.profileType;

  const normalizedSex: "pet" | "female" | "male" | undefined =
    normalizedType === "pet"
      ? "pet"
      : args.sex.toLowerCase() === "female"
      ? "female"
      : args.sex.toLowerCase() === "male"
      ? "male"
      : undefined;

  return {
    id: args.activeProfileId ?? null,
    label: args.label.trim(),
    type: normalizedType,
    sex: normalizedSex,
    petType: normalizedType === "pet" ? args.petType : undefined,
    petLifeStage:
      normalizedType === "pet" && args.petLifeStages.length > 0
        ? args.petLifeStages[0]
        : undefined,
    petDietaryNeed: normalizedType === "pet" ? args.petDietaryNeed : undefined,
    profilePatch: {
      ageGroup: args.ageGroup as any,
      dietPreferences: args.dietPreferences,
      allergies: args.allergies,
      healthConditions: args.healthConditions,
      skinTypes: args.skinTypes,
      skinConditions: args.skinConditions,
      lifeStageFlags: args.lifeStageFlags,
      wellnessGoals: args.wellnessGoals,
      petBreedTypes: args.petBreedTypes,
      petLifeStages: args.petLifeStages,
      petAllergies: args.petAllergies,
      petHealthConditions: args.petHealthConditions,
      petWellnessGoals: args.petWellnessGoals,
      avoidIngredients: args.avoidIngredients,
      preferIngredients: args.preferIngredients,
      otherEntries: args.otherEntries,
    },
  };
}





