import { fetchOpenFoodFacts } from "./openFoodFactsClient"
import { getProduct, saveProduct } from "./sqliteCache"
import { analyzeProduct } from "./analyzeProduct"
import { parseIngredients } from "./ingredientParser"

export async function scanProduct(barcode:string,profile:any){

  const cached = await getProduct(barcode)

  if(cached){
    return analyzeProduct(cached,profile)
  }

  const data = await fetchOpenFoodFacts(barcode)
  const product = data.product || {}

  const simplified = {
    category:"food",
    ingredients: parseIngredients(product),
    nutrition:{
      sugar: product.nutriments?.sugars_100g || 0,
      sodium: product.nutriments?.sodium_100g || 0,
      saturatedFat: product.nutriments?.["saturated-fat_100g"] || 0,
      fiber: product.nutriments?.fiber_100g || 0,
      protein: product.nutriments?.proteins_100g || 0
    },
    isOrganic: (product.labels_tags || []).includes("en:organic"),
    rawName: product.product_name || "",
    rawBrand: product.brands || ""
  }

  await saveProduct(barcode,simplified)

  return analyzeProduct(simplified,profile)
}





