import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { colors, spacing, typography } from "../theme/theme";
import PrimaryButton from "../components/PrimaryButton";
import SecondaryButton from "../components/SecondaryButton";
import PricingCard from "../components/PricingCard";

export default function HomeScreen({ navigation }: { navigation: any }) {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Ingredient Checker</Text>
        <Text style={styles.subtitle}>
          Scan food, supplements, and beauty products based on your allergies, health conditions, skin type, and skin concerns.
        </Text>

        <View style={styles.stack}>
          <PrimaryButton title="Scan Product" onPress={() => navigation.navigate("Scan")} />
          <SecondaryButton title="Your Profile" onPress={() => navigation.navigate("Profile")} />
          <SecondaryButton title="History" onPress={() => navigation.navigate("History")} />
          <SecondaryButton title="Search" onPress={() => navigation.navigate("Search")} />
        </View>

        <PricingCard onMonthlyPress={() => {}} onYearlyPress={() => {}} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  title: {
    ...typography.h1,
    color: colors.primaryText,
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.body,
    color: colors.secondaryText,
    marginBottom: spacing.lg,
  },
  stack: {
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
});
