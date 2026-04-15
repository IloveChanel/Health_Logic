import { analyzeProduct } from './src/engine/analyzeProduct';
import { INGREDIENT_INFO } from './src/engine/ingredientInfoDictionary';

// SIMULATED DATA: This represents a product coming from your 20,000 item library
const mockProduct = {
  product_name: "Test High-Sugar Snack",
  ingredients: ["high fructose corn syrup", "cornstarch", "artificial flavor"]
};

const profile = {
  type: "human",
  conditions: ["diabetes"]
};

const results = analyzeProduct(mockProduct, profile);

console.log("--- PRODUCT AUDIT RESULTS ---");
console.log("Score:", results.score); // Should be low due to HFCS penalty
console.log("Flags:", results.flags); // Should show blood sugar spikes
console.log("Recommendation:", results.recommendation);
