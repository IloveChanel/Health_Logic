import React, { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { IngredientAnalysis } from "../types/domain";
import { INGREDIENT_INFO } from "../engine/ingredientInfoDictionary";
import { colors, radius, spacing, typography } from "../theme/theme";

type Props = {
  ingredient: IngredientAnalysis;
  accepted?: boolean;
};

export default function IngredientCard({ ingredient, accepted = false }: Props) {
  const [expanded, setExpanded] = useState(false);

  const keyName = useMemo(
    () => (ingredient.normalizedName || ingredient.name || "").toLowerCase().trim(),
    [ingredient.normalizedName, ingredient.name]
  );

  let info = INGREDIENT_INFO[keyName]

if(!info){
  const keys = Object.keys(INGREDIENT_INFO)
  const match = keys.find(k => keyName.includes(k))
  if(match){
    info = INGREDIENT_INFO[match]
  }
}

  const statusText = accepted
    ? "Accepted for profile"
    : "Status: " + ingredient.recommendation;

  return (
    <View style={styles.card}>
      <Text style={styles.name}>{ingredient.name}</Text>

      <Text style={styles.definition}>
        {info?.shortDefinition || ingredient.purpose || "Ingredient details pending"}
      </Text>

      {info?.shortCautions?.length ? (
        <Text style={styles.caution}>
          {info.shortCautions[0]}
        </Text>
      ) : null}

      <Text style={[styles.recommendation, accepted && styles.accepted]}>
        {statusText}
      </Text>

      <Pressable onPress={() => setExpanded((v) => !v)} style={styles.moreButton}>
        <Text style={styles.moreButtonText}>{expanded ? "Hide details" : "More details"}</Text>
      </Pressable>

      {expanded ? (
        <View style={styles.detailWrap}>
          {info?.longDefinition ? (
            <Text style={styles.detailText}>{info.longDefinition}</Text>
          ) : null}

          {info?.longBenefits?.length ? (
            <View>
              <Text style={styles.detailHeader}>Benefits</Text>
              {info.longBenefits.map((item, idx) => (
                <Text key={"b-" + idx} style={styles.detailText}>• {item}</Text>
              ))}
            </View>
          ) : null}

          {info?.longCautions?.length ? (
            <View>
              <Text style={styles.detailHeader}>Cautions</Text>
              {info.longCautions.map((item, idx) => (
                <Text key={"c-" + idx} style={styles.detailText}>• {item}</Text>
              ))}
            </View>
          ) : null}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  name: {
    ...typography.h3,
    color: colors.primaryText,
    marginBottom: spacing.xs,
  },
  definition: {
    ...typography.bodySecondary,
    color: colors.secondaryText,
    marginBottom: spacing.xs,
  },
  caution: {
    ...typography.caption,
    color: colors.error,
    marginBottom: spacing.xs,
  },
  recommendation: {
    ...typography.caption,
    color: colors.primary,
    marginBottom: spacing.sm,
  },
  accepted: {
    color: colors.success,
  },
  moreButton: {
    alignSelf: "flex-start",
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border,
  },
  moreButtonText: {
    ...typography.caption,
    color: colors.primaryText,
  },
  detailWrap: {
    marginTop: spacing.sm,
    gap: spacing.xs,
  },
  detailHeader: {
    ...typography.caption,
    color: colors.primaryDark,
    marginBottom: spacing.xs,
  },
  detailText: {
    ...typography.bodySecondary,
    color: colors.secondaryText,
    marginBottom: spacing.xs,
  },
});





