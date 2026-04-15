import { INGREDIENT_KNOWLEDGE } from "./ingredientKnowledge"
import { INGREDIENT_GRAPH } from "./ingredientGraph"

export function analyzeIngredients(ingredients:string[],profile:any){

const flags:string[]=[]
const nodes:any[]=[]

ingredients.forEach(raw=>{

const name=raw.toLowerCase().trim()
const node=INGREDIENT_GRAPH[name]

if(!node) return

nodes.push(node)

if(node.scorePenalty){
flags.push("Unhealthy ingredient: "+name)
}

if(profile?.conditions?.some((c:string)=>node.conditions?.includes(c))){
flags.push("Condition conflict: "+name)
}

if(profile?.type==="pet" && node.petToxic){
flags.push("Toxic for pets: "+name)
}

})

return{nodes,flags}

}





