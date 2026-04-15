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
  const result = analyzeProduct(
    {
      product_name: testCase.name,
      ingredients: [testCase.ingredient],
      nutrition: {},
      isOrganic: false
    },
    testCase.profile
  );

  console.log("===", testCase.name, "===");
  console.log(JSON.stringify({
    ingredient: testCase.ingredient,
    score: result.score,
    flags: result.flags,
    petToxins: result.petToxins,
    recommendation: result.recommendation
  }, null, 2));
}
