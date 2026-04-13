import { analyzeProduct } from "./src/engine/analyzeProduct"

const foodProduct={
ingredients:[
"rice",
"sugar",
"salt",
"msg"
]
}

const beautyProduct={
ingredients:[
"retinol",
"niacinamide",
"ceramide"
]
}

console.log("Food test:",analyzeProduct(foodProduct,{}))

console.log("Beauty test:",analyzeProduct(beautyProduct,{}))
