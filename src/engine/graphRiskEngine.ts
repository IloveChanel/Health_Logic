import { INGREDIENT_KNOWLEDGE_GRAPH } from "./ingredientKnowledgeGraph"

export function calculateGraphRisk(
ingredients:string[],
profile:any
){

let penalty=0
const flags:string[]=[]

for(const i of ingredients){

const node=INGREDIENT_KNOWLEDGE_GRAPH[i]

if(!node) continue

if(node.scorePenalty){
penalty+=node.scorePenalty
flags.push(i+" risk")
}

if(profile.conditions?.includes("migraine") && node.migraineTrigger){
penalty+=5
flags.push(i+" migraine trigger")
}

if(node.ultraProcessed){
penalty+=3
flags.push(i+" ultra processed")
}

}

return{
penalty,
flags
}

}
