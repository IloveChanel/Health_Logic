import React from "react";
import {
  Alert,
  BackHandler,
  Platform,
  Pressable,
  Text,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import PricingCard from "../components/PricingCard";
import HealthLogicLiveLogo from "../components/branding/HealthLogicLiveLogo";
import SystemTelemetry from "../components/branding/SystemTelemetry";
import ScanSheen from "../components/effects/ScanSheen";
import AppScreenShell from "../components/layout/AppScreenShell";
import { useProfileStore } from "../hooks/useProfileStore";
import {
  HOME_CATEGORIES,
  HOME_COPY,
} from "../modules/home/helpers/homeScreenContent";
import { homeScreenStyles as styles } from "../modules/home/styles/homeScreenStyles";

export default function HomeScreen({ navigation }: { navigation: any }) {
  const { activeProfile, account } = useProfileStore();
  const hasProfile = !!activeProfile || (account?.profiles?.length ?? 0) > 0;

  const handleExitApp = () => {
    if (Platform.OS === "android") {
      BackHandler.exitApp();
      return;
    }
    Alert.alert("Exit App", "Exit is Android-only in this build.");
  };

  const handleOpenSubscription = () => {
    navigation.navigate("Subscription");
  };

  return (
    <AppScreenShell>
      <View style={styles.systemHeader}>
        <View />
        <Pressable onPress={handleExitApp} style={styles.exitChip}>
          <Text style={styles.exitText}>TERMINATE</Text>
        </Pressable>
      </View>

      <View style={styles.mainContainer}>
        <ScanSheen />
        <View style={[styles.bracket, styles.topLeft]} />
        <View style={[styles.bracket, styles.topRight]} />
        <View style={[styles.bracket, styles.bottomLeft]} />
        <View style={[styles.bracket, styles.bottomRight]} />

        <Text style={styles.eyebrow}>{HOME_COPY.eyebrow}</Text>
        <Text style={styles.welcome}>{HOME_COPY.pretitle}</Text>
        <HealthLogicLiveLogo showDiagnostics={true} />
        <SystemTelemetry />
        <Text style={styles.lead}>{HOME_COPY.subtitle}</Text>

        <View style={styles.categoryGrid}>
          {HOME_CATEGORIES.map((cat) => (
            <View key={cat} style={styles.catChip}>
              <View style={styles.activeDot} />
              <Text style={styles.catText}>{cat}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.tagline}>{HOME_COPY.monoSubtitle}</Text>
        <Text style={styles.bodyCopy}>{HOME_COPY.body}</Text>

        <View style={styles.buttonStack}>
          <Pressable
            onPress={() => navigation.navigate("Scan")}
            style={({ pressed }) => [styles.primaryCta, pressed && styles.pressed]}
          >
            <LinearGradient colors={["#00FF94", "#00B368"]} style={styles.gradientButton}>
              <Text style={styles.primaryText}>{HOME_COPY.primaryCta}</Text>
            </LinearGradient>
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate("HouseholdHub")}
            style={({ pressed }) => [styles.secondaryCta, pressed && styles.pressed]}
          >
            <Text style={styles.secondaryText}>{HOME_COPY.secondaryCta}</Text>
          </Pressable>
        </View>
      </View>

      <PricingCard
        onSingleMonthlyPress={handleOpenSubscription}
        onFamilyMonthlyPress={handleOpenSubscription}
        onSingleAnnualPress={handleOpenSubscription}
        onFamilyAnnualPress={handleOpenSubscription}
      />
    </AppScreenShell>
  );
}