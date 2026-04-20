export type BarcodeFallbackResult = {
  ok: boolean;
  status: "ok" | "unconfigured" | "not_found" | "error";
  productName?: string;
  brandName?: string;
  category?: string;
  ingredients?: string[];
  explanation: string;
  raw?: any;
};

function getString(value: any): string | undefined {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : undefined;
}

function extractFallbackIngredients(json: any): string[] {
  if (Array.isArray(json?.ingredients) && json.ingredients.length) {
    return json.ingredients
      .map((x: any) => getString(x?.text) ?? getString(x?.name) ?? getString(x))
      .filter((x: any) => typeof x === "string");
  }

  if (Array.isArray(json?.product?.ingredients) && json.product.ingredients.length) {
    return json.product.ingredients
      .map((x: any) => getString(x?.text) ?? getString(x?.name) ?? getString(x))
      .filter((x: any) => typeof x === "string");
  }

  const ingredientsText =
    getString(json?.ingredients_text) ??
    getString(json?.ingredientsText) ??
    getString(json?.product?.ingredients_text) ??
    getString(json?.product?.ingredientsText);

  if (ingredientsText) {
    return ingredientsText
      .split(",")
      .map((x: string) => x.trim())
      .filter(Boolean);
  }

  if (Array.isArray(json?.ingredients_tags) && json.ingredients_tags.length) {
    return json.ingredients_tags
      .map((x: any) => getString(x)?.replace(/^en:/, ""))
      .filter((x: any) => typeof x === "string");
  }

  if (Array.isArray(json?.product?.ingredients_tags) && json.product.ingredients_tags.length) {
    return json.product.ingredients_tags
      .map((x: any) => getString(x)?.replace(/^en:/, ""))
      .filter((x: any) => typeof x === "string");
  }

  return [];
}

export async function lookupBarcodeFallback(barcode: string): Promise<BarcodeFallbackResult> {
  const endpoint = process.env.EXPO_PUBLIC_BARCODE_LOOKUP_URL;

  if (!endpoint) {
    return {
      ok: false,
      status: "unconfigured",
      explanation: "Barcode fallback backend not configured. Set EXPO_PUBLIC_BARCODE_LOOKUP_URL to a secure backend endpoint."
    };
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ barcode })
    });

    if (response.status === 404) {
      return {
        ok: false,
        status: "not_found",
        explanation: "Barcode fallback backend did not find this product."
      };
    }

    if (!response.ok) {
      return {
        ok: false,
        status: "error",
        explanation: "Barcode fallback backend request failed."
      };
    }

    const json: any = await response.json();
    console.log("DEBUG_RAW_PAYLOAD:", JSON.stringify(json, null, 2));

    return {
      ok: true,
      status: "ok",
      productName: typeof json?.productName === "string" ? json.productName : "VERIFY_NEW_CODE",
      brandName: typeof json?.brandName === "string" ? json.brandName : undefined,
      category: typeof json?.category === "string" ? json.category : undefined,
      ingredients: extractFallbackIngredients(json),
      explanation: typeof json?.explanation === "string"
        ? json.explanation
        : "Barcode fallback backend returned a product result.",
      raw: json
    };
  } catch {
    return {
      ok: false,
      status: "error",
      explanation: "Barcode fallback backend could not be reached."
    };
  }
}

