import { calculateNutritionScore } from "./nutritionScoreEngine"
import { calculateOrganicScore } from "./organicScoreEngine"
import { analyzeIngredients } from "./ingredientAnalyzer"
import { ADDITIVE_RISK } from "./additiveRiskEngine"
import { classifyNOVA } from "./novaClassifier"
import { checkPetToxicity } from "./petSafetyEngine"

export function calculateProductScore(product:any,profile:any){

  const ingredients:string[] = product.ingredients || []

  const nutritionScore = calculateNutritionScore(product.nutrition || {})
  const organicScore = calculateOrganicScore(product.isOrganic ?? false)
  const ingredientAnalysis = analyzeIngredients(ingredients,profile)
  const nova = classifyNOVA(ingredients)
  const petToxins = checkPetToxicity(ingredients)

  let additiveScore = 30
  let highRiskFound = false

  ingredients.forEach(i=>{
    const key = i.toLowerCase().trim()
    const node = ADDITIVE_RISK[key]
    if(!node) return

    additiveScore -= node.scorePenalty || 0

    if(node.risk === "high"){
      highRiskFound = true
    }
  })

  if(additiveScore < 0) additiveScore = 0

  let finalScore =
    (nutritionScore * 0.6) +
    additiveScore +
    organicScore

  if(highRiskFound){
    finalScore = Math.min(finalScore,49)
  }

  if(nova.novaScore === 4){
    finalScore -= 10
  }

  if(finalScore > 100) finalScore = 100
  if(finalScore < 0) finalScore = 0

  return {
    finalScore: Math.round(finalScore),
    nutritionScore,
    additiveScore,
    organicScore,
    nova,
    highRisk:highRiskFound,
    ingredientFlags:ingredientAnalysis.flags,
    ingredientNodes:ingredientAnalysis.nodes,
    petToxins
  }

}


