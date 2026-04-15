import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors, radius, spacing, typography } from "../theme/theme";

type Props = {
  label: string;
  tone?: "safe" | "caution" | "danger";
};

export function RiskBadge({ label, tone = "safe" }: Props) {
  const bg =
    tone === "danger" ? colors.error :
    tone === "caution" ? colors.caution :
    colors.success;

  return (
    <View style={[styles.badge, { backgroundColor: bg }]}>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
    alignSelf: "flex-start",
  },
  text: {
    ...typography.caption,
    color: colors.white,
  },
});




