import { INGREDIENT_KNOWLEDGE_GRAPH } from "./ingredientKnowledgeGraph"

export function checkPetToxicity(ingredients:string[]){

  const toxins:string[]=[]

  ingredients.forEach(i=>{
    const key = i.toLowerCase().trim()
    const node = INGREDIENT_KNOWLEDGE_GRAPH[key]
    if(node?.petToxic){
      toxins.push(key)
    }
  })

  return toxins

}
