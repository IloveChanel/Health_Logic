export type AiEnrichmentResult = {
  ok: boolean;
  status: "ok" | "unconfigured" | "error";
  productName?: string;
  brandName?: string;
  category?: string;
  ingredients?: string[];
  explanation: string;
};

export async function enrichProductWithAi(payload: {
  barcode?: string;
  productName?: string;
  brandName?: string;
  category?: string;
  ingredients?: string[];
}): Promise<AiEnrichmentResult> {
  const endpoint = process.env.EXPO_PUBLIC_AI_ENRICHMENT_URL;

  if (!endpoint) {
    return {
      ok: false,
      status: "unconfigured",
      explanation: "AI enrichment backend not configured."
    };
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      return {
        ok: false,
        status: "error",
        explanation: "AI enrichment backend request failed."
      };
    }

    const json: any = await response.json();

    return {
      ok: true,
      status: "ok",
      productName: typeof json?.productName === "string" ? json.productName : undefined,
      brandName: typeof json?.brandName === "string" ? json.brandName : undefined,
      category: typeof json?.category === "string" ? json.category : undefined,
      ingredients: Array.isArray(json?.ingredients) ? json.ingredients.filter((x: any) => typeof x === "string") : [],
      explanation: typeof json?.explanation === "string" ? json.explanation : "AI enrichment backend returned a product result."
    };
  } catch {
    return {
      ok: false,
      status: "error",
      explanation: "AI enrichment backend could not be reached."
    };
  }
}
