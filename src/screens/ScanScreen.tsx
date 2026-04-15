import React, { useState } from "react";
import { Alert, Text, View } from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import SecondaryButton from "../components/SecondaryButton";
import AppTopBar from "../components/AppTopBar";
import AppCard from "../components/ui/AppCard";
import AppScreenShell from "../components/layout/AppScreenShell";
import ScanHudOverlay from "../components/branding/ScanHudOverlay";
import DataStreamOverlay from "../components/effects/DataStreamOverlay";
import { scanBarcode } from "../api";
import { useProfileStore } from "../hooks/useProfileStore";
import { getScanAccessDecision } from "../modules/scan/helpers/scanAccessGate";
import { SCAN_SCREEN_COPY, SCAN_STATUS_LINES } from "../modules/scan/helpers/scanScreenContent";
import { scanScreenStyles as styles } from "../modules/scan/styles/scanScreenStyles";

export default function ScanScreen({ navigation }: { navigation: any }) {
  const { account } = useProfileStore();
  const [analyzing, setAnalyzing] = useState(false);

  const handleBarcodeScan = async () => {
    const decision = getScanAccessDecision(!!account?.hasActiveSubscription);
    if (!decision.allowed && decision.redirectRoute) {
      navigation.navigate(decision.redirectRoute);
      return;
    }

    setAnalyzing(true);
    setTimeout(async () => {
      try {
        setAnalyzing(false); navigation.navigate("BarcodeCamera");
      } catch {
        setAnalyzing(false);
        Alert.alert("Scan failed", "We could not complete the barcode scan.");
      }
    }, 1200);
  };

  const handleCameraIngredientScan = () => {
    const decision = getScanAccessDecision(!!account?.hasActiveSubscription);
    if (!decision.allowed && decision.redirectRoute) {
      navigation.navigate(decision.redirectRoute);
      return;
    }

    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      navigation.navigate("Result");
    }, 1200);
  };

  return (
    <>
      <AppScreenShell>
        <AppTopBar navigation={navigation} />

        <View style={styles.wrap}>
          <View style={styles.hero}>
            <Text style={styles.eyebrow}>{SCAN_SCREEN_COPY.eyebrow}</Text>
            <Text style={styles.title}>{SCAN_SCREEN_COPY.title}</Text>
            <Text style={styles.subtitle}>{SCAN_SCREEN_COPY.subtitle}</Text>
            <Text style={styles.subtitle}>{SCAN_SCREEN_COPY.body}</Text>
          </View>

          <AppCard>
            <View style={styles.card}>
              <ScanHudOverlay />
            </View>
          </AppCard>

          <AppCard>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{SCAN_SCREEN_COPY.barcodeTitle}</Text>
              <Text style={styles.cardBody}>{SCAN_SCREEN_COPY.barcodeBody}</Text>
              <PrimaryButton
                title={SCAN_SCREEN_COPY.barcodeCta}
                onPress={handleBarcodeScan}
                testID="barcode_scan_button"
              />
            </View>
          </AppCard>

          <AppCard>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{SCAN_SCREEN_COPY.cameraTitle}</Text>
              <Text style={styles.cardBody}>{SCAN_SCREEN_COPY.cameraBody}</Text>
              {SCAN_STATUS_LINES.map((line) => (
                <Text key={line} style={styles.cardBody}>
                  • {line}
                </Text>
              ))}
              <SecondaryButton
                title={SCAN_SCREEN_COPY.cameraCta}
                onPress={handleCameraIngredientScan}
                testID="camera_ingredient_scan_button"
              />
            </View>
          </AppCard>
        </View>
      </AppScreenShell>

      {analyzing ? <DataStreamOverlay /> : null}
    </>
  );
}

