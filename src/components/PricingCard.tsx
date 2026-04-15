import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  onSingleMonthlyPress: () => void;
  onFamilyMonthlyPress: () => void;
  onSingleAnnualPress: () => void;
  onFamilyAnnualPress: () => void;
};

export default function PricingCard({
  onSingleMonthlyPress,
  onFamilyMonthlyPress,
  onSingleAnnualPress,
  onFamilyAnnualPress,
}: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.eyebrow}>SUBSCRIPTIONS</Text>
      <Text style={styles.title}>Choose your Health Logic plan</Text>
      <Text style={styles.copy}>
        Monthly plans do not include a pet. Annual plans include 1 pet.
      </Text>

      <View style={styles.planCard}>
        <Text style={styles.planTitle}>Single Monthly</Text>
        <Text style={styles.planPrice}>$9.99/month</Text>
        <Text style={styles.planNote}>1 person • no pet</Text>
        <Pressable style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]} onPress={onSingleMonthlyPress}>
          <Text style={styles.primaryButtonText}>Choose Single Monthly</Text>
        </Pressable>
      </View>

      <View style={styles.planCard}>
        <Text style={styles.planTitle}>Family Monthly</Text>
        <Text style={styles.planPrice}>$13.99/month</Text>
        <Text style={styles.planNote}>Up to 5 profiles • no pet</Text>
        <Pressable style={({ pressed }) => [styles.secondaryButton, pressed && styles.pressed]} onPress={onFamilyMonthlyPress}>
          <Text style={styles.secondaryButtonText}>Choose Family Monthly</Text>
        </Pressable>
      </View>

      <View style={styles.planCard}>
        <Text style={styles.planTitle}>Single Annual</Text>
        <Text style={styles.planPrice}>$39.99/year</Text>
        <Text style={styles.planNote}>1 person + 1 pet</Text>
        <Pressable style={({ pressed }) => [styles.secondaryButton, pressed && styles.pressed]} onPress={onSingleAnnualPress}>
          <Text style={styles.secondaryButtonText}>Choose Single Annual</Text>
        </Pressable>
      </View>

      <View style={styles.planCard}>
        <Text style={styles.planTitle}>Family Annual</Text>
        <Text style={styles.planPrice}>$59.99/year</Text>
        <Text style={styles.saveText}>Best value</Text>
        <Text style={styles.planNote}>Up to 5 profiles + 1 pet</Text>
        <Pressable style={({ pressed }) => [styles.secondaryButton, pressed && styles.pressed]} onPress={onFamilyAnnualPress}>
          <Text style={styles.secondaryButtonText}>Choose Family Annual</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "rgba(16,24,21,0.92)",
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(0,255,148,0.18)",
    marginTop: 16,
    shadowColor: "#00FF94",
    shadowOpacity: 0.14,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 0 },
    elevation: 4,
  },
  eyebrow: {
    color: "#00FF94",
    marginBottom: 8,
    letterSpacing: 2,
    fontWeight: "700",
    fontSize: 11,
  },
  title: {
    color: "#F3FFF8",
    marginBottom: 10,
    fontWeight: "800",
    fontSize: 22,
    lineHeight: 28,
  },
  copy: {
    color: "#A7BBB1",
    marginBottom: 18,
    fontSize: 14,
    lineHeight: 22,
  },
  planCard: {
    backgroundColor: "#16211D",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(0,255,148,0.12)",
    padding: 16,
    marginBottom: 14,
  },
  planTitle: {
    color: "#F3FFF8",
    marginBottom: 6,
    fontWeight: "800",
    fontSize: 16,
  },
  planPrice: {
    color: "#00FF94",
    marginBottom: 6,
    fontSize: 14,
    fontWeight: "700",
  },
  planNote: {
    color: "#A7BBB1",
    marginBottom: 12,
    fontSize: 12,
  },
  saveText: {
    color: "#00FF94",
    marginBottom: 6,
    fontSize: 12,
    fontWeight: "800",
  },
  primaryButton: {
    backgroundColor: "#12E381",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    shadowColor: "#12E381",
    shadowOpacity: 0.22,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    elevation: 5,
  },
  primaryButtonText: {
    color: "#08100D",
    fontWeight: "900",
    fontSize: 14,
    letterSpacing: 1,
  },
  secondaryButton: {
    backgroundColor: "rgba(0,255,148,0.06)",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#00FF94",
  },
  secondaryButtonText: {
    color: "#00FF94",
    fontWeight: "800",
    fontSize: 14,
    letterSpacing: 1,
  },
  pressed: {
    opacity: 0.88,
  },
});
