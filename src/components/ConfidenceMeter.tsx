import React, { JSX } from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors, radius, spacing, typography } from "../theme/theme";

type Props = {
  score: number;
};

export function ConfidenceMeter({ score }: Props) {
  const clamped = Math.max(0, Math.min(100, score));

  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>Confidence</Text>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${clamped}%` }]} />
      </View>
      <Text style={styles.value}>{clamped}%</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginTop: spacing.sm,
  },
  label: {
    ...typography.caption,
    color: colors.secondaryText,
    marginBottom: spacing.xs,
  },
  track: {
    width: "100%",
    height: 10,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceAlt,
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    backgroundColor: colors.primary,
    borderRadius: radius.pill,
  },
  value: {
    ...typography.caption,
    color: colors.primaryText,
    marginTop: spacing.xs,
  },
});
