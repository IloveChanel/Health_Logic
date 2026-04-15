import { Alert, Linking } from "react-native";
import { PRIVACY_POLICY_COPY } from "./privacyPolicyContent";

export async function openPrivacyPolicyUrl() {
  try {
    const supported = await Linking.canOpenURL(PRIVACY_POLICY_COPY.policyUrl);

    if (!supported) {
      Alert.alert(
        PRIVACY_POLICY_COPY.openErrorTitle,
        PRIVACY_POLICY_COPY.openErrorBody
      );
      return;
    }

    await Linking.openURL(PRIVACY_POLICY_COPY.policyUrl);
  } catch {
    Alert.alert(
      PRIVACY_POLICY_COPY.openErrorTitle,
      PRIVACY_POLICY_COPY.openErrorBody
    );
  }
}




