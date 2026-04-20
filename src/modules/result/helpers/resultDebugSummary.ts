export function getResultDebugSummary(analysis: any) {
  const ingredientCount = Array.isArray(analysis?.ingredients) ? analysis.ingredients.length : 0;

  return {
    productName: analysis?.productName ?? null,
    brandName: analysis?.brandName ?? null,
    ingredientCount,
    ingredientsPreview: Array.isArray(analysis?.ingredients)
      ? analysis.ingredients.slice(0, 5)
      : [],
    explanation: analysis?.explanation ?? null,
  };
}
