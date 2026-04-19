export type ProfileSelectionCountInput = {
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
};

export function getProfileSelectionCount(input: ProfileSelectionCountInput): number {
  return (
    input.dietPreferences.length +
    input.allergies.length +
    input.healthConditions.length +
    input.skinTypes.length +
    input.skinConditions.length +
    input.lifeStageFlags.length +
    input.wellnessGoals.length +
    input.petBreedTypes.length +
    input.petLifeStages.length +
    input.petDietaryNeed.length +
    input.petAllergies.length +
    input.petHealthConditions.length +
    input.petWellnessGoals.length
  );
}