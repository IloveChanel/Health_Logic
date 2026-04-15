import fs from "fs";
import path from "path";

type AnyObj = Record<string, any>;

function safeRequire(modulePath: string) {
  try {
    return require(modulePath);
  } catch (err: any) {
    return { __loadError: String(err?.message || err) };
  }
}

function normalizeIngredient(name: string): string {
  return String(name || "")
    .toLowerCase()
    .replace(/\(.*?\)/g, " ")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function uniq(values: string[]): string[] {
  return [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b));
}

function arrify(value: any): string[] {
  if (!value) return [];
  if (Array.isArray(value)) return value.map(v => String(v));
  return [String(value)];
}

function recLabel(rec: any): string {
  if (!rec) return "UNKNOWN";
  if (typeof rec === "string") return rec;
  if (typeof rec === "object" && rec.recommendation) return String(rec.recommendation);
  return "UNKNOWN";
}

function lowerTextArray(values: string[]): string[] {
  return values.map(v => v.toLowerCase().trim()).filter(Boolean);
}

function containsPetToxicFlag(flags: string[]): boolean {
  return lowerTextArray(flags).some(f => f.includes("toxic for pets"));
}

function clone<T>(x: T): T {
  return JSON.parse(JSON.stringify(x));
}

const modInfo = safeRequire("../src/engine/ingredientInfoDictionary");
const modGraph = safeRequire("../src/engine/ingredientGraph");
const modDict = safeRequire("../src/engine/ingredientDictionary");
const modKnowledge = safeRequire("../src/engine/ingredientKnowledge");
const modPetDb = safeRequire("../src/engine/petToxinDatabase");
const modAnalyze = safeRequire("../src/engine/analyzeProduct");
const modScore = safeRequire("../src/engine/productScoreEngine");
const modGraphRisk = safeRequire("../src/engine/graphRiskEngine");
const modContextRisk = safeRequire("../src/engine/contextRiskEngine");
const modParser = safeRequire("../src/engine/ingredientParser");
const modNormalizer = safeRequire("../src/engine/ingredientNormalizer");

const moduleLoadIssues: string[] = [];

[
  ["ingredientInfoDictionary", modInfo],
  ["ingredientGraph", modGraph],
  ["ingredientDictionary", modDict],
  ["ingredientKnowledge", modKnowledge],
  ["petToxinDatabase", modPetDb],
  ["analyzeProduct", modAnalyze],
  ["productScoreEngine", modScore],
  ["graphRiskEngine", modGraphRisk],
  ["contextRiskEngine", modContextRisk],
  ["ingredientParser", modParser],
  ["ingredientNormalizer", modNormalizer],
].forEach(([name, mod]) => {
  if ((mod as any).__loadError) {
    moduleLoadIssues.push(name + ": " + (mod as any).__loadError);
  }
});

const INGREDIENT_INFO: AnyObj = modInfo.INGREDIENT_INFO || {};
const INGREDIENT_GRAPH: AnyObj = modGraph.INGREDIENT_GRAPH || {};
const INGREDIENT_RULES: AnyObj = modDict.INGREDIENT_RULES || {};
const PET_TOXINS_DICT: string[] = arrify(modDict.PET_TOXINS || []);
const INGREDIENT_KNOWLEDGE: AnyObj = modKnowledge.INGREDIENT_KNOWLEDGE || {};
const PET_TOXINS_DB: string[] = arrify(modPetDb.PET_TOXINS || []);

const analyzeProduct = modAnalyze.analyzeProduct;
const calculateProductScore = modScore.calculateProductScore;
const calculateGraphRisk = modGraphRisk.calculateGraphRisk;
const calculateContextRisk = modContextRisk.calculateContextRisk;
const parseIngredients = modParser.parseIngredients;
const importedNormalizeIngredient = modNormalizer.normalizeIngredient || normalizeIngredient;

const sourceMap = new Map<string, Set<string>>();

function addSource(raw: string, source: string) {
  const key = importedNormalizeIngredient(raw);
  if (!key) return;
  if (!sourceMap.has(key)) sourceMap.set(key, new Set<string>());
  sourceMap.get(key)!.add(source);
}

Object.keys(INGREDIENT_INFO).forEach(k => addSource(k, "INGREDIENT_INFO"));
Object.keys(INGREDIENT_GRAPH).forEach(k => addSource(k, "INGREDIENT_GRAPH"));
Object.keys(INGREDIENT_RULES).forEach(k => addSource(k, "INGREDIENT_RULES"));
Object.keys(INGREDIENT_KNOWLEDGE).forEach(k => addSource(k, "INGREDIENT_KNOWLEDGE"));
PET_TOXINS_DICT.forEach(k => addSource(k, "PET_TOXINS_INGREDIENT_DICTIONARY"));
PET_TOXINS_DB.forEach(k => addSource(k, "PET_TOXINS_DATABASE"));

const allIngredients = [...sourceMap.keys()].sort((a, b) => a.localeCompare(b));

type CanonicalRow = {
  ingredient: string;
  sources: string[];
  hasInfo: boolean;
  hasGraph: boolean;
  hasRule: boolean;
  hasKnowledge: boolean;
  inPetToxinsDictionary: boolean;
  inPetToxinsDatabase: boolean;
  sourceCount: number;
};

const canonicalRows: CanonicalRow[] = allIngredients.map(ingredient => ({
  ingredient,
  sources: uniq([...(sourceMap.get(ingredient) || new Set<string>())]),
  hasInfo: !!INGREDIENT_INFO[ingredient],
  hasGraph: !!INGREDIENT_GRAPH[ingredient],
  hasRule: !!INGREDIENT_RULES[ingredient],
  hasKnowledge: !!INGREDIENT_KNOWLEDGE[ingredient],
  inPetToxinsDictionary: PET_TOXINS_DICT.map(importedNormalizeIngredient).includes(ingredient),
  inPetToxinsDatabase: PET_TOXINS_DB.map(importedNormalizeIngredient).includes(ingredient),
  sourceCount: (sourceMap.get(ingredient)?.size || 0),
}));

const parserChecks = {
  parserAvailable: typeof parseIngredients === "function",
  normalizerAvailable: typeof importedNormalizeIngredient === "function",
  parserRoundtripIssues: [] as Array<{ raw: string; parsed: string[] }>,
};

if (typeof parseIngredients === "function") {
  for (const ingredient of allIngredients) {
    const parsed = arrify(parseIngredients(ingredient));
    const normalizedParsed = parsed.map(importedNormalizeIngredient);
    if (!normalizedParsed.includes(ingredient)) {
      parserChecks.parserRoundtripIssues.push({ raw: ingredient, parsed });
    }
  }
}

type PetToxinAuditRow = {
  ingredient: string;
  sourceLocations: string[];
  analyzeScore: number | null;
  analyzeFlags: string[];
  analyzePetToxins: string[];
  graphPetToxic: boolean;
  failedFlag: boolean;
  failedPetToxinList: boolean;
  notes: string[];
};

const combinedPetToxins = uniq(
  [...PET_TOXINS_DICT, ...PET_TOXINS_DB].map(importedNormalizeIngredient)
);

const petToxinAudit: PetToxinAuditRow[] = [];

for (const ingredient of combinedPetToxins) {
  let result: any = null;
  const notes: string[] = [];
  if (typeof analyzeProduct === "function") {
    try {
      result = analyzeProduct(
        {
          product_name: "Pet Toxin Audit Product",
          ingredients: [ingredient],
          nutrition: {},
          isOrganic: false,
        },
        { type: "pet", conditions: [] }
      );
    } catch (err: any) {
      notes.push("analyzeProduct error: " + String(err?.message || err));
    }
  } else {
    notes.push("analyzeProduct unavailable");
  }

  const flags = arrify(result?.flags);
  const petToxins = arrify(result?.petToxins);
  const graphPetToxic = !!INGREDIENT_GRAPH[ingredient]?.petToxic;

  petToxinAudit.push({
    ingredient,
    sourceLocations: canonicalRows.find(r => r.ingredient === ingredient)?.sources || [],
    analyzeScore: typeof result?.score === "number" ? result.score : null,
    analyzeFlags: flags,
    analyzePetToxins: petToxins,
    graphPetToxic,
    failedFlag: !containsPetToxicFlag(flags),
    failedPetToxinList: !petToxins.map(importedNormalizeIngredient).includes(ingredient),
    notes,
  });
}

const exactPetToxinMisses = petToxinAudit
  .filter(r => r.failedFlag || r.failedPetToxinList || r.notes.length > 0)
  .sort((a, b) => a.ingredient.localeCompare(b.ingredient));

type OverlapRow = {
  ingredient: string;
  inGraph: boolean;
  inRules: boolean;
  humanBaseScore: number | null;
  humanGraphPenalty: number | null;
  humanContextPenalty: number | null;
  finalScore: number | null;
  scoringFlags: string[];
  finalFlags: string[];
  overlapRisk: "LOW" | "MEDIUM" | "HIGH";
  overlapReasons: string[];
};

function textMentionsIngredient(text: string, ingredient: string): boolean {
  const a = importedNormalizeIngredient(text);
  const b = importedNormalizeIngredient(ingredient);
  return a.includes(b) || b.includes(a);
}

const overlapRows: OverlapRow[] = [];

for (const ingredient of allIngredients) {
  const reasons: string[] = [];

  let scoring: any = null;
  let graphRisk: any = null;
  let contextRisk: any = null;
  let final: any = null;

  if (typeof calculateProductScore === "function") {
    try {
      scoring = calculateProductScore(
        {
          product_name: "Overlap Audit Product",
          ingredients: [ingredient],
          nutrition: {},
          isOrganic: false,
        },
        { type: "human", conditions: ["diabetes"] }
      );
    } catch (err: any) {
      reasons.push("calculateProductScore error: " + String(err?.message || err));
    }
  } else {
    reasons.push("calculateProductScore unavailable");
  }

  if (typeof calculateGraphRisk === "function") {
    try {
      graphRisk = calculateGraphRisk([ingredient], { type: "human", conditions: ["diabetes"] });
    } catch (err: any) {
      reasons.push("calculateGraphRisk error: " + String(err?.message || err));
    }
  } else {
    reasons.push("calculateGraphRisk unavailable");
  }

  if (typeof calculateContextRisk === "function") {
    try {
      contextRisk = calculateContextRisk([ingredient], { type: "human", conditions: ["diabetes"] });
    } catch (err: any) {
      reasons.push("calculateContextRisk error: " + String(err?.message || err));
    }
  } else {
    reasons.push("calculateContextRisk unavailable");
  }

  if (typeof analyzeProduct === "function") {
    try {
      final = analyzeProduct(
        {
          product_name: "Overlap Audit Product",
          ingredients: [ingredient],
          nutrition: {},
          isOrganic: false,
        },
        { type: "human", conditions: ["diabetes"] }
      );
    } catch (err: any) {
      reasons.push("analyzeProduct error: " + String(err?.message || err));
    }
  }

  const scoringFlags = arrify(scoring?.ingredientFlags);
  const finalFlags = arrify(final?.flags);
  const graphPenalty = typeof graphRisk?.penalty === "number" ? graphRisk.penalty : null;
  const contextPenalty = typeof contextRisk?.penalty === "number" ? contextRisk.penalty : null;
  const humanBaseScore = typeof scoring?.finalScore === "number" ? scoring.finalScore : null;
  const finalScore = typeof final?.score === "number" ? final.score : null;

  const mentionsInScoring = scoringFlags.some(f => textMentionsIngredient(f, ingredient));
  const mentionsInFinal = finalFlags.some(f => textMentionsIngredient(f, ingredient));
  const graphAndContextPenalize = (graphPenalty || 0) > 0 && (contextPenalty || 0) > 0;
  const multiplePenaltyChannels =
    ((INGREDIENT_GRAPH[ingredient]?.scorePenalty ? 1 : 0) +
      (INGREDIENT_RULES[ingredient]?.penalty ? 1 : 0) +
      ((graphPenalty || 0) > 0 ? 1 : 0) +
      ((contextPenalty || 0) > 0 ? 1 : 0)) >= 3;

  if (graphAndContextPenalize) reasons.push("graph_and_context_both_penalize");
  if (mentionsInScoring && mentionsInFinal && finalFlags.length > scoringFlags.length) reasons.push("same_ingredient_flagged_in_base_and_final");
  if (multiplePenaltyChannels) reasons.push("ingredient_present_in_multiple_penalty_channels");

  let overlapRisk: "LOW" | "MEDIUM" | "HIGH" = "LOW";
  if (reasons.some(r => r.includes("error") || r.includes("unavailable"))) overlapRisk = "MEDIUM";
  if (reasons.includes("graph_and_context_both_penalize") || reasons.includes("ingredient_present_in_multiple_penalty_channels")) overlapRisk = "HIGH";
  else if (reasons.length > 0) overlapRisk = "MEDIUM";

  overlapRows.push({
    ingredient,
    inGraph: !!INGREDIENT_GRAPH[ingredient],
    inRules: !!INGREDIENT_RULES[ingredient],
    humanBaseScore,
    humanGraphPenalty: graphPenalty,
    humanContextPenalty: contextPenalty,
    finalScore,
    scoringFlags,
    finalFlags,
    overlapRisk,
    overlapReasons: uniq(reasons),
  });
}

const highOverlap = overlapRows.filter(r => r.overlapRisk === "HIGH");
const mediumOverlap = overlapRows.filter(r => r.overlapRisk === "MEDIUM");

const canonicalSummary = {
  totalNormalizedIngredients: canonicalRows.length,
  hasInfo: canonicalRows.filter(r => r.hasInfo).length,
  hasGraph: canonicalRows.filter(r => r.hasGraph).length,
  hasRule: canonicalRows.filter(r => r.hasRule).length,
  hasKnowledge: canonicalRows.filter(r => r.hasKnowledge).length,
  inPetToxinsDictionary: canonicalRows.filter(r => r.inPetToxinsDictionary).length,
  inPetToxinsDatabase: canonicalRows.filter(r => r.inPetToxinsDatabase).length,
  onlyOneSource: canonicalRows.filter(r => r.sourceCount === 1).length,
  fullyMappedInfoGraphRuleKnowledge: canonicalRows.filter(r => r.hasInfo && r.hasGraph && r.hasRule && r.hasKnowledge).length,
};

const verifiedGood: string[] = [];
const verifiedRisky: string[] = [];
const unverifiedAssumptions: string[] = [];
const immediateFixes: string[] = [];
const safeLaterUpgrades: string[] = [];

if (parserChecks.parserAvailable && parserChecks.normalizerAvailable && parserChecks.parserRoundtripIssues.length === 0) {
  verifiedGood.push("Parser + normalizer are stable on the currently known ingredient set; no parser roundtrip issues were found.");
} else {
  verifiedRisky.push("Parser/normalizer stability is not fully confirmed; check parserRoundtripIssues and module load failures.");
}

if (moduleLoadIssues.length === 0) {
  verifiedGood.push("Core audit modules loaded successfully from the current codebase.");
} else {
  verifiedRisky.push("One or more engine modules failed to load; see moduleLoadIssues in the JSON report.");
}

verifiedGood.push("The audit runner is read-only with respect to engine logic; it only writes audit reports.");
verifiedGood.push("Canonical ingredient truth can be measured from the current code because ingredient registries are separately declared in the codebase.");
verifiedGood.push("Pet-toxin behavior can be exercised directly through analyzeProduct() using a pet profile.");

if (exactPetToxinMisses.length > 0) {
  verifiedRisky.push("Some pet-toxin ingredients are present in the codebase but do not consistently surface both a pet warning flag and a petToxins hit.");
}

if (canonicalSummary.onlyOneSource > 0) {
  verifiedRisky.push("Many normalized ingredients exist in only one registry, which means your truth model is fragmented.");
}

if (highOverlap.length > 0) {
  verifiedRisky.push("Some ingredients appear to be penalized through multiple channels, creating real overlap-risk candidates for double-counting.");
}

if (mediumOverlap.length > 0) {
  verifiedRisky.push("Some overlap checks are inconclusive because not all engines expose the same level of diagnostic detail.");
}

unverifiedAssumptions.push("This audit does not prove medical correctness of ingredient risk values; it only audits internal code consistency.");
unverifiedAssumptions.push("This audit does not prove any guessed synonym list for pet toxins; it only reports misses against your current code.");
unverifiedAssumptions.push("If graphRiskEngine/contextRiskEngine are incomplete or intentionally overlapping, overlap findings indicate risk, not final proof of a bug.");
unverifiedAssumptions.push("This audit does not benchmark real device performance or camera-thread smoothness.");
unverifiedAssumptions.push("This audit does not validate Open Food Facts payload quality or barcode coverage.");

immediateFixes.push("Create one canonical ingredient source model, then derive INFO, GRAPH, RULES, and KNOWLEDGE views from it.");
immediateFixes.push("Unify pet-toxin truth so the same canonical source drives both petToxins detection and user-facing toxic-for-pets flags.");
immediateFixes.push("Review every HIGH overlap item and decide whether graph/context/base penalties should stack or de-duplicate.");
immediateFixes.push("Backfill the most important high-risk and condition-sensitive ingredients first instead of auto-filling everything with generic graph nodes.");
immediateFixes.push("Add explicit audit tests for diabetic, pet, and neutral profiles on the top risky ingredients.");

safeLaterUpgrades.push("Phase 2: add a local SQLite product cache layer for high-frequency barcodes before network fallback.");
safeLaterUpgrades.push("Phase 2: store canonical normalized ingredients and precomputed summaries alongside cached barcode data.");
safeLaterUpgrades.push("Phase 2: add confidence metadata so the UI can distinguish verified analysis from partial analysis.");
safeLaterUpgrades.push("Phase 3: add snapshot/visual regression after engine truth and cache behavior are stable.");
safeLaterUpgrades.push("Phase 3: add premium motion and visual polish only after scoring integrity and safety coverage are hardened.");

const report = {
  generatedAt: new Date().toISOString(),
  moduleLoadIssues,
  verifiedGood,
  verifiedRisky,
  unverifiedAssumptions,
  immediateFixes,
  safeLaterUpgrades,
  summaries: {
    canonicalSummary,
    parserChecks: {
      parserAvailable: parserChecks.parserAvailable,
      normalizerAvailable: parserChecks.normalizerAvailable,
      parserRoundtripIssueCount: parserChecks.parserRoundtripIssues.length,
    },
    petToxinAudit: {
      combinedPetToxinCount: combinedPetToxins.length,
      exactMissCount: exactPetToxinMisses.length,
    },
    overlapAudit: {
      totalIngredientsChecked: overlapRows.length,
      highRiskCount: highOverlap.length,
      mediumRiskCount: mediumOverlap.length,
    },
  },
  canonicalRows,
  exactPetToxinMisses,
  overlapRows,
  parserRoundtripIssues: parserChecks.parserRoundtripIssues,
};

const outDir = path.resolve(process.cwd(), "audit-output");
fs.mkdirSync(outDir, { recursive: true });

fs.writeFileSync(
  path.join(outDir, "deep-engine-audit-report.json"),
  JSON.stringify(report, null, 2),
  "utf8"
);

fs.writeFileSync(
  path.join(outDir, "deep-engine-canonical-truth.json"),
  JSON.stringify(canonicalRows, null, 2),
  "utf8"
);

fs.writeFileSync(
  path.join(outDir, "deep-engine-pet-toxin-misses.json"),
  JSON.stringify(exactPetToxinMisses, null, 2),
  "utf8"
);

fs.writeFileSync(
  path.join(outDir, "deep-engine-scoring-overlap.json"),
  JSON.stringify(overlapRows, null, 2),
  "utf8"
);

const summaryText = [
  "=== DEEP ENGINE AUDIT ===",
  "",
  "VERIFIED GOOD",
  ...verifiedGood.map(x => "- " + x),
  "",
  "VERIFIED RISKY",
  ...verifiedRisky.map(x => "- " + x),
  "",
  "UNVERIFIED ASSUMPTIONS",
  ...unverifiedAssumptions.map(x => "- " + x),
  "",
  "IMMEDIATE FIXES",
  ...immediateFixes.map(x => "- " + x),
  "",
  "SAFE LATER UPGRADES",
  ...safeLaterUpgrades.map(x => "- " + x),
  "",
  "SUMMARY COUNTS",
  "- Total normalized ingredients: " + canonicalSummary.totalNormalizedIngredients,
  "- Fully mapped across info+graph+rules+knowledge: " + canonicalSummary.fullyMappedInfoGraphRuleKnowledge,
  "- Pet toxin exact misses: " + exactPetToxinMisses.length,
  "- High overlap risk items: " + highOverlap.length,
  "- Medium overlap risk items: " + mediumOverlap.length,
  "- Parser roundtrip issues: " + parserChecks.parserRoundtripIssues.length,
  "",
  "FILES WRITTEN",
  "- audit-output/deep-engine-audit-report.json",
  "- audit-output/deep-engine-canonical-truth.json",
  "- audit-output/deep-engine-pet-toxin-misses.json",
  "- audit-output/deep-engine-scoring-overlap.json",
].join("\n");

fs.writeFileSync(
  path.join(outDir, "deep-engine-audit-summary.txt"),
  summaryText,
  "utf8"
);

console.log(summaryText);
