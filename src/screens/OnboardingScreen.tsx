import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text } from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import OnboardingFooter from "../components/OnboardingFooter";
import { colors, spacing, typography } from "../theme/theme";

export default function OnboardingScreen({ navigation }: { navigation: any }) {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={[styles.content, { flexGrow: 1 }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={true}
      >
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.subtitle}>
          Personalized food and beauty scanning built around your health, allergies, skin profile, and ingredient preferences.
        </Text>

        <PrimaryButton title="Get Started" onPress={() => navigation.navigate("Home")} testID="get_started_button" />
        <OnboardingFooter />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, paddingBottom: spacing.xxl },
  title: { ...typography.h1, color: colors.primaryText, marginBottom: spacing.sm },
  subtitle: { ...typography.body, color: colors.secondaryText, marginBottom: spacing.lg },
});




