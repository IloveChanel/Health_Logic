import { calculateProductScore } from "../../src/engine/productScoreEngine";
import { calculateGraphRisk } from "../../src/engine/graphRiskEngine";
import { calculateContextRisk } from "../../src/engine/contextRiskEngine";
import { analyzeProduct } from "../../src/engine/analyzeProduct";

const cases = [
  {
    name: "hfcs_diabetes",
    ingredient: "high fructose corn syrup",
    profile: { type: "human", conditions: ["diabetes"] }
  },
  {
    name: "sugar_diabetes",
    ingredient: "sugar",
    profile: { type: "human", conditions: ["diabetes"] }
  },
  {
    name: "xylitol_pet",
    ingredient: "xylitol",
    profile: { type: "pet", conditions: [] }
  }
];

for (const testCase of cases) {
  const product = {
    product_name: testCase.name,
    ingredients: [testCase.ingredient],
    nutrition: {},
    isOrganic: false
  };

  const scoring = calculateProductScore(product, testCase.profile);
  const graphRisk = calculateGraphRisk(product.ingredients, testCase.profile);
  const contextRisk = calculateContextRisk(product.ingredients, testCase.profile);
  const final = analyzeProduct(product, testCase.profile);

  console.log("=== TRACE:", testCase.name, "===");
  console.log(JSON.stringify({
    ingredient: testCase.ingredient,
    profile: testCase.profile,
    baseScoreFromProductScoreEngine: scoring?.finalScore ?? null,
    scoringIngredientFlags: scoring?.ingredientFlags ?? [],
    graphPenalty: graphRisk?.penalty ?? null,
    graphFlags: graphRisk?.flags ?? [],
    contextPenalty: contextRisk?.penalty ?? null,
    contextFlags: contextRisk?.flags ?? [],
    finalScore: final?.score ?? null,
    finalFlags: final?.flags ?? [],
    petToxins: final?.petToxins ?? [],
    recommendation: final?.recommendation ?? null
  }, null, 2));
}
