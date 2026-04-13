import { scanProduct } from "./src/engine/scanPipeline"
import { scanBeautyProduct } from "./src/engine/scanBeautyPipeline"
import { ADDITIVE_RISK } from "./src/engine/additiveRiskEngine"
import { COSMETIC_DB } from "./src/engine/cosmeticIngredientDB"
import { INGREDIENT_KNOWLEDGE_GRAPH } from "./src/engine/ingredientKnowledgeGraph"

async function run(){
  const food = await scanProduct("737628064502",{type:"adult",allergies:[],conditions:["diabetes"]})
  const beauty = await scanBeautyProduct("3014260310856").catch(()=>({score:0,flags:["beauty fetch failed"]}))

  console.log("Typecheck target graph entries:",Object.keys(INGREDIENT_KNOWLEDGE_GRAPH).length)
  console.log("Additive risk entries:",Object.keys(ADDITIVE_RISK).length)
  console.log("Cosmetic ingredient entries:",Object.keys(COSMETIC_DB).length)
  console.log("Food scan score:",food.score)
  console.log("Food scan nova:",food.nova)
  console.log("Food scan flags:",food.flags)
  console.log("Food alternatives:",food.alternatives)
  console.log("Beauty scan:",beauty)
}

run()
