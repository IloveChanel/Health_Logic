import React from "react";
import { Pressable, Text, View } from "react-native";
import AppScreenShell from "../components/layout/AppScreenShell";
import AppCard from "../components/ui/AppCard";
import { TRUST_COPY } from "../modules/trust/helpers/trustScreenContent";
import { trustScreenStyles as styles } from "../modules/trust/styles/trustScreenStyles";

export default function TrustScreen({ navigation }: { navigation: any }) {
  return (
    <AppScreenShell>
      <View style={styles.wrap}>
        <View style={styles.header}>
          <Text style={styles.logo}>{TRUST_COPY.eyebrow}</Text>
          <Text style={styles.tagline}>{TRUST_COPY.subtitle}</Text>
        </View>

        <AppCard>
          <View style={styles.heroCard}>
            <Text style={styles.eyebrow}>MISSION</Text>
            <Text style={styles.heroTitle}>{TRUST_COPY.title}</Text>
            <Text style={styles.heroText}>{TRUST_COPY.body}</Text>
          </View>
        </AppCard>

        <AppCard>
          <View style={styles.featuresCard}>
            <Text style={styles.sectionTitle}>Why it matters</Text>
            {TRUST_COPY.features.map((item) => (
              <View key={item.title} style={styles.featureItem}>
                <Text style={styles.featureTitle}>{item.title}</Text>
                <Text style={styles.featureText}>{item.text}</Text>
              </View>
            ))}
          </View>
        </AppCard>

        <View style={styles.ctaRow}>
          <Pressable style={styles.ctaButton} onPress={() => navigation.navigate("Scan")}>
            <Text style={styles.ctaText}>{TRUST_COPY.primaryCta}</Text>
          </Pressable>

          <Pressable style={styles.secondaryButton} onPress={() => navigation.navigate("Profile")}>
            <Text style={styles.secondaryText}>{TRUST_COPY.secondaryCta}</Text>
          </Pressable>
        </View>

        <AppCard>
          <View style={styles.footerCard}>
            <Text style={styles.small}>{TRUST_COPY.footer}</Text>
          </View>
        </AppCard>
      </View>
    </AppScreenShell>
  );
}
