import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import GlassCard from "../components/GlassCard";
import Divider from "../components/Divider";
import { colors, spacing, typography } from "../theme/theme";

export default function ResultScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={[styles.content, { flexGrow: 1 }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={true}
      >
        <Text style={styles.title}>Results</Text>

        <GlassCard>
          <Text style={styles.cardTitle}>Analysis Ready</Text>
          <Text style={styles.body}>Ingredient explanations, red flags, benefits, and scorecards will render here.</Text>
          <Divider />
          <Text style={styles.body}>Food and beauty logic both land on this screen.</Text>
        </GlassCard>

        <View style={styles.spacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, paddingBottom: spacing.xxl },
  title: { ...typography.h1, color: colors.primaryText, marginBottom: spacing.md },
  cardTitle: { ...typography.h3, color: colors.primaryText, marginBottom: spacing.sm },
  body: { ...typography.bodySecondary, color: colors.secondaryText },
  spacer: { height: spacing.lg },
});
