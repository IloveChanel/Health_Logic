import { calculateProductScore } from "./src/engine/productScoreEngine"

const product = {

  ingredients:[
    "sugar",
    "high fructose corn syrup",
    "salt"
  ],

  nutrition:{
    calories:180,
    sugar:22,
    saturatedFat:3,
    sodium:120,
    fiber:1,
    protein:2,
    fruitVegetablePercent:0
  },

  isOrganic:false

}

console.log(calculateProductScore(product,{type:"adult"}))

