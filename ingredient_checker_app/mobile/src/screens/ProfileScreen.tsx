import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { colors, spacing, typography } from "../theme/theme";

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={[styles.content, { flexGrow: 1 }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={true}
      >
        <Text style={styles.title}>Your Profile</Text>
        <Text style={styles.subtitle}>
          Next we add checkbox groups for food conditions, allergies, dry skin, oily skin, psoriasis, eczema, rosacea, acne-prone, mature skin, and more.
        </Text>

        <View style={styles.card}>
          <Text style={styles.text}>Profile module placeholder ready for the next UI pass.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, paddingBottom: spacing.xxl },
  title: { ...typography.h1, color: colors.primaryText, marginBottom: spacing.sm },
  subtitle: { ...typography.body, color: colors.secondaryText, marginBottom: spacing.lg },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
  },
  text: { ...typography.bodySecondary, color: colors.secondaryText },
});
