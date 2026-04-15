import { StyleSheet } from "react-native";
import { colors, spacing, typography } from "../../../theme/theme";

export const profileScreenStyles = StyleSheet.create({
  wrap: {
    flexGrow: 1,
  },

  hero: {
    borderRadius: 18,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: "rgba(0,255,148,0.18)",
    backgroundColor: "rgba(16,24,21,0.92)",
  },
  eyebrow: {
    ...typography.caption,
    color: "#00FF94",
    marginBottom: spacing.sm,
    textTransform: "uppercase",
    letterSpacing: 2,
    fontWeight: "700",
  },
  title: {
    ...typography.h1,
    color: "#F3FFF8",
    marginBottom: spacing.sm,
    fontSize: 34,
    lineHeight: 40,
  },
  subtitle: {
    ...typography.body,
    color: "#A7BBB1",
    lineHeight: 28,
    marginBottom: spacing.lg,
  },

  heroStats: {
    flexDirection: "row",
    gap: spacing.md,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#16211D",
    borderRadius: 16,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: "rgba(0,255,148,0.12)",
  },
  statLabel: {
    ...typography.caption,
    color: "#A7BBB1",
    marginBottom: spacing.xs,
    textTransform: "uppercase",
  },
  statValue: {
    ...typography.h3,
    color: "#F3FFF8",
  },

  sectionHint: {
    ...typography.bodySecondary,
    color: "#A7BBB1",
  },
  inlineLabel: {
    ...typography.caption,
    color: "#A7BBB1",
    marginBottom: spacing.sm,
    marginTop: spacing.sm,
    textTransform: "uppercase",
  },

  input: {
    backgroundColor: "#16211D",
    color: "#F3FFF8",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(0,255,148,0.12)",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    marginBottom: spacing.md,
    ...typography.body,
  },
  multilineInput: {
    minHeight: 100,
    textAlignVertical: "top",
  },

  otherWrap: {
    marginTop: spacing.md,
    gap: spacing.sm,
  },

  chipWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  chip: {
    backgroundColor: "rgba(0,255,148,0.05)",
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(0,255,148,0.18)",
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  chipSelected: {
    backgroundColor: "#12E381",
    borderColor: "#12E381",
  },
  chipText: {
    ...typography.bodySecondary,
    color: "#F3FFF8",
  },
  chipTextSelected: {
    color: "#08100D",
    fontWeight: "800",
  },

  saveSpacer: {
    height: spacing.md,
  },
});




