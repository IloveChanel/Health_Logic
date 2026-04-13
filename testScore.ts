import { scoreProduct } from "./src/engine/scoringEngine"

const product = {
  ingredients: [
    "sugar",
    "high fructose corn syrup",
    "salt"
  ]
}

const profile = {
  allergies: ["soy"]
}

console.log(scoreProduct(product, profile))
