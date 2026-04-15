import { StyleSheet } from "react-native";

export const privacyPolicyStyles = StyleSheet.create({
  wrap: {
    flexGrow: 1,
    gap: 16,
  },

  hero: {
    padding: 22,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(0,255,148,0.18)",
    backgroundColor: "rgba(16,24,21,0.88)",
  },
  eyebrow: {
    color: "#00FF94",
    fontSize: 11,
    letterSpacing: 2,
    fontWeight: "700",
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#F3FFF8",
    lineHeight: 30,
  },

  sectionCard: {
    gap: 12,
  },
  body: {
    color: "#A7BBB1",
    lineHeight: 22,
    fontSize: 14,
  },

  linkButton: {
    minHeight: 56,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,255,148,0.06)",
    borderWidth: 1,
    borderColor: "#00FF94",
  },
  linkText: {
    color: "#00FF94",
    fontWeight: "800",
    letterSpacing: 1,
  },
});




