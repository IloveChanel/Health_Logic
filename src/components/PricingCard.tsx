import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, radius, spacing, typography } from "../theme/theme";

type Props = {
  onSingleMonthlyPress: () => void;
  onFamilyMonthlyPress: () => void;
  onSingleAnnualPress: () => void;
  onFamilyAnnualPress: () => void;
};

export default function PricingCard({
  onSingleMonthlyPress,
  onFamilyMonthlyPress,
  onSingleAnnualPress,
  onFamilyAnnualPress,
}: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.eyebrow}>Subscriptions</Text>
      <Text style={styles.title}>Choose your Health Logic plan</Text>
      <Text style={styles.copy}>
        Monthly plans do not include a pet. Annual plans include 1 pet.
      </Text>

      <View style={styles.planCard}>
        <Text style={styles.planTitle}>Single Monthly</Text>
        <Text style={styles.planPrice}>$9.99/month</Text>
        <Text style={styles.planNote}>1 person • no pet</Text>
        <Pressable style={styles.primaryButton} onPress={onSingleMonthlyPress}>
          <Text style={styles.primaryButtonText}>Choose Single Monthly</Text>
        </Pressable>
      </View>

      <View style={styles.planCard}>
        <Text style={styles.planTitle}>Family Monthly</Text>
        <Text style={styles.planPrice}>$13.99/month</Text>
        <Text style={styles.planNote}>Up to 5 profiles • no pet</Text>
        <Pressable style={styles.secondaryButton} onPress={onFamilyMonthlyPress}>
          <Text style={styles.secondaryButtonText}>Choose Family Monthly</Text>
        </Pressable>
      </View>

      <View style={styles.planCard}>
        <Text style={styles.planTitle}>Single Annual</Text>
        <Text style={styles.planPrice}>$39.99/year</Text>
        <Text style={styles.planNote}>1 person + 1 pet</Text>
        <Pressable style={styles.secondaryButton} onPress={onSingleAnnualPress}>
          <Text style={styles.secondaryButtonText}>Choose Single Annual</Text>
        </Pressable>
      </View>

      <View style={styles.planCard}>
        <Text style={styles.planTitle}>Family Annual</Text>
        <Text style={styles.planPrice}>$59.99/year</Text>
        <Text style={styles.saveText}>Best value</Text>
        <Text style={styles.planNote}>Up to 5 profiles + 1 pet</Text>
        <Pressable style={styles.secondaryButton} onPress={onFamilyAnnualPress}>
          <Text style={styles.secondaryButtonText}>Choose Family Annual</Text>
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
    marginBottom: spacing.xs,
  },
  planNote: {
    ...typography.caption,
    color: colors.secondaryText,
    marginBottom: spacing.sm,
  },
  saveText: {
    ...typography.caption,
    color: colors.success,
    marginBottom: spacing.xs,
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
