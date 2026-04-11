import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { NavigationProp } from '@react-navigation/native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

export default function HomeScreen({ navigation }: { navigation: NavigationProp<any> }) {
  return (
    <LinearGradient
      colors={[colors.background, "#F5F5F2"]}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={{ padding: 24 }}>
        {/* Hero */}
        <Text style={styles.title}>Eat smarter. Live healthier.</Text>
        <Text style={styles.subtitle}>
          Make informed choices for you and your family.
        </Text>

        {/* Action Card */}
        <View style={styles.card}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => navigation.navigate("ScanScreen")}
          >
            <Text style={styles.buttonText}>Scan a Product</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => navigation.navigate("Search")}
          >
            <Text style={styles.secondaryText}>Search Products</Text>
          </TouchableOpacity>
        </View>

        {/* Profile */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Your Profile</Text>
          <Text style={styles.profileText}>Conditions: Diabetes, Gluten Sensitivity</Text>
          <Text style={styles.profileText}>Language: English ▼</Text>
        </View>

        {/* Recent Scans */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Recent Scans</Text>
          <Text style={styles.scanItem}>Oat Milk — Safe ✅</Text>
          <Text style={styles.scanItem}>Protein Bar — ⚠️ Additives</Text>
          <Text style={styles.scanItem}>Frozen Meal — ❌ Not Recommended</Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: { ...typography.h1, color: colors.primaryText, marginBottom: 8 },
  subtitle: { ...typography.body, color: colors.secondaryText, marginBottom: 24 },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
  },
  primaryButton: {
    backgroundColor: colors.buttonPrimary,
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  buttonText: { color: "#fff", fontWeight: "600", fontSize: 16, textAlign: "center" },
  secondaryButton: {
    borderWidth: 1,
    borderColor: "#C0C0C0",
    padding: 14,
    borderRadius: 16,
    marginBottom: 10,
  },
  secondaryText: { color: colors.primaryText, textAlign: "center", fontSize: 15 },
  sectionTitle: { ...typography.h2, color: colors.primaryText, marginBottom: 8 },
  profileText: { ...typography.body, color: colors.secondaryText, marginBottom: 4 },
  scanItem: { ...typography.body, color: colors.primaryText, marginBottom: 4 },
});
