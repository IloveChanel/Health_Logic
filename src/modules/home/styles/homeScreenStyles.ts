import { Platform, StyleSheet } from "react-native";

export const homeScreenStyles = StyleSheet.create({
  systemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },

  exitChip: {
    borderBottomWidth: 1,
    borderBottomColor: "#FF4D4D",
    paddingBottom: 2,
  },
  exitText: {
    color: "#FF4D4D",
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 1,
  },

  mainContainer: {
    backgroundColor: "rgba(16,24,21,0.92)",
    padding: 22,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(0,255,148,0.18)",
    position: "relative",
    marginBottom: 18,
    shadowColor: "#00FF94",
    shadowOpacity: 0.12,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 0 },
    elevation: 4,
  },

  bracket: {
    position: "absolute",
    width: 36,
    height: 36,
    borderColor: "#00FF94",
  },
  topLeft: {
    top: -2,
    left: -2,
    borderTopWidth: 3,
    borderLeftWidth: 3,
  },
  topRight: {
    top: -2,
    right: -2,
    borderTopWidth: 3,
    borderRightWidth: 3,
  },
  bottomLeft: {
    bottom: -2,
    left: -2,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
  },
  bottomRight: {
    bottom: -2,
    right: -2,
    borderBottomWidth: 3,
    borderRightWidth: 3,
  },

  eyebrow: {
    color: "#00FF94",
    fontSize: 11,
    letterSpacing: 4,
    marginBottom: 10,
    fontWeight: "800",
  },

  welcome: {
    color: "#A7BBB1",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 2,
    marginBottom: 4,
    textTransform: "uppercase",
  },

  title: {
    color: "#F3FFF8",
    fontSize: 40,
    fontWeight: "300",
    lineHeight: 42,
    marginBottom: 10,
  },
  titleAccent: {
    color: "#00FF94",
    fontWeight: "900",
  },

  lead: {
    color: "#F3FFF8",
    fontSize: 20,
    fontWeight: "800",
    lineHeight: 26,
    marginBottom: 14,
  },

  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 16,
  },
  catChip: {
    minWidth: 110,
    height: 42,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#16211D",
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(0,255,148,0.12)",
  },
  activeDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#00FF94",
    marginRight: 8,
  },
  catText: {
    color: "#A7BBB1",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1,
  },

  tagline: {
    color: "#A7BBB1",
    fontSize: 18,
    lineHeight: 24,
    marginBottom: 12,
    fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
  },

  bodyCopy: {
    color: "#A7BBB1",
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 24,
  },

  buttonStack: {
    gap: 14,
  },
  primaryCta: {
    height: 64,
    borderRadius: 14,
    overflow: "hidden",
    shadowColor: "#12E381",
    shadowOpacity: 0.25,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 0 },
    elevation: 7,
  },
  gradientButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  primaryText: {
    color: "#08100D",
    fontWeight: "900",
    letterSpacing: 2,
    fontSize: 14,
  },

  secondaryCta: {
    height: 64,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#00FF94",
    backgroundColor: "rgba(0,255,148,0.06)",
  },
  secondaryText: {
    color: "#00FF94",
    fontWeight: "800",
    fontSize: 14,
    letterSpacing: 1,
  },

  pressed: {
    opacity: 0.9,
  },
});
