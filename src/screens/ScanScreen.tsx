import React, { useState } from "react";
import { Alert, Text, View } from "react-native";
import AppTopBar from "../components/AppTopBar";
import AppCard from "../components/ui/AppCard";
import AppScreenShell from "../components/layout/AppScreenShell";
import DataStreamOverlay from "../components/effects/DataStreamOverlay";
import InlineBarcodeScanner from "../components/scanner/InlineBarcodeScanner";
import CameraCapture from "../components/scanner/CameraCapture";
import { scanBarcode } from "../api";
import { useProfileStore } from "../hooks/useProfileStore";
import {
  getScanFailureMessage,
  isUsableScan,
  normalizeScannedValue,
} from "../modules/scan/helpers/scanRuntime";
import {
  SCAN_SCREEN_COPY,
  SCAN_STATUS_LINES,
} from "../modules/scan/helpers/scanScreenContent";
import { scanScreenStyles as styles } from "../modules/scan/styles/scanScreenStyles";
import { handleCapturedImageForScanResult } from "../modules/scan/helpers/cameraCaptureFlow";

export default function ScanScreen({ navigation }: { navigation: any }) {
  const { activeProfile } = useProfileStore();
  const [analyzing, setAnalyzing] = useState(false);

  const handleDetected = async ({
    rawValue,
    type,
  }: {
    rawValue: string;
    type?: string;
  }) => {
    const normalized = normalizeScannedValue(rawValue);
    if (!isUsableScan(normalized)) {
      Alert.alert("Scan failed", "We could not read a barcode from the camera.");
      return;
    }

    try {
      setAnalyzing(true);

      const analysis = await scanBarcode(normalized);

      navigation.navigate("Result", {
        analysis,
        scanMode: "barcode",
        barcode: normalized,
        barcodeType: type ?? null,
        activeProfileId: activeProfile?.id ?? null,
      });
    } catch (error) {
      Alert.alert("Scan failed", getScanFailureMessage(error));
    } finally {
      setAnalyzing(false);
    }
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
              <InlineBarcodeScanner
                analyzing={analyzing}
                onDetected={handleDetected}
              />
            </View>
          </AppCard>

          <AppCard>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Ingredient label photo</Text>
              <Text style={styles.cardBody}>
                Capture a product ingredient label photo. The image is passed into camera scan mode and prepared for OCR wiring.
              </Text>
              <View style={{ minHeight: 420 }}>
                <CameraCapture onCaptured={(uri) => handleCapturedImageForScanResult(navigation, uri, activeProfile?.id ?? null)} />
              </View>
            </View>
          </AppCard>

          <AppCard>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Live barcode scan</Text>
              <Text style={styles.cardBody}>
                This screen now scans immediately. No extra barcode button and no redirect to a separate scan page.
              </Text>
              {SCAN_STATUS_LINES.map((line) => (
                <Text key={line} style={styles.cardBody}>
                  • {line}
                </Text>
              ))}
            </View>
          </AppCard>
        </View>
      </AppScreenShell>

      {analyzing ? <DataStreamOverlay /> : null}
    </>
  );
}


