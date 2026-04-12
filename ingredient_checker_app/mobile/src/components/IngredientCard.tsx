import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { IngredientAnalysis } from "../types/domain";
import { colors, radius, spacing, typography } from "../theme/theme";

type Props = {
  ingredient: IngredientAnalysis;
};

export default function IngredientCard({ ingredient }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{ingredient.name}</Text>
      <Text style={styles.purpose}>{ingredient.purpose || "Purpose pending"}</Text>
      <Text style={styles.recommendation}>Status: {ingredient.recommendation}</Text>
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
  purpose: {
    ...typography.bodySecondary,
    color: colors.secondaryText,
    marginBottom: spacing.xs,
  },
  recommendation: {
    ...typography.caption,
    color: colors.primary,
  },
});
