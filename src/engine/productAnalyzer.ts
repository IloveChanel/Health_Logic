export function extractIngredients(product:any) {

  if (!product) return []

  if (product.ingredients)
    return product.ingredients

  if (product.ingredients_text)
    return product.ingredients_text.split(",")

  return []

}




