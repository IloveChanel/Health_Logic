import React from "react";
import { StyleSheet, View } from "react-native";
import { UI_SURFACE_TOKENS } from "./ui/surfaceTokens";

export default function GlassCard({ children }: { children: React.ReactNode }) {
  return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: UI_SURFACE_TOKENS.background,
    borderRadius: UI_SURFACE_TOKENS.radius,
    padding: UI_SURFACE_TOKENS.padding,
    borderWidth: UI_SURFACE_TOKENS.borderWidth,
    borderColor: UI_SURFACE_TOKENS.borderColor,
    marginBottom: 16,
  },
});
