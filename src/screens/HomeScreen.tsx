import React from "react";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../App";
import { colors } from "../app/theme/colors";
import WelcomeHero from "../modules/home/components/WelcomeHero";
import HealthSnapshotCard from "../modules/home/components/HealthSnapshotCard";
import ScanActionCard from "../modules/home/components/ScanActionCard";

type Props = StackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <WelcomeHero />

        <HealthSnapshotCard
          conditionsCount={3}
          avoidCount={6}
          preferCount={4}
        />

        <Text style={styles.sectionTitle}>Start scanning</Text>

        <ScanActionCard
          emoji="📷"
          title="Scan ingredient label"
          subtitle="Take a photo of an ingredient list and get a personalized breakdown."
          onPress={() => navigation.navigate("Scan")}
        />

        <ScanActionCard
          emoji="🛒"
          title="Scan barcode"
          subtitle="Pull product details, ingredients, and healthier alternatives."
          onPress={() => navigation.navigate("Scan")}
        />

        <ScanActionCard
          emoji="🧬"
          title="Update health profile"
          subtitle="Manage allergies, health conditions, and ingredients to avoid."
          onPress={() => navigation.navigate("Profile")}
        />

        <View style={styles.footerCard}>
          <Text style={styles.footerTitle}>Daily guidance, not guilt</Text>
          <Text style={styles.footerText}>
            We help users understand what they are buying, why it matters, and what may fit them better.
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
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 12,
  },
  footerCard: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 18,
    marginTop: 8,
  },
  footerTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 8,
  },
  footerText: {
    fontSize: 14,
    lineHeight: 21,
    color: colors.textSoft,
  },
});
