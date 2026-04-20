import { INGREDIENT_DATASET } from "./ingredientDataset";
import { INGREDIENT_KNOWLEDGE_GRAPH } from "./ingredientKnowledgeGraph";
import { ADDITIVE_RISK } from "./additiveRiskEngine";
import * as IngredientGraphModule from "./ingredientGraph";
import * as IngredientInfoDictionaryModule from "./ingredientInfoDictionary";

export const ingredientKnowledge: Record<string, string> = {
  "water": "Water is commonly used as the base solvent in cosmetic and food formulations.",
  "glycerin": "Glycerin is a humectant that helps attract and retain moisture.",
  "niacinamide": "Niacinamide is a form of vitamin B3 commonly used to support skin barrier function.",
  "fragrance": "Fragrance can improve sensory experience but may irritate sensitive skin.",
  "parfum": "Parfum is a fragrance blend and may be a sensitivity trigger for some users.",
  "citric acid": "Citric acid is commonly used for pH adjustment and preservation support."
};

function normalizeIngredientKey(name: string): string {
  return String(name ?? "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

function safeString(value: any): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function safeArrayText(value: any): string | undefined {
  if (!Array.isArray(value)) return undefined;
  const parts = value
    .map((x) => (typeof x === "string" ? x.trim() : ""))
    .filter(Boolean);
  return parts.length ? parts.join(" ") : undefined;
}

function titleCase(value: string): string {
  return String(value ?? "")
    .split(" ")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function getIngredientGraphStore(): any {
  const mod: any = IngredientGraphModule as any;
  return (
    mod?.INGREDIENT_GRAPH ||
    mod?.ingredientGraph ||
    mod?.default ||
    {}
  );
}

function getIngredientInfoStore(): any {
  const mod: any = IngredientInfoDictionaryModule as any;
  return (
    mod?.INGREDIENT_INFO_DICTIONARY ||
    mod?.ingredientInfoDictionary ||
    mod?.INGREDIENT_INFO ||
    mod?.default ||
    {}
  );
}

function getInfoDictionaryExplanation(key: string): string | undefined {
  const store: any = getIngredientInfoStore();
  const node: any = store?.[key];
  if (!node) return undefined;

  return (
    safeString(node?.longDefinition) ||
    safeString(node?.shortDefinition) ||
    safeString(node?.summary) ||
    safeString(node?.description) ||
    safeString(node?.explanation) ||
    safeArrayText(node?.notes) ||
    safeArrayText(node?.concerns) ||
    safeArrayText(node?.benefits) ||
    safeArrayText(node?.risks)
  );
}

function getIngredientGraphExplanation(key: string): string | undefined {
  const store: any = getIngredientGraphStore();
  const node: any = store?.[key];
  if (!node) return undefined;

  return (
    safeString(node?.description) ||
    safeString(node?.summary) ||
    safeString(node?.explanation) ||
    safeString(node?.function) ||
    safeString(node?.purpose) ||
    safeArrayText(node?.risks) ||
    safeArrayText(node?.benefits) ||
    safeArrayText(node?.concerns)
  );
}

function getAdditiveRiskExplanation(key: string): string | undefined {
  const node: any = (ADDITIVE_RISK as any)?.[key];
  if (!node) return undefined;

  const risk = safeString(node?.risk);
  const concern = safeString(node?.concern);
  const note = safeString(node?.note);
  const name = safeString(node?.name) || titleCase(key);

  if (concern) return concern;
  if (note) return note;
  if (risk) return name + " is flagged as a " + risk + " risk additive.";
  return undefined;
}

function getKnowledgeGraphExplanation(key: string): string | undefined {
  const node: any = (INGREDIENT_KNOWLEDGE_GRAPH as any)?.[key];
  if (!node) return undefined;

  return (
    safeString(node?.summary) ||
    safeString(node?.description) ||
    safeString(node?.explanation) ||
    safeString(node?.note) ||
    safeString(node?.purpose) ||
    safeString(node?.function) ||
    safeArrayText(node?.benefits) ||
    safeArrayText(node?.concerns) ||
    safeArrayText(node?.risks)
  );
}

function buildFallbackExplanation(key: string): string | undefined {
  const node: any = (INGREDIENT_KNOWLEDGE_GRAPH as any)?.[key];
  if (!node) return undefined;

  const label = titleCase(key);
  const domains = Array.isArray(node?.domains)
    ? node.domains.filter((x: any) => typeof x === "string" && x.trim())
    : [];

  if (domains.includes("food")) {
    if ((node?.scorePenalty ?? 0) >= 8) {
      return label + " is a food ingredient that may deserve extra attention in this product.";
    }
    if ((node?.scorePenalty ?? 0) > 0) {
      return label + " is present in this food and may be worth reviewing depending on your goals and sensitivities.";
    }
    return label + " is present in this food product.";
  }

  if (domains.length) {
    return label + " is an ingredient recognized in the " + domains.join(", ") + " domain.";
  }

  return label + " is an ingredient present in this product.";
}

export function getIngredientExplanation(name: string): string | undefined {
  const normalized = normalizeIngredientKey(name);

  return (
    ingredientKnowledge[normalized] ||
    (INGREDIENT_DATASET as Record<string, string> | undefined)?.[normalized] ||
    getInfoDictionaryExplanation(normalized) ||
    getIngredientGraphExplanation(normalized) ||
    getAdditiveRiskExplanation(normalized) ||
    getKnowledgeGraphExplanation(normalized) ||
    buildFallbackExplanation(normalized)
  );
}

export const INGREDIENT_KNOWLEDGE = ingredientKnowledge;
