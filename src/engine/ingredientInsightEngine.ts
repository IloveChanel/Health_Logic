import { INGREDIENT_KNOWLEDGE_GRAPH } from "./ingredientKnowledgeGraph"
import { ADDITIVE_RISK } from "./additiveRiskEngine"

export function getIngredientInsight(name:string){

const key=name.toLowerCase()

const graph=INGREDIENT_KNOWLEDGE_GRAPH[key]
const additive=ADDITIVE_RISK[key]

const insights:string[]=[]

if(graph?.scorePenalty){
insights.push("Potential health concern")
}

if(graph?.ultraProcessed){
insights.push("Ultra-processed ingredient")
}

if(additive){
insights.push("Food additive")
}

if(graph?.migraineTrigger){
insights.push("May trigger migraines")
}

return{
ingredient:name,
insights
}

}




