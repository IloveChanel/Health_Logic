import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../../app/theme/colors";

type Props = {
  conditionsCount: number;
  avoidCount: number;
  preferCount: number;
};

export default function HealthSnapshotCard({
  conditionsCount,
  avoidCount,
  preferCount,
}: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Your wellness profile</Text>
      <Text style={styles.subtitle}>
        Personalized scanning gets smarter as you save your conditions and ingredient preferences.
      </Text>

      <View style={styles.row}>
        <View style={styles.pill}>
          <Text style={styles.pillLabel}>{conditionsCount} conditions</Text>
        </View>
        <View style={styles.pill}>
          <Text style={styles.pillLabel}>{avoidCount} avoid</Text>
        </View>
        <View style={styles.pill}>
          <Text style={styles.pillLabel}>{preferCount} prefer</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: 24,
    padding: 18,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: colors.border,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 21,
    color: colors.textSoft,
    marginBottom: 14,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  pill: {
    backgroundColor: colors.surface,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  pillLabel: {
    color: colors.primary,
    fontWeight: "600",
  },
});
