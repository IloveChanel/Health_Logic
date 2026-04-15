import { calculateProductScore } from "./productScoreEngine"

export function scoreProduct(product:any, profile:any = {type:"adult"}){

  const result = calculateProductScore(product,profile)

  return {
    score: result.finalScore,
    flags: result.ingredientFlags || []
  }

}




