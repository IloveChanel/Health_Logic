export type IngredientOcrResult = {
  ok: boolean;
  status: "ok" | "unconfigured" | "error";
  rawText: string;
  ingredients: string[];
  explanation: string;
};

export async function extractIngredientTextFromImage(imageUri: string): Promise<IngredientOcrResult> {
  const endpoint = process.env.EXPO_PUBLIC_INGREDIENT_OCR_URL;

  if (!endpoint) {
    return {
      ok: false,
      status: "unconfigured",
      rawText: "",
      ingredients: [],
      explanation: "OCR backend not configured. Set EXPO_PUBLIC_INGREDIENT_OCR_URL to a secure backend endpoint."
    };
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ imageUri })
    });

    if (!response.ok) {
      return {
        ok: false,
        status: "error",
        rawText: "",
        ingredients: [],
        explanation: "OCR backend request failed."
      };
    }

    const json: any = await response.json();

    return {
      ok: true,
      status: "ok",
      rawText: typeof json?.rawText === "string" ? json.rawText : "",
      ingredients: Array.isArray(json?.ingredients) ? json.ingredients.filter((x: any) => typeof x === "string") : [],
      explanation: typeof json?.explanation === "string"
        ? json.explanation
        : "OCR backend returned ingredient extraction results."
    };
  } catch {
    return {
      ok: false,
      status: "error",
      rawText: "",
      ingredients: [],
      explanation: "OCR backend could not be reached."
    };
  }
}
