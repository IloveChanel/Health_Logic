import { analyzeProduct } from "./src/engine/analyzeProduct"

const product = {
  ingredients: [
    "Sugar",
    "High-Fructose Corn Syrup",
    "Salt"
  ]
}

const profile = {
  type: "adult",
  allergies: ["soy"]
}

console.log(analyzeProduct(product, profile))
