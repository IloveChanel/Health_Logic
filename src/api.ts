import { scanProduct } from "./engine/scanPipeline";
import { scanBeautyProduct } from "./engine/scanBeautyPipeline";
import { lookupBarcodeFallback } from "./engine/barcodeFallbackBridge";
import { getIngredientExplanation } from "./engine/ingredientKnowledge";

function getString(value: any): string | undefined {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : undefined;
}

function normalizeIngredientName(value: string): string {
  return value.trim().toLowerCase();
}

function buildIngredientObjects(items: string[] = []) {
  return items.map((i: string) => {
    const explanation = getIngredientExplanation(i) ?? "";
    const normalizedName = normalizeIngredientName(i);

    return {
      name: i,
      normalizedName,
      purpose: explanation,
      benefits: [],
      concerns: explanation ? [explanation] : [],
      personalizedFlags: [],
      recommendation: explanation ? "review" : "unknown",
      summary: explanation
    };
  });
}

function getPrimaryProductName(result: any): string | undefined {
  return (
    getString(result?.productName) ??
    getString(result?.name) ??
    getString(result?.title) ??
    getString(result?.product?.product_name) ??
    getString(result?.product?.productName) ??
    getString(result?.product_name)
  );
}

function getPrimaryBrandName(result: any): string | undefined {
  return (
    getString(result?.brandName) ??
    getString(result?.brand) ??
    getString(result?.brands) ??
    getString(result?.product?.brands) ??
    getString(result?.product?.brand) ??
    getString(result?.product?.brandName)
  );
}

function getPrimaryCategory(result: any): string | undefined {
  return (
    getString(result?.category) ??
    getString(result?.product?.category) ??
    getString(result?.product?.categories) ??
    getString(result?.categories)
  );
}

function getPrimaryIngredients(result: any): string[] {
  if (Array.isArray(result?.ingredients) && result.ingredients.length) {
    return result.ingredients
      .map((x: any) => getString(x?.text) ?? getString(x?.name) ?? getString(x))
      .filter((x: any) => typeof x === "string");
  }

  if (Array.isArray(result?.product?.ingredients) && result.product.ingredients.length) {
    return result.product.ingredients
      .map((x: any) => getString(x?.text) ?? getString(x?.name) ?? getString(x))
      .filter((x: any) => typeof x === "string");
  }

  if (Array.isArray(result?.product?.ingredients_text) && result.product.ingredients_text.length) {
    return result.product.ingredients_text.filter((x: any) => typeof x === "string");
  }

  const ingredientsText =
    getString(result?.ingredientsText) ??
    getString(result?.ingredients_text) ??
    getString(result?.product?.ingredients_text);

  if (ingredientsText) {
    return ingredientsText
      .split(",")
      .map((x) => x.trim())
      .filter(Boolean);
  }

  return [];
}

function buildAnalysisFromPrimary(result: any) {
  const productName = getPrimaryProductName(result) ?? "Scanned Product";
  const brandName = getPrimaryBrandName(result) ?? "Primary Scanner Source";
  const category = getPrimaryCategory(result) ?? "food";
  const ingredients = getPrimaryIngredients(result);

  return {
    productName,
    brandName,
    category,
    overallScore: typeof result?.score === "number" ? result.score : 50,
    fitForUserScore: typeof result?.score === "number" ? result.score : 50,
    redFlags: Array.isArray(result?.flags) ? result.flags.flat() : [],
    benefits: [],
    ingredients: buildIngredientObjects(ingredients),
    explanation: getString(result?.nova?.label) ?? "HealthLogic primary engine result",
    nova: result?.nova ?? null,
    alternatives: Array.isArray(result?.alternatives) ? result.alternatives : [],
    petToxins: Array.isArray(result?.petToxins) ? result.petToxins : []
  };
}

function buildAnalysisFromFallback(fallback: any) {
  return {
    productName: fallback?.productName ?? "Fallback Product",
    brandName: fallback?.brandName ?? "Fallback Barcode Source",
    category: fallback?.category ?? "unknown",
    overallScore: 50,
    fitForUserScore: 50,
    redFlags: [],
    benefits: [],
    ingredients: buildIngredientObjects(Array.isArray(fallback?.ingredients) ? fallback.ingredients : []),
    explanation: fallback?.explanation ?? "Barcode fallback result",
    nova: null,
    alternatives: [],
    petToxins: []
  };
}

function hasStrongPrimaryResult(analysis: any) {
  return Boolean(
    getString(analysis?.productName) &&
    (
      (Array.isArray(analysis?.ingredients) && analysis.ingredients.length > 0) ||
      getString(analysis?.brandName)
    )
  );
}

export async function scanBarcode(barcode: string) {
  const profile = {
    type: "adult",
    allergies: [],
    conditions: []
  };

  let primaryAnalysis: any = null;
  let primaryError: any = null;

  try {
    const result = await scanProduct(barcode, profile);
    primaryAnalysis = buildAnalysisFromPrimary(result);

    if (hasStrongPrimaryResult(primaryAnalysis)) {
      return primaryAnalysis;
    }
  } catch (error) {
    primaryError = error;
  }

  const fallback = await lookupBarcodeFallback(barcode);

  if (fallback.ok) {
    return buildAnalysisFromFallback(fallback);
  }

  if (primaryAnalysis) {
    return {
      ...primaryAnalysis,
      explanation: [
        primaryAnalysis.explanation,
        fallback?.explanation ?? "No fallback result available."
      ].filter(Boolean).join(" | ")
    };
  }

  if (primaryError) {
    throw primaryError;
  }

  throw new Error("We could not analyze that barcode.");
}

export async function scanBeautyBarcode(barcode: string) {
  return scanBeautyProduct(barcode);
}

export async function fetchBrandInfo(name: string) {
  return {
    brandName: name,
    trustScore: 80,
    notes: "Brand info not enriched yet"
  };
}

export async function submitCustomProfileOption(payload: any) {
  return {
    ok: true,
    saved: true,
    value: payload.value
  };
}
