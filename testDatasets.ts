import { INGREDIENT_KNOWLEDGE_GRAPH } from "./src/engine/ingredientKnowledgeGraph"
import { ADDITIVE_RISK } from "./src/engine/additiveRiskEngine"
import { COSMETIC_DB } from "./src/engine/cosmeticIngredientDB"

console.log("Knowledge graph entries:",Object.keys(INGREDIENT_KNOWLEDGE_GRAPH).length)
console.log("Additive entries:",Object.keys(ADDITIVE_RISK).length)
console.log("Cosmetic entries:",Object.keys(COSMETIC_DB).length)
