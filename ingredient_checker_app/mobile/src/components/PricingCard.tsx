import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, radius, spacing, typography } from "../theme/theme";

type Props = {
  onMonthlyPress: () => void;
  onYearlyPress: () => void;
};

export default function PricingCard({ onMonthlyPress, onYearlyPress }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.eyebrow}>Premium Access</Text>
      <Text style={styles.title}>Choose your plan</Text>
      <Text style={styles.copy}>
        Unlimited food, supplement, and beauty scans with personalized health and skin-based ingredient analysis.
      </Text>

      <View style={styles.planCard}>
        <Text style={styles.planTitle}>Monthly</Text>
        <Text style={styles.planPrice}>$9.99/month</Text>
        <Pressable
          style={styles.primaryButton}
          onPress={onMonthlyPress}
          testID="choose_monthly_button"
          accessibilityLabel="choose_monthly_button"
        >
          <Text style={styles.primaryButtonText}>Choose Monthly</Text>
        </Pressable>
      </View>

      <View style={styles.planCard}>
        <Text style={styles.planTitle}>Yearly</Text>
        <Text style={styles.planPrice}>$39.99/year</Text>
        <Text style={styles.saveText}>Best value</Text>
        <Pressable
          style={styles.secondaryButton}
          onPress={onYearlyPress}
          testID="choose_yearly_button"
          accessibilityLabel="choose_yearly_button"
        >
          <Text style={styles.secondaryButtonText}>Choose Yearly</Text>
        </Pressable>
      </View>
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
  title: {
    ...typography.h2,
    color: colors.primaryText,
    marginBottom: spacing.sm,
  },
  copy: {
    ...typography.bodySecondary,
    color: colors.secondaryText,
    marginBottom: spacing.lg,
  },
  planCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  planTitle: {
    ...typography.h3,
    color: colors.primaryText,
    marginBottom: spacing.xs,
  },
  planPrice: {
    ...typography.body,
    color: colors.primaryDark,
    marginBottom: spacing.sm,
  },
  saveText: {
    ...typography.caption,
    color: colors.success,
    marginBottom: spacing.sm,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    alignItems: "center",
  },
  primaryButtonText: {
    ...typography.button,
    color: colors.white,
  },
  secondaryButton: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
  },
  secondaryButtonText: {
    ...typography.button,
    color: colors.primaryText,
  },
});
