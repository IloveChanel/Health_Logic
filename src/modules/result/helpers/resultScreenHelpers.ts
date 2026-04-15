export function normalizeIngredientName(value: string | undefined | null) {
  return (value ?? "").toLowerCase().trim();
}

export function isAcceptedIngredient(
  ingredient: { normalizedName?: string; name?: string },
  preferredIngredients: string[]
) {
  const ingredientName = normalizeIngredientName(
    ingredient.normalizedName || ingredient.name || ""
  );

  return preferredIngredients.includes(ingredientName);
}




