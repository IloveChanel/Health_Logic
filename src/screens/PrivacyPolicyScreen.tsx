import React from "react";
import { Pressable, Text, View } from "react-native";
import AppTopBar from "../components/AppTopBar";
import AppCard from "../components/ui/AppCard";
import AppScreenShell from "../components/layout/AppScreenShell";
import { PRIVACY_POLICY_COPY } from "../modules/privacy/helpers/privacyPolicyContent";
import { openPrivacyPolicyUrl } from "../modules/privacy/helpers/privacyPolicyHelpers";
import { privacyPolicyStyles as styles } from "../modules/privacy/styles/privacyPolicyStyles";

export default function PrivacyPolicyScreen({ navigation }: { navigation: any }) {
  return (
    <AppScreenShell>
      <AppTopBar navigation={navigation} />

      <View style={styles.wrap}>
        <View style={styles.hero}>
          <Text style={styles.eyebrow}>{PRIVACY_POLICY_COPY.eyebrow}</Text>
          <Text style={styles.title}>{PRIVACY_POLICY_COPY.title}</Text>
        </View>

        <AppCard>
          <View style={styles.sectionCard}>
            <Text style={styles.body}>{PRIVACY_POLICY_COPY.intro}</Text>
            <Text style={styles.body}>{PRIVACY_POLICY_COPY.localProcessing}</Text>
            <Text style={styles.body}>{PRIVACY_POLICY_COPY.noRemoteStorage}</Text>
          </View>
        </AppCard>

        <Pressable style={styles.linkButton} onPress={() => void openPrivacyPolicyUrl()}>
          <Text style={styles.linkText}>{PRIVACY_POLICY_COPY.linkLabel}</Text>
        </Pressable>
      </View>
    </AppScreenShell>
  );
}




