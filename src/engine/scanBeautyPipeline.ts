import { fetchOpenBeautyFacts } from "./openBeautyFactsClient"
import { getProduct, saveProduct } from "./sqliteCache"
import { parseIngredients } from "./ingredientParser"
import { analyzeCosmeticIngredients } from "./cosmeticAnalyzer"

export async function scanBeautyProduct(barcode:string){

  const cacheKey = "beauty:" + barcode
  const cached = getProduct(cacheKey)

  if(cached){
    return analyzeCosmeticIngredients(cached.ingredients || [])
  }

  const data = await fetchOpenBeautyFacts(barcode)
  const product = data.product || {}

  const simplified = {
    category:"beauty",
    ingredients: parseIngredients(product.ingredients_text || ""),
    rawName: product.product_name || "",
    rawBrand: product.brands || ""
  }

  saveProduct(cacheKey,simplified)

  return analyzeCosmeticIngredients(simplified.ingredients || [])
}
