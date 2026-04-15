import { StyleSheet } from "react-native";
import { colors, spacing, typography } from "../../../theme/theme";

export const brandScreenStyles = StyleSheet.create({
  wrap: {
    flex: 1,
    padding: spacing.lg,
    justifyContent: "center",
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  centered: {
    alignItems: "center",
    justifyContent: "center",
  },
  eyebrow: {
    ...(typography.caption ?? typography.body),
    color: colors.secondaryText,
    marginBottom: spacing.xs ?? 6,
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  title: {
    ...typography.h2,
    color: colors.primaryText,
    marginBottom: spacing.sm,
  },
  body: {
    ...typography.body,
    color: colors.secondaryText,
    lineHeight: 22,
  },
  statusText: {
    ...typography.body,
    color: colors.secondaryText,
    marginTop: spacing.sm,
    textAlign: "center",
  },
  errorTitle: {
    ...(typography.h3 ?? typography.h2),
    color: colors.primaryText,
    marginBottom: spacing.xs ?? 6,
    textAlign: "center",
  },
  errorText: {
    ...typography.body,
    color: colors.secondaryText,
    textAlign: "center",
  },
});






