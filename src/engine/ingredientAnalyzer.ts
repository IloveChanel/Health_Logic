import { INGREDIENT_KNOWLEDGE } from "./ingredientKnowledge"
import { INGREDIENT_GRAPH } from "./ingredientGraph"
import { PET_TOXINS } from "./petToxinDatabase"

export function analyzeIngredients(ingredients:string[],profile:any){

const flags:string[]=[]
const nodes:any[]=[]

const petToxinSet = new Set(
  (PET_TOXINS || []).map(i => String(i).toLowerCase().trim())
)

ingredients.forEach(raw=>{

const name=raw.toLowerCase().trim()
const node=INGREDIENT_GRAPH[name]

if(node){
  nodes.push(node)

  if(node.scorePenalty){
    flags.push("Unhealthy ingredient: "+name)
  }

  if(profile?.conditions?.some((c:string)=>node.conditions?.includes(c))){
    flags.push("Condition conflict: "+name)
  }
}

const petToxicFromGraph = !!node?.petToxic
const petToxicFromDatabase = petToxinSet.has(name)

if(profile?.type==="pet" && (petToxicFromGraph || petToxicFromDatabase)){
  flags.push("Toxic for pets: "+name)
}

})

return{
  nodes,
  flags:[...new Set(flags)]
}

}
