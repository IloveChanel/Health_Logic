import { COSMETIC_DB } from "./cosmeticIngredientDB"

export function analyzeCosmeticIngredients(ingredients:string[]){

  const flags:string[]=[]

  ingredients.forEach(i=>{
    const key = i.toLowerCase().trim()
    const node = COSMETIC_DB[key]
    if(node && node.safe === false){
      flags.push(key + ": caution")
    }
  })

  const score = Math.max(0, 100 - flags.length * 15)

  return {
    score,
    flags
  }

}
