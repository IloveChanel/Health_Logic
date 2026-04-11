import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import GlassCard from '../components/GlassCard';
import Divider from '../components/Divider';

interface RouteParams {
  result?: {
    product_name?: string;
    status: string;
    ingredients?: Array<{
      name: string;
      risk: string;
    }>;
    confidence?: number;
    evidence?: string;
  };
}

interface ResultScreenProps {
  route: {
    params?: RouteParams;
  };
}

export default function ResultScreen({ route }: ResultScreenProps) {
  const result = route?.params?.result;
  if (!result) {
    return (
      <View style={styles.container}>
        <Text style={styles.product}>No result data.</Text>
      </View>
    );
  }

  // Map backend risk/status to color
interface RiskColorMapping {
    [key: string]: string;
}

type RiskLevel = 'Safe' | 'Caution' | 'Avoid' | string;

const riskColor = (risk: RiskLevel): string => {
    if (risk === 'Safe') return colors.accentSafe;
    if (risk === 'Caution') return colors.caution;
    if (risk === 'Avoid') return colors.error;
    return colors.secondaryText;
};

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 32 }}>
      <Text style={styles.product}>{result.product_name || 'Product'}</Text>
      <Text style={[styles.status, { color: riskColor(result.status) }]}>{result.status}</Text>
      <GlassCard style={{}}>
        <Text style={styles.sectionTitle}>Ingredients</Text>
        <Divider />
        {result.ingredients?.map((ing, idx) => (
          <View key={idx} style={styles.ingredientRow}>
            <Text style={styles.ingredientName}>{ing.name}</Text>
            <Text style={[styles.ingredientRisk, { color: riskColor(ing.risk) }]}>{ing.risk}</Text>
          </View>
        ))}
      </GlassCard>
      {result.confidence && (
        <Text style={styles.confidence}>Confidence: {Math.round(result.confidence * 100)}%</Text>
      )}
      {result.evidence && (
        <Text style={styles.evidence}>Evidence: {result.evidence}</Text>
      )}
      <Text style={styles.attribution}>Powered by Ingredient Checker AI. Not medical advice.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 24 },
  product: { ...typography.h2, color: colors.primaryText, marginBottom: 8 },
  status: { ...typography.body, fontWeight: '700', marginBottom: 24 },
  sectionTitle: { ...typography.h2, color: colors.primaryText, marginBottom: 8 },
  ingredientRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  ingredientName: { ...typography.body, color: colors.primaryText },
  ingredientRisk: { ...typography.body, fontWeight: '600' },
  confidence: { ...typography.bodySecondary, color: colors.secondaryText, marginTop: 16 },
  evidence: { ...typography.bodySecondary, color: colors.secondaryText, marginTop: 8 },
  attribution: { ...typography.bodySecondary, color: colors.secondaryText, marginTop: 24, textAlign: 'center' },
});
