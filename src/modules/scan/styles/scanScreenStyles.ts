import { StyleSheet } from "react-native";
import { colors, spacing, typography } from "../../../theme/theme";

export const scanScreenStyles = StyleSheet.create({
  wrap: {
    flexGrow: 1,
    gap: spacing.lg,
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
    color: "#F3FFF8",
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.body,
    color: "#A7BBB1",
    lineHeight: 22,
  },

  card: {
    gap: spacing.sm,
  },
  cardTitle: {
    ...typography.h3,
    color: "#F3FFF8",
  },
  cardBody: {
    ...typography.body,
    color: "#A7BBB1",
    lineHeight: 22,
  },

  buttonGap: {
    height: spacing.sm,
  },
});





