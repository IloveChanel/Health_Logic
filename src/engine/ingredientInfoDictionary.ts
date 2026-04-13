export type IngredientInfo = {
  shortDefinition: string
  shortBenefits: string[]
  shortCautions: string[]
  longDefinition?: string
  longBenefits?: string[]
  longCautions?: string[]
}

export const INGREDIENT_INFO: Record<string, IngredientInfo> = {
  "cornstarch": {
    shortDefinition: "Gluten-free corn thickener.",
    shortBenefits: [
      "Gluten-free",
      "Useful as a cooking thickener"
    ],
    shortCautions: [
      "Can raise blood sugar quickly when cooked"
    ],
    longDefinition: "Cornstarch is a fine powder from the starchy center of corn. It is commonly used to thicken sauces, soups, and fillings.",
    longBenefits: [
      "Naturally gluten-free",
      "Plant-based",
      "Can be used in texture-modified diets"
    ],
    longCautions: [
      "High glycemic impact when cooked",
      "Use caution for diabetes or blood sugar management"
    ]
  },
  "yeast": {
    shortDefinition: "Fermentation ingredient; some forms add B vitamins and protein.",
    shortBenefits: [
      "Can support B vitamins",
      "Some forms provide complete protein"
    ],
    shortCautions: [
      "Caution for Crohn’s, gout, tyramine sensitivity, yeast sensitivity"
    ],
    longDefinition: "Yeast is a single-celled fungus used for baking, brewing, and nutritional supplementation.",
    longBenefits: [
      "Nutritional yeast can provide B vitamins",
      "Some forms support protein intake",
      "Specific strains are used in probiotic support"
    ],
    longCautions: [
      "May be problematic for Crohn’s disease in some users",
      "High purines may be an issue for gout",
      "Fermented yeast-heavy foods may trigger tyramine-sensitive migraines",
      "Use caution with yeast sensitivity"
    ]
  },
  "high fructose corn syrup": {
    shortDefinition: "Highly processed sweetener.",
    shortBenefits: [],
    shortCautions: [
      "Often treated as a high-risk added sugar ingredient"
    ],
    longDefinition: "High fructose corn syrup is a processed sweetener used in many packaged foods and drinks.",
    longBenefits: [],
    longCautions: [
      "High sugar load",
      "Often flagged for metabolic and dietary concerns"
    ]
  },
  "msg": {
    shortDefinition: "Flavor enhancer.",
    shortBenefits: [
      "Improves savory flavor"
    ],
    shortCautions: [
      "Some users prefer to avoid it"
    ]
  },
  "aspartame": {
    shortDefinition: "Artificial sweetener.",
    shortBenefits: [
      "Low-calorie sweetening"
    ],
    shortCautions: [
      "Often avoided by users with sweetener concerns"
    ]
  },
  "xylitol": {
    shortDefinition: "Sugar alcohol sweetener.",
    shortBenefits: [
      "Low sugar alternative in human products"
    ],
    shortCautions: [
      "Toxic for dogs"
    ]
  }
}
