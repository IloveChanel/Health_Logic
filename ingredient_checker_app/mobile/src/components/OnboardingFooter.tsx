import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors, spacing, typography } from "../theme/theme";

export default function OnboardingFooter() {
  return (
    <View style={styles.footer}>
      <Text style={styles.text}>
        Personalized food + beauty scanning tailored to your health, skin, and ingredient preferences.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    marginTop: spacing.lg,
    padding: spacing.md,
  },
  text: {
    ...typography.bodySecondary,
    color: colors.secondaryText,
    textAlign: "center",
  },
});
