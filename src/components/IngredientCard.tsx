import React from "react";
import { View, Text } from "react-native";
import { getIngredientExplanation } from "../engine/ingredientKnowledge";
import { getIngredientInsight } from "../engine/ingredientInsightEngine";

export default function IngredientCard({ ingredient }: any) {
  const name =
    typeof ingredient === "string"
      ? ingredient
      : ingredient?.name ?? "Unknown ingredient";

  const insight = getIngredientInsight(name);

  const explanation =
    getIngredientExplanation(name) ??
    ingredient?.summary ??
    (Array.isArray(ingredient?.concerns) && ingredient.concerns.length ? ingredient.concerns[0] : undefined) ??
    (Array.isArray(ingredient?.benefits) && ingredient.benefits.length ? ingredient.benefits[0] : undefined) ??
    insight?.snippet;

  return (
    <View
      style={{
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderColor: "rgba(255,255,255,0.08)"
      }}
    >
      <Text style={{ fontWeight: "600", color: "#fff" }}>
        {name}
      </Text>

      {explanation ? (
        <Text
          style={{
            fontSize: 12,
            opacity: 0.7,
            marginTop: 4,
            color: "#fff"
          }}
        >
          {explanation}
        </Text>
      ) : null}
    </View>
  );
}
