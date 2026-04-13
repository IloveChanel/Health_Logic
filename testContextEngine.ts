import { analyzeProduct } from "./src/engine/analyzeProduct"

const product={
ingredients:["rice","sugar","salt","msg"]
}

const profile={
type:"adult",
conditions:["diabetes","hypertension","migraine"]
}

console.log(analyzeProduct(product,profile))
