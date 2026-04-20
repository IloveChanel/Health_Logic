import { inferDomainFromResult } from "../../src/engine/universalProductRouter";

type CaseDef = {
  name: string;
  input: any;
  expectedDomain: string;
  expectedPrimary: string;
};

const cases: CaseDef[] = [
  {
    name: "food / soy sauce",
    input: { productName: "Kikkoman Soy Sauce", category: "food", brands: "Kikkoman" },
    expectedDomain: "food",
    expectedPrimary: "openFoodFacts"
  },
  {
    name: "beauty / cleanser",
    input: { productName: "Cetaphil Gentle Skin Cleanser", category: "skincare beauty cleanser" },
    expectedDomain: "beauty",
    expectedPrimary: "openBeautyFacts"
  },
  {
    name: "pet / dog food",
    input: { productName: "Pedigree Adult Dog Food", category: "pet dog food" },
    expectedDomain: "pet",
    expectedPrimary: "petSafety"
  },
  {
    name: "supplement / vitamins",
    input: { productName: "Vitamin C Tablets", category: "dietary supplement vitamin" },
    expectedDomain: "supplement",
    expectedPrimary: "unknown"
  },
  {
    name: "household / detergent",
    input: { productName: "Tide Laundry Detergent", category: "household cleaner detergent" },
    expectedDomain: "household",
    expectedPrimary: "unknown"
  },
  {
    name: "unknown / empty",
    input: {},
    expectedDomain: "unknown",
    expectedPrimary: "unknown"
  }
];

let failed = 0;

for (const testCase of cases) {
  const actual = inferDomainFromResult(testCase.input);

  const domainPass = actual.domain === testCase.expectedDomain;
  const primaryPass = actual.primarySource === testCase.expectedPrimary;

  console.log(
    `${testCase.name} | domain=${actual.domain} | primary=${actual.primarySource} | domainPass=${domainPass} | primaryPass=${primaryPass}`
  );

  if (!domainPass || !primaryPass) {
    failed += 1;
  }
}

console.log("");
console.log(`UNIVERSAL ROUTER COVERAGE PASS: ${failed === 0 ? "TRUE" : "FALSE"}`);

if (failed > 0) {
  process.exit(1);
}
