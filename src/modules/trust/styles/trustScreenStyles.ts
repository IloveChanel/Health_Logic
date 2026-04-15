import { StyleSheet } from "react-native";

export const trustScreenStyles = StyleSheet.create({
  wrap: {
    flexGrow: 1,
    justifyContent: "center",
    gap: 16,
  },

  header: {
    alignItems: "center",
    marginBottom: 4,
  },
  logo: {
    fontSize: 28,
    fontWeight: "800",
    color: "#F3FFF8",
    textAlign: "center",
    marginBottom: 6,
  },
  tagline: {
    fontSize: 14,
    color: "#A7BBB1",
    textAlign: "center",
  },

  heroCard: {
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
  heroTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#F3FFF8",
    marginBottom: 10,
    lineHeight: 30,
  },
  heroText: {
    color: "#A7BBB1",
    lineHeight: 22,
    fontSize: 14,
  },

  featuresCard: {
    gap: 10,
  },
  sectionTitle: {
    color: "#F3FFF8",
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 4,
  },
  featureItem: {
    borderRadius: 10,
    padding: 12,
    backgroundColor: "#16211D",
    borderWidth: 1,
    borderColor: "rgba(0,255,148,0.10)",
  },
  featureTitle: {
    fontWeight: "800",
    color: "#F3FFF8",
    marginBottom: 4,
  },
  featureText: {
    color: "#A7BBB1",
    lineHeight: 20,
  },

  ctaRow: {
    flexDirection: "row",
    gap: 10,
  },
  ctaButton: {
    flex: 1,
    minHeight: 56,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00D17A",
  },
  ctaText: {
    color: "#08100D",
    fontWeight: "800",
    letterSpacing: 1,
  },
  secondaryButton: {
    flex: 1,
    minHeight: 56,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,255,148,0.06)",
    borderWidth: 1,
    borderColor: "#00FF94",
  },
  secondaryText: {
    color: "#00FF94",
    fontWeight: "800",
    letterSpacing: 1,
  },

  footerCard: {
    alignItems: "center",
    gap: 8,
  },
  small: {
    color: "#A7BBB1",
    fontSize: 12,
    textAlign: "center",
    lineHeight: 18,
  },
  privacyLink: {
    color: "#00FF94",
    fontWeight: "700",
  },
});




