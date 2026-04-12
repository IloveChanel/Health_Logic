import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { colors } from "../app/theme/colors";

export default function ProfileScreen() {
  const starterConditions = [
    "Diabetes",
    "Crohn's",
    "Gluten-free",
    "IBS",
    "Lactose intolerance",
    "High blood pressure",
    "Pregnancy",
    "Nut allergy",
    "Dairy allergy",
    "Soy sensitivity",
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Your health profile</Text>
        <Text style={styles.subtitle}>
          This should become a module-driven checklist flow with presets + an Other input.
        </Text>

        <View style={styles.card}>
          {starterConditions.map((item) => (
            <View key={item} style={styles.chip}>
              <Text style={styles.chipText}>{item}</Text>
            </View>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Important rule</Text>
          <Text style={styles.cardText}>
            New user-entered conditions should be saved locally immediately, and separately reviewed before being promoted into the shared backend master list.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  content: {
    padding: 20,
    paddingBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.textSoft,
    marginBottom: 18,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    marginBottom: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  chip: {
    backgroundColor: colors.primarySoft,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  chipText: {
    color: colors.primary,
    fontWeight: "600",
  },
  cardTitle: {
    width: "100%",
    fontSize: 16,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    lineHeight: 21,
    color: colors.textSoft,
  },
});
