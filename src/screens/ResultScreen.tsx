import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import GlassCard from "../components/GlassCard";
import Divider from "../components/Divider";
import IngredientCard from "../components/IngredientCard";
import { useProfileStore } from "../hooks/useProfileStore";
import { colors, spacing, typography } from "../theme/theme";

export default function ResultScreen({ route }: any) {
  const { activeProfile } = useProfileStore();
  const analysis = route?.params?.analysis;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={[styles.content, { flexGrow: 1 }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={true}
      >
        <Text style={styles.title}>Results</Text>

        {!analysis ? (
          <GlassCard>
            <Text style={styles.cardTitle}>No analysis yet</Text>
            <Text style={styles.body}>Scan a product first.</Text>
          </GlassCard>
        ) : (
          <>
            <GlassCard>
              <Text style={styles.cardTitle}>{analysis.productName || "Sample Product"}</Text>
              <Text style={styles.body}>Brand: {analysis.brandName || "Unknown"}</Text>
              <Divider />
              <Text style={styles.score}>Overall Score: {analysis.overallScore}%</Text>
              <Text style={styles.score}>Profile Match: {analysis.fitForUserScore}%</Text>
              {analysis.nova?.label ? (
                <Text style={styles.body}>Processing: {analysis.nova.label}</Text>
              ) : null}
              <Text style={styles.body}>{analysis.explanation || "Analysis complete."}</Text>
            </GlassCard>

            <GlassCard>
              <Text style={styles.cardTitle}>Red Flags</Text>
              {analysis.redFlags?.length ? (
                analysis.redFlags.map((flag: string, idx: number) => (
                  <Text key={idx} style={styles.flag}>• {flag}</Text>
                ))
              ) : (
                <Text style={styles.body}>No red flags.</Text>
              )}
            </GlassCard>

            {analysis.petToxins?.length ? (
              <GlassCard>
                <Text style={styles.cardTitle}>Pet Toxins</Text>
                {analysis.petToxins.map((flag: string, idx: number) => (
                  <Text key={idx} style={styles.flag}>• {flag}</Text>
                ))}
              </GlassCard>
            ) : null}

            <GlassCard>
              <Text style={styles.cardTitle}>Ingredients</Text>
              {analysis.ingredients?.length ? (
                analysis.ingredients.map((ingredient: any, idx: number) => (
                  <IngredientCard
                    key={idx}
                    ingredient={ingredient}
                    accepted={(activeProfile?.profile?.preferIngredients ?? [])
                      .map((x: string) => x.toLowerCase().trim())
                      .includes((ingredient.normalizedName || ingredient.name || "").toLowerCase().trim())}
                  />
                ))
              ) : (
                <Text style={styles.body}>No ingredients found.</Text>
              )}
            </GlassCard>

            <GlassCard>
              <Text style={styles.cardTitle}>Better Alternatives</Text>
              {analysis.alternatives?.length ? (
                analysis.alternatives.map((item: string, idx: number) => (
                  <Text key={idx} style={styles.body}>• {item}</Text>
                ))
              ) : (
                <Text style={styles.body}>No alternatives suggested.</Text>
              )}
            </GlassCard>
          </>
        )}

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
  body: { ...typography.bodySecondary, color: colors.secondaryText, marginBottom: spacing.xs },
  score: { ...typography.h3, color: colors.primary, marginBottom: spacing.xs },
  flag: { ...typography.bodySecondary, color: colors.error, marginBottom: spacing.xs },
  spacer: { height: spacing.lg },
});
