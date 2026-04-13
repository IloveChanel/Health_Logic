import { analyzeProduct } from "./src/engine/analyzeProduct"

const product = {
  ingredients: ["e250", "salt", "bht"]
}

const profile = {
  type: "adult",
  allergies: []
}

console.log(analyzeProduct(product, profile))
