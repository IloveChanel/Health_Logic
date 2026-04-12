import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { colors, spacing, typography } from "../theme/theme";

export default function SearchScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.content}>
        <Text style={styles.title}>Search</Text>
        <Text style={styles.text}>Search products, brands, and ingredients here.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg },
  title: { ...typography.h1, color: colors.primaryText, marginBottom: spacing.sm },
  text: { ...typography.body, color: colors.secondaryText },
});
