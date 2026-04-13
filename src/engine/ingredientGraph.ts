export type IngredientNode = {
  name:string
  category:"food"|"cosmetic"|"pet"|"supplement"
  function?:string
  benefits?:string[]
  risks?:string[]
  conditions?:string[]
  allergens?:string[]
  petToxic?:boolean
  scorePenalty?:number
}

export const INGREDIENT_GRAPH:Record<string,IngredientNode>={

"high fructose corn syrup":{
name:"high fructose corn syrup",
category:"food",
function:"sweetener",
risks:["blood sugar spike","metabolic syndrome risk"],
conditions:["diabetes","obesity"],
scorePenalty:25
},

"cornstarch":{
name:"cornstarch",
category:"food",
function:"thickener",
benefits:["gluten free","vegan"],
risks:["high glycemic index"],
scorePenalty:5
},

"yeast":{
name:"yeast",
category:"food",
function:"fermentation agent",
benefits:["B vitamin source"],
risks:["purine content"],
conditions:["gout","crohns disease"]
},

"xylitol":{
name:"xylitol",
category:"food",
petToxic:true,
scorePenalty:40
}

}
