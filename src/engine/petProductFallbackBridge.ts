export type PetProductFallbackResult = {
  ok: boolean;
  status: "ok" | "unconfigured" | "not_found" | "error";
  productName?: string;
  brandName?: string;
  category?: string;
  ingredients?: string[];
  explanation: string;
};

export async function lookupPetProductFallback(barcode: string): Promise<PetProductFallbackResult> {
  const endpoint = process.env.EXPO_PUBLIC_PET_PRODUCT_LOOKUP_URL;

  if (!endpoint) {
    return {
      ok: false,
      status: "unconfigured",
      explanation: "Pet fallback backend not configured."
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
        explanation: "Pet fallback backend did not find this product."
      };
    }

    if (!response.ok) {
      return {
        ok: false,
        status: "error",
        explanation: "Pet fallback backend request failed."
      };
    }

    const json: any = await response.json();

    return {
      ok: true,
      status: "ok",
      productName: typeof json?.productName === "string" ? json.productName : undefined,
      brandName: typeof json?.brandName === "string" ? json.brandName : undefined,
      category: typeof json?.category === "string" ? json.category : "pet",
      ingredients: Array.isArray(json?.ingredients) ? json.ingredients.filter((x: any) => typeof x === "string") : [],
      explanation: typeof json?.explanation === "string" ? json.explanation : "Pet fallback backend returned a product result."
    };
  } catch {
    return {
      ok: false,
      status: "error",
      explanation: "Pet fallback backend could not be reached."
    };
  }
}
