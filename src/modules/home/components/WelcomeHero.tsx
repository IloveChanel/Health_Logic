import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../../theme/colors";

export default function WelcomeHero() {
  return (
    <View style={styles.wrap}>
      <Text style={styles.eyebrow}>Healthy choices, made simpler</Text>
      <Text style={styles.title}>Scan products with confidence</Text>
      <Text style={styles.subtitle}>
        Check ingredients, spot red flags, and find better options for your body and your goals.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginBottom: 22,
  },
  eyebrow: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.primary,
    marginBottom: 8,
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  title: {
    fontSize: 32,
    lineHeight: 38,
    fontWeight: "800",
    color: colors.primaryText,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.secondaryText,
  },
});


