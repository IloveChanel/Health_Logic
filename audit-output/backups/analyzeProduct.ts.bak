import { calculateProductScore } from "./productScoreEngine"
import { detectCategory } from "./categoryDetector"
import { getActiveProfile } from "./activeProfile"
import { applyIngredientOverrides } from "./ingredientOverrides"
import { suggestAlternatives } from "./productAlternatives"
import { classifyNOVA } from "./novaClassifier"
import { PET_TOXINS } from "./petToxinDatabase"
import { calculateGraphRisk } from "./graphRiskEngine"
import { calculateContextRisk } from "./contextRiskEngine"
import { buildScoreBreakdown } from "./scoreBreakdownEngine"
import { getPurchaseRecommendation } from "./purchaseAdvisor"

export function analyzeProduct(product:any, profileArg?:any){

const profile = profileArg || getActiveProfile()

const ingredients = Array.isArray(product.ingredients)
? product.ingredients
: []

const scoring = calculateProductScore(product,profile)

const overrides = applyIngredientOverrides(ingredients,profile)

const category = detectCategory(product)

const nova = classifyNOVA(ingredients)

const graphRisk = calculateGraphRisk(ingredients,profile)

const contextRisk = calculateContextRisk(ingredients,profile)

const finalScore = Math.max(0,Math.min(100,
(scoring.finalScore || 0)
+ overrides.bonus
- overrides.penalty
- graphRisk.penalty
- contextRisk.penalty
))

const petToxins = ingredients.filter(i =>
PET_TOXINS.includes(i)
)

const alternatives = suggestAlternatives(finalScore,category)

const breakdown = buildScoreBreakdown(
ingredients,
nova,
graphRisk,
overrides
)

const flags = [
...(scoring.ingredientFlags || []),
...(graphRisk.flags || []),
...(contextRisk.flags || [])
]

const recommendation = getPurchaseRecommendation(finalScore,flags)

return {

score: finalScore,
flags,
ingredients,
nova,
alternatives,
petToxins,
category,
overrides,
breakdown,
recommendation

}

}




