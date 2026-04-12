import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import GlassCard from "../components/GlassCard";
import Divider from "../components/Divider";
import PricingCard from "../components/PricingCard";
import { colors, spacing, typography } from "../theme/theme";

export default function ResultScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Results</Text>

        <GlassCard>
          <Text style={styles.cardTitle}>Product analysis</Text>
          <Text style={styles.body}>Ingredient explanation and scoring will render here.</Text>
          <Divider />
          <Text style={styles.body}>Food and beauty logic both land on this screen.</Text>
        </GlassCard>

        <View style={styles.spacer} />

        <PricingCard onPress={() => {}} />
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
