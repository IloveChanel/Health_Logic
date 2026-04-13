import { ADDITIVE_RISK } from "./src/engine/additiveRiskEngine"
import { COSMETIC_DB } from "./src/engine/cosmeticIngredientDB"
import { getIngredientCard } from "./src/engine/ingredientCards"
import { checkPetToxicity } from "./src/engine/petSafetyEngine"
import { analyzeCosmeticIngredients } from "./src/engine/cosmeticAnalyzer"
import { INGREDIENT_KNOWLEDGE_GRAPH } from "./src/engine/ingredientKnowledgeGraph"

console.log("Unified graph entries:",Object.keys(INGREDIENT_KNOWLEDGE_GRAPH).length)
console.log("Additive risk entries:",Object.keys(ADDITIVE_RISK).length)
console.log("Cosmetic ingredient entries:",Object.keys(COSMETIC_DB).length)
console.log("Ingredient card test:",getIngredientCard("corn starch"))
console.log("Pet toxin test:",checkPetToxicity(["xylitol","rice"]))
console.log("Cosmetic analyzer test:",analyzeCosmeticIngredients(["retinol","niacinamide","fragrance"]))
