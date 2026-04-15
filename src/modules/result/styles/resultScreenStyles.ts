import { StyleSheet } from "react-native";
import { colors, spacing, typography } from "../../../theme/theme";

export const resultScreenStyles = StyleSheet.create({
  wrap: {
    flexGrow: 1,
    gap: spacing.md,
  },

  hero: {
    borderRadius: 14,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: "rgba(0,255,148,0.18)",
    backgroundColor: "rgba(16,24,21,0.88)",
  },
  eyebrow: {
    ...(typography.caption ?? typography.body),
    color: "#00FF94",
    marginBottom: spacing.xs ?? 6,
    letterSpacing: 2,
    textTransform: "uppercase",
    fontWeight: "700",
  },
  title: {
    ...typography.h1,
    color: colors.primaryText,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...(typography.bodySecondary ?? typography.body),
    color: colors.secondaryText,
  },

  cardBlock: {
    gap: spacing.xs,
  },
  cardTitle: {
    ...typography.h3,
    color: colors.primaryText,
    marginBottom: spacing.sm,
  },
  body: {
    ...(typography.bodySecondary ?? typography.body),
    color: colors.secondaryText,
    marginBottom: spacing.xs,
  },
  score: {
    ...typography.h3,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  flag: {
    ...(typography.bodySecondary ?? typography.body),
    color: colors.error,
    marginBottom: spacing.xs,
  },
  spacer: {
    height: spacing.lg,
  },
});




