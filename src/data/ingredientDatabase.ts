export type IngredientEntry = {
  name:string
  category:string
  description:string
  benefits?:string[]
  concerns?:string[]
  glycemicImpact?:number
  commonAllergen?:boolean
}

export const INGREDIENT_DATABASE:Record<string,IngredientEntry> = {

  "cornstarch":{
    name:"Cornstarch",
    category:"thickener",
    description:"Fine powder from the starch of corn kernels.",
    benefits:[
      "Gluten free thickener",
      "Plant based"
    ],
    concerns:[
      "High glycemic impact when cooked"
    ],
    glycemicImpact:90
  },

  "yeast":{
    name:"Yeast",
    category:"fermentation",
    description:"Single-celled fungus used in baking and fermentation.",
    benefits:[
      "B vitamins",
      "Protein source"
    ],
    concerns:[
      "May aggravate Crohn's disease",
      "High purine content may trigger gout"
    ]
  },

  "sugar":{
    name:"Sugar",
    category:"sweetener",
    description:"Refined sucrose used to sweeten foods.",
    concerns:[
      "High glycemic load",
      "Associated with metabolic disease"
    ],
    glycemicImpact:100
  },

  "salt":{
    name:"Salt",
    category:"mineral",
    description:"Sodium chloride used for flavor and preservation.",
    concerns:[
      "Excess sodium linked to hypertension"
    ]
  }

}




