export type HouseholdFallbackResult = {
  ok: boolean;
  status: "ok" | "unconfigured" | "not_found" | "error";
  productName?: string;
  brandName?: string;
  category?: string;
  ingredients?: string[];
  explanation: string;
};

export async function lookupHouseholdFallback(barcode: string): Promise<HouseholdFallbackResult> {
  const endpoint = process.env.EXPO_PUBLIC_HOUSEHOLD_LOOKUP_URL;

  if (!endpoint) {
    return {
      ok: false,
      status: "unconfigured",
      explanation: "Household fallback backend not configured."
    };
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ barcode })
    });

    if (response.status === 404) {
      return {
        ok: false,
        status: "not_found",
        explanation: "Household fallback backend did not find this product."
      };
    }

    if (!response.ok) {
      return {
        ok: false,
        status: "error",
        explanation: "Household fallback backend request failed."
      };
    }

    const json: any = await response.json();

    return {
      ok: true,
      status: "ok",
      productName: typeof json?.productName === "string" ? json.productName : undefined,
      brandName: typeof json?.brandName === "string" ? json.brandName : undefined,
      category: typeof json?.category === "string" ? json.category : "household",
      ingredients: Array.isArray(json?.ingredients) ? json.ingredients.filter((x: any) => typeof x === "string") : [],
      explanation: typeof json?.explanation === "string" ? json.explanation : "Household fallback backend returned a product result."
    };
  } catch {
    return {
      ok: false,
      status: "error",
      explanation: "Household fallback backend could not be reached."
    };
  }
}
