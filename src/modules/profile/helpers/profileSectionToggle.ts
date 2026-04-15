export type ProfileSection =
  | "diet"
  | "allergies"
  | "conditions"
  | "skin"
  | "wellness"
  | "ingredients"
  | "pet";

export function createSectionState() {
  return {
    diet:false,
    allergies:false,
    conditions:false,
    skin:false,
    wellness:false,
    ingredients:false,
    pet:false
  };
}

export function toggleSection(
  state:Record<string,boolean>,
  key:ProfileSection
){
  return { ...state, [key]: !state[key] };
}




