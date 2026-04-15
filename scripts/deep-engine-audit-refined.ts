import fs from "fs";
import path from "path";

const reportPath = path.resolve(process.cwd(), "audit-output", "deep-engine-audit-report.json");
if (!fs.existsSync(reportPath)) {
  throw new Error("Missing audit-output/deep-engine-audit-report.json");
}

const report = JSON.parse(fs.readFileSync(reportPath, "utf8"));
const overlapRows = Array.isArray(report.overlapRows) ? report.overlapRows : [];
const canonicalRows = Array.isArray(report.canonicalRows) ? report.canonicalRows : [];
const petMisses = Array.isArray(report.exactPetToxinMisses) ? report.exactPetToxinMisses : [];

const highOverlap = overlapRows.filter((r:any) => r.overlapRisk === "HIGH");
const mediumOverlap = overlapRows.filter((r:any) => r.overlapRisk === "MEDIUM");

const petFlagMissOnly = petMisses.filter((r:any) => r.failedFlag && !r.failedPetToxinList);
const petListMissOnly = petMisses.filter((r:any) => !r.failedFlag && r.failedPetToxinList);
const petBothMiss = petMisses.filter((r:any) => r.failedFlag && r.failedPetToxinList);
const petNotes = petMisses.filter((r:any) => Array.isArray(r.notes) && r.notes.length > 0);

const onlyOneSource = canonicalRows.filter((r:any) => r.sourceCount === 1);
const missingGraph = canonicalRows.filter((r:any) => !r.hasGraph);
const missingInfo = canonicalRows.filter((r:any) => !r.hasInfo);
const missingRules = canonicalRows.filter((r:any) => !r.hasRule);
const missingKnowledge = canonicalRows.filter((r:any) => !r.hasKnowledge);

const topCanonicalGaps = canonicalRows
  .map((r:any) => ({
    ingredient: r.ingredient,
    missingCount:
      (r.hasInfo ? 0 : 1) +
      (r.hasGraph ? 0 : 1) +
      (r.hasRule ? 0 : 1) +
      (r.hasKnowledge ? 0 : 1),
    hasInfo: r.hasInfo,
    hasGraph: r.hasGraph,
    hasRule: r.hasRule,
    hasKnowledge: r.hasKnowledge,
    sources: r.sources || []
  }))
  .sort((a:any,b:any) => b.missingCount - a.missingCount || a.ingredient.localeCompare(b.ingredient));

const refined = {
  summary: {
    highOverlapCount: highOverlap.length,
    mediumOverlapCount: mediumOverlap.length,
    petMissRawCount: petMisses.length,
    petFlagMissOnlyCount: petFlagMissOnly.length,
    petListMissOnlyCount: petListMissOnly.length,
    petBothMissCount: petBothMiss.length,
    petNotesCount: petNotes.length,
    onlyOneSourceCount: onlyOneSource.length,
    missingGraphCount: missingGraph.length,
    missingInfoCount: missingInfo.length,
    missingRulesCount: missingRules.length,
    missingKnowledgeCount: missingKnowledge.length
  },
  highOverlapIngredients: highOverlap.map((r:any) => ({
    ingredient: r.ingredient,
    overlapReasons: r.overlapReasons,
    humanBaseScore: r.humanBaseScore,
    humanGraphPenalty: r.humanGraphPenalty,
    humanContextPenalty: r.humanContextPenalty,
    finalScore: r.finalScore,
    scoringFlags: r.scoringFlags,
    finalFlags: r.finalFlags
  })),
  mediumOverlapIngredients: mediumOverlap.map((r:any) => ({
    ingredient: r.ingredient,
    overlapReasons: r.overlapReasons,
    humanBaseScore: r.humanBaseScore,
    humanGraphPenalty: r.humanGraphPenalty,
    humanContextPenalty: r.humanContextPenalty,
    finalScore: r.finalScore,
    scoringFlags: r.scoringFlags,
    finalFlags: r.finalFlags
  })),
  petMissBreakdown: {
    petFlagMissOnly: petFlagMissOnly.map((r:any) => r.ingredient),
    petListMissOnly: petListMissOnly.map((r:any) => r.ingredient),
    petBothMiss: petBothMiss.map((r:any) => r.ingredient)
  },
  topCanonicalGaps: topCanonicalGaps.slice(0, 50)
};

const outPath = path.resolve(process.cwd(), "audit-output", "deep-engine-audit-refined.json");
fs.writeFileSync(outPath, JSON.stringify(refined, null, 2), "utf8");

const lines = [
  "=== REFINED ENGINE AUDIT ===",
  "",
  "COUNTS",
  `- High overlap: ${refined.summary.highOverlapCount}`,
  `- Medium overlap: ${refined.summary.mediumOverlapCount}`,
  `- Raw pet misses: ${refined.summary.petMissRawCount}`,
  `- Pet flag miss only: ${refined.summary.petFlagMissOnlyCount}`,
  `- Pet list miss only: ${refined.summary.petListMissOnlyCount}`,
  `- Pet both miss: ${refined.summary.petBothMissCount}`,
  `- Only one source: ${refined.summary.onlyOneSourceCount}`,
  `- Missing graph: ${refined.summary.missingGraphCount}`,
  `- Missing info: ${refined.summary.missingInfoCount}`,
  `- Missing rules: ${refined.summary.missingRulesCount}`,
  `- Missing knowledge: ${refined.summary.missingKnowledgeCount}`,
  "",
  "HIGH OVERLAP INGREDIENTS",
  ...(refined.highOverlapIngredients.length
    ? refined.highOverlapIngredients.map((r:any) => `- ${r.ingredient} :: ${r.overlapReasons.join(" | ")}`)
    : ["- none"]),
  "",
  "MEDIUM OVERLAP INGREDIENTS",
  ...(refined.mediumOverlapIngredients.length
    ? refined.mediumOverlapIngredients.map((r:any) => `- ${r.ingredient} :: ${r.overlapReasons.join(" | ")}`)
    : ["- none"]),
  "",
  "FILES WRITTEN",
  "- audit-output/deep-engine-audit-refined.json"
];

const txtPath = path.resolve(process.cwd(), "audit-output", "deep-engine-audit-refined.txt");
fs.writeFileSync(txtPath, lines.join("\n"), "utf8");

console.log(lines.join("\n"));
