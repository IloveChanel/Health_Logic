export function parseIngredients(product: any): string[] {

  if (product.ingredients && Array.isArray(product.ingredients)) {
    return product.ingredients.map((i:any)=>i.text || "").filter(Boolean)
  }

  if (product.ingredients_text) {
    return product.ingredients_text.split(",").map((x:string)=>x.trim())
  }

  if (product.ingredients_text_en) {
    return product.ingredients_text_en.split(",").map((x:string)=>x.trim())
  }

  if (product.ingredients_tags) {
    return product.ingredients_tags.map((x:string)=>x.replace("en:",""))
  }

  return []
}
