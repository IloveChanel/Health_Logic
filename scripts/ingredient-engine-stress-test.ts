import fs from "fs";
import path from "path";

import { analyzeProduct } from "../src/engine/analyzeProduct";
import { parseIngredients } from "../src/engine/ingredientParser";
import { normalizeIngredient } from "../src/engine/ingredientNormalizer";
import { INGREDIENT_INFO } from "../src/engine/ingredientInfoDictionary";
import { INGREDIENT_GRAPH } from "../src/engine/ingredientGraph";
import { INGREDIENT_RULES } from "../src/engine/ingredientDictionary";
import { INGREDIENT_KNOWLEDGE } from "../src/engine/ingredientKnowledge";
import { PET_TOXINS } from "../src/engine/petToxinDatabase";

type AuditRow = {
  ingredient: string;
  normalized: string;
  sources: string[];
  hasInfo: boolean;
  hasGraph: boolean;
  hasRule: boolean;
  hasKnowledge: boolean;
  inPetToxins: boolean;
  humanScore: number;
  diabetesScore: number;
  petScore: number;
  humanFlags: string[];
  diabetesFlags: string[];
  petFlags: string[];
  recommendationHuman: string;
  recommendationDiabetes: string;
  recommendationPet: string;
  issues: string[];
};

function uniq(values: string[]): string[] {
  return [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b));
}

function toArray(value: unknown): string[] {
  if (!value) return [];
  if (Array.isArray(value)) return value.map(v => String(v));
  return [String(value)];
}

function getRecommendationLabel(rec: any): string {
  if (!rec) return "UNKNOWN";
  if (typeof rec === "string") return rec;
  if (typeof rec === "object" && rec.recommendation) return String(rec.recommendation);
  return "UNKNOWN";
}

function safeAnalyze(ingredient: string, profile: any) {
  try {
    const result = analyzeProduct(
      {
        product_name: "Stress Test Product",
        ingredients: [ingredient],
        nutrition: {},
        isOrganic: false,
      },
      profile
    );
    return result;
  } catch (err: any) {
    return {
      score: -1,
      flags: ["ENGINE_ERROR: " + (err?.message || String(err))],
      recommendation: { recommendation: "ERROR" },
    };
  }
}

const sourceMap = new Map<string, Set<string>>();

function addSource(rawName: string, source: string) {
  const normalized = normalizeIngredient(rawName);
  if (!normalized) return;
  if (!sourceMap.has(normalized)) sourceMap.set(normalized, new Set<string>());
  sourceMap.get(normalized)!.add(source);
}

Object.keys(INGREDIENT_INFO || {}).forEach(k => addSource(k, "INGREDIENT_INFO"));
Object.keys(INGREDIENT_GRAPH || {}).forEach(k => addSource(k, "INGREDIENT_GRAPH"));
Object.keys(INGREDIENT_RULES || {}).forEach(k => addSource(k, "INGREDIENT_RULES"));
Object.keys(INGREDIENT_KNOWLEDGE || {}).forEach(k => addSource(k, "INGREDIENT_KNOWLEDGE"));
toArray(PET_TOXINS).forEach(k => addSource(k, "PET_TOXINS"));

const allIngredients = [...sourceMap.keys()].sort((a, b) => a.localeCompare(b));

const rows: AuditRow[] = [];
const missingInfo: string[] = [];
const missingGraph: string[] = [];
const missingRules: string[] = [];
const missingKnowledge: string[] = [];
const parserRoundtripIssues: Array<{ raw: string; parsed: string[] }> = [];

for (const ingredient of allIngredients) {
  const parsed = parseIngredients(ingredient);
  if (!parsed.includes(ingredient)) {
    parserRoundtripIssues.push({ raw: ingredient, parsed });
  }

  const hasInfo = !!(INGREDIENT_INFO as any)[ingredient];
  const hasGraph = !!(INGREDIENT_GRAPH as any)[ingredient];
  const hasRule = !!(INGREDIENT_RULES as any)[ingredient];
  const hasKnowledge = !!(INGREDIENT_KNOWLEDGE as any)[ingredient];
  const inPetToxins = toArray(PET_TOXINS).includes(ingredient);

  const humanProfile = { type: "human", conditions: [] };
  const diabetesProfile = { type: "human", conditions: ["diabetes"] };
  const petProfile = { type: "pet", conditions: [] };

  const human = safeAnalyze(ingredient, humanProfile);
  const diabetes = safeAnalyze(ingredient, diabetesProfile);
  const pet = safeAnalyze(ingredient, petProfile);

  const issues: string[] = [];

  if (!hasInfo) {
    issues.push("missing_info");
    missingInfo.push(ingredient);
  }

  if (!hasGraph) {
    issues.push("missing_graph");
    missingGraph.push(ingredient);
  }

  if (!hasRule) {
    issues.push("missing_rule");
    missingRules.push(ingredient);
  }

  if (!hasKnowledge) {
    issues.push("missing_knowledge");
    missingKnowledge.push(ingredient);
  }

  if (inPetToxins && !pet.flags.some((f: string) => f.toLowerCase().includes("toxic for pets"))) {
    issues.push("pet_toxin_not_flagged");
  }

  if (hasGraph && diabetes.score >= human.score) {
    const node = (INGREDIENT_GRAPH as any)[ingredient];
    const hasCondition = Array.isArray(node?.conditions) && node.conditions.includes("diabetes");
    if (hasCondition) {
      issues.push("diabetes_profile_not_more_strict");
    }
  }

  if (human.score === -1 || diabetes.score === -1 || pet.score === -1) {
    issues.push("engine_error");
  }

  rows.push({
    ingredient,
    normalized: ingredient,
    sources: uniq([...sourceMap.get(ingredient)!]),
    hasInfo,
    hasGraph,
    hasRule,
    hasKnowledge,
    inPetToxins,
    humanScore: Number(human.score ?? -1),
    diabetesScore: Number(diabetes.score ?? -1),
    petScore: Number(pet.score ?? -1),
    humanFlags: uniq(toArray(human.flags)),
    diabetesFlags: uniq(toArray(diabetes.flags)),
    petFlags: uniq(toArray(pet.flags)),
    recommendationHuman: getRecommendationLabel(human.recommendation),
    recommendationDiabetes: getRecommendationLabel(diabetes.recommendation),
    recommendationPet: getRecommendationLabel(pet.recommendation),
    issues: uniq(issues),
  });
}

const riskyRows = rows
  .filter(r => r.humanScore < 100 || r.diabetesScore < 100 || r.petScore < 100 || r.issues.length > 0)
  .sort((a, b) => {
    if (a.issues.length !== b.issues.length) return b.issues.length - a.issues.length;
    return a.humanScore - b.humanScore;
  });

const summary = {
  totalIngredients: rows.length,
  missingInfoCount: uniq(missingInfo).length,
  missingGraphCount: uniq(missingGraph).length,
  missingRuleCount: uniq(missingRules).length,
  missingKnowledgeCount: uniq(missingKnowledge).length,
  parserRoundtripIssueCount: parserRoundtripIssues.length,
  petToxinCount: rows.filter(r => r.inPetToxins).length,
  engineErrorCount: rows.filter(r => r.issues.includes("engine_error")).length,
  diabetesNotStricterCount: rows.filter(r => r.issues.includes("diabetes_profile_not_more_strict")).length,
  petToxinNotFlaggedCount: rows.filter(r => r.issues.includes("pet_toxin_not_flagged")).length,
};

const outDir = path.resolve(process.cwd(), "audit-output");
fs.mkdirSync(outDir, { recursive: true });

fs.writeFileSync(
  path.join(outDir, "ingredient-audit-summary.json"),
  JSON.stringify(summary, null, 2),
  "utf8"
);

fs.writeFileSync(
  path.join(outDir, "ingredient-audit-full.json"),
  JSON.stringify(rows, null, 2),
  "utf8"
);

fs.writeFileSync(
  path.join(outDir, "ingredient-audit-risky.json"),
  JSON.stringify(riskyRows, null, 2),
  "utf8"
);

fs.writeFileSync(
  path.join(outDir, "ingredient-audit-missing-info.txt"),
  uniq(missingInfo).join("\n"),
  "utf8"
);

fs.writeFileSync(
  path.join(outDir, "ingredient-audit-missing-graph.txt"),
  uniq(missingGraph).join("\n"),
  "utf8"
);

fs.writeFileSync(
  path.join(outDir, "ingredient-audit-missing-rules.txt"),
  uniq(missingRules).join("\n"),
  "utf8"
);

fs.writeFileSync(
  path.join(outDir, "ingredient-audit-missing-knowledge.txt"),
  uniq(missingKnowledge).join("\n"),
  "utf8"
);

fs.writeFileSync(
  path.join(outDir, "ingredient-audit-parser-roundtrip.json"),
  JSON.stringify(parserRoundtripIssues, null, 2),
  "utf8"
);

const csvHeader = [
  "ingredient",
  "sources",
  "hasInfo",
  "hasGraph",
  "hasRule",
  "hasKnowledge",
  "inPetToxins",
  "humanScore",
  "diabetesScore",
  "petScore",
  "recommendationHuman",
  "recommendationDiabetes",
  "recommendationPet",
  "issues",
  "humanFlags",
  "diabetesFlags",
  "petFlags"
];

const csvLines = [
  csvHeader.join(","),
  ...rows.map(r => [
    JSON.stringify(r.ingredient),
    JSON.stringify(r.sources.join("|")),
    r.hasInfo,
    r.hasGraph,
    r.hasRule,
    r.hasKnowledge,
    r.inPetToxins,
    r.humanScore,
    r.diabetesScore,
    r.petScore,
    JSON.stringify(r.recommendationHuman),
    JSON.stringify(r.recommendationDiabetes),
    JSON.stringify(r.recommendationPet),
    JSON.stringify(r.issues.join("|")),
    JSON.stringify(r.humanFlags.join("|")),
    JSON.stringify(r.diabetesFlags.join("|")),
    JSON.stringify(r.petFlags.join("|")),
  ].join(","))
];

fs.writeFileSync(
  path.join(outDir, "ingredient-audit-full.csv"),
  csvLines.join("\n"),
  "utf8"
);

console.log("\n=== INGREDIENT ENGINE STRESS TEST COMPLETE ===");
console.log("Total ingredients audited:", summary.totalIngredients);
console.log("Missing info:", summary.missingInfoCount);
console.log("Missing graph:", summary.missingGraphCount);
console.log("Missing rules:", summary.missingRuleCount);
console.log("Missing knowledge:", summary.missingKnowledgeCount);
console.log("Parser roundtrip issues:", summary.parserRoundtripIssueCount);
console.log("Pet toxin not flagged:", summary.petToxinNotFlaggedCount);
console.log("Diabetes not stricter:", summary.diabetesNotStricterCount);
console.log("Engine errors:", summary.engineErrorCount);
console.log("");
console.log("Reports written to:");
console.log(path.join(outDir, "ingredient-audit-summary.json"));
console.log(path.join(outDir, "ingredient-audit-full.json"));
console.log(path.join(outDir, "ingredient-audit-risky.json"));
console.log(path.join(outDir, "ingredient-audit-full.csv"));
console.log(path.join(outDir, "ingredient-audit-missing-info.txt"));
console.log(path.join(outDir, "ingredient-audit-missing-graph.txt"));
console.log(path.join(outDir, "ingredient-audit-missing-rules.txt"));
console.log(path.join(outDir, "ingredient-audit-missing-knowledge.txt"));
console.log(path.join(outDir, "ingredient-audit-parser-roundtrip.json"));
