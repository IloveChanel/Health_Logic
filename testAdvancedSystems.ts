import { ADDITIVE_RISK } from "./src/engine/additiveRiskEngine"
import { COSMETIC_DB } from "./src/engine/cosmeticIngredientDB"
import { getIngredientCard } from "./src/engine/ingredientCards"
import { suggestAlternatives } from "./src/engine/productAlternatives"

console.log("Additive risk entries:",Object.keys(ADDITIVE_RISK).length)

console.log("Cosmetic ingredient entries:",Object.keys(COSMETIC_DB).length)

console.log("Ingredient card test:",getIngredientCard("sugar"))

console.log("Alternative suggestion test:",suggestAlternatives(30,"snack"))
