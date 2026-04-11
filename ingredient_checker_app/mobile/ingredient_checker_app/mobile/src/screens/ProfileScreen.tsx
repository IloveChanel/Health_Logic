import React from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import { colors, spacing } from "../../src/theme/theme";
import Card from "../../src/components/Card";

const conditions = [
  "Diabetes",
  "Gluten sensitivity",
  "Dairy sensitivity",
  "Crohn’s disease",
  "Celiac disease",
];

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your health profile</Text>
      <Text style={styles.subtitle}>
        Used to personalize ingredient warnings.
      </Text>

      <Card>
        {conditions.map((item) => (
          <View key={item} style={styles.row}>
            <Text style={styles.label}>{item}</Text>
            <Switch />
          </View>
        ))}
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
  title: {
    fontSize: 26,
    fontWeight: "600",
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: 15,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: spacing.sm,
  },
  label: {
    fontSize: 16,
    color: colors.textPrimary,
  },
});
