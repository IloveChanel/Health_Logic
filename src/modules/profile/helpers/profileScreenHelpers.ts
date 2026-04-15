export function toggleInList(list: string[], value: string) {
  return list.includes(value)
    ? list.filter((item) => item !== value)
    : [...list, value];
}

export function createInitialProfileOpenState() {
  return {
    profile: true,
    details: true,
    diet: false,
    allergies: false,
    conditions: false,
    skinTypes: false,
    skinConditions: false,
    lifeStage: false,
    wellness: false,
    ingredients: false,
    petProfile: false,
    petBreed: false,
    petLifeStage: false,
    petDiet: false,
    petAllergies: false,
    petConditions: false,
    petWellness: false,
  };
}

export function splitIngredientText(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}




