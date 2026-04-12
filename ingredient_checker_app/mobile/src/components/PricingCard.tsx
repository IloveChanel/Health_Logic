import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors, radius, spacing, typography } from "../theme/theme";
import PrimaryButton from "./PrimaryButton";

type Props = {
  onPress: () => void;
};

export default function PricingCard({ onPress }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.eyebrow}>Premium Access</Text>
      <Text style={styles.price}>$9.99/month</Text>
      <Text style={styles.copy}>
        Unlimited scans, personalized food + beauty ingredient insights, red flags, and smarter recommendations.
      </Text>
      <PrimaryButton title="Subscribe for $9.99/month" onPress={onPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.accentSoft,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  eyebrow: {
    ...typography.caption,
    color: colors.primaryDark,
    marginBottom: spacing.xs,
  },
  price: {
    ...typography.h2,
    color: colors.primaryText,
    marginBottom: spacing.sm,
  },
  copy: {
    ...typography.bodySecondary,
    color: colors.secondaryText,
    marginBottom: spacing.md,
  },
});
