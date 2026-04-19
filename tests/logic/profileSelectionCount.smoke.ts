import { getProfileSelectionCount } from "../../src/modules/profile/helpers/profileSelectionCount";

function assertEqual(actual: unknown, expected: unknown, label: string) {
  if (actual !== expected) {
    throw new Error(`${label} failed. Expected ${expected}, received ${actual}`);
  }
}

const result = getProfileSelectionCount({
  dietPreferences: ["A", "B"],
  allergies: ["C"],
  healthConditions: [],
  skinTypes: ["D"],
  skinConditions: ["E", "F"],
  lifeStageFlags: [],
  wellnessGoals: ["G"],
  petBreedTypes: [],
  petLifeStages: [],
  petDietaryNeed: ["H"],
  petAllergies: [],
  petHealthConditions: ["I", "J"],
  petWellnessGoals: [],
});

assertEqual(result, 10, "profileSelectionCount total");

console.log("PASS profileSelectionCount.smoke");