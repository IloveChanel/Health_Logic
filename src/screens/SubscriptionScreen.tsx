import React from "react";
import { Pressable, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import SecondaryButton from "../components/SecondaryButton";
import { AppPrimaryButton } from "../components/ui/AppButton";
import AppCard from "../components/ui/AppCard";
import AppScreenShell from "../components/layout/AppScreenShell";
import { SUBSCRIPTION_COPY } from "../modules/subscription/helpers/subscriptionContent";
import {
  handleSubscriptionBack,
  handleSubscriptionExitApp,
} from "../modules/subscription/helpers/subscriptionScreenHelpers";
import { subscriptionStyles as styles } from "../modules/subscription/styles/subscriptionStyles";

export default function SubscriptionScreen({ navigation }: { navigation: any }) {
  return (
    <AppScreenShell>
      <View style={styles.topBar}>
        <Pressable onPress={() => handleSubscriptionBack(navigation)} style={styles.topBarButton}>
          <Text style={styles.topBarButtonText}>BACK</Text>
        </Pressable>
        <Pressable onPress={handleSubscriptionExitApp} style={styles.topBarButtonExit}>
          <Text style={styles.topBarButtonExitText}>EXIT</Text>
        </Pressable>
      </View>

      <LinearGradient
        colors={["rgba(20,24,22,0.92)", "rgba(12,16,14,0.96)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.hero}
      >
        <Text style={styles.eyebrow}>{SUBSCRIPTION_COPY.eyebrow}</Text>
        <Text style={styles.title}>{SUBSCRIPTION_COPY.title}</Text>
        <Text style={styles.subtitle}>{SUBSCRIPTION_COPY.subtitle}</Text>
        <Text style={styles.subtitle}>{SUBSCRIPTION_COPY.body}</Text>
      </LinearGradient>

      <AppCard>
        <Text style={styles.sectionTitle}>{SUBSCRIPTION_COPY.plansTitle}</Text>
        <Text style={styles.sectionSubtitle}>{SUBSCRIPTION_COPY.plansSubtitle}</Text>

        <AppPrimaryButton
          title="OPEN HOUSEHOLD HUB"
          onPress={() => navigation.navigate("HouseholdHub")}
        />

        <View style={styles.buttonGap} />

        <SecondaryButton
          title="Back to Home"
          onPress={() => navigation.navigate("Home")}
        />
      </AppCard>
    </AppScreenShell>
  );
}
