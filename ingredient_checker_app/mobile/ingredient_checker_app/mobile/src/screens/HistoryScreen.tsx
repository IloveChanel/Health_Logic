import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

export default function HistoryScreen() {
  // Example data
  const scans = [
    { product: 'Oat Milk', status: 'Safe', date: '2026-02-01' },
    { product: 'Protein Bar', status: 'Caution', date: '2026-01-30' },
    { product: 'Frozen Meal', status: 'Avoid', date: '2026-01-28' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scan History</Text>
      <ScrollView style={styles.list}>
        {scans.map((scan, idx) => (
          <View key={idx} style={styles.item}>
            <Text style={styles.product}>{scan.product}</Text>
            <Text style={styles.status}>{scan.status}</Text>
            <Text style={styles.date}>{scan.date}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 24 },
  title: { ...typography.h2, color: colors.primaryText, marginBottom: 16 },
  list: { flex: 1 },
  item: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  product: { ...typography.body, color: colors.primaryText },
  status: { ...typography.bodySecondary, color: colors.secondaryText },
  date: { ...typography.bodySecondary, color: colors.secondaryText, fontSize: 12 },
});
