import React, { useEffect, useMemo, useState } from "react";
import { Alert, Text, View } from "react-native";
import * as ExpoCamera from "expo-camera";
import AppTopBar from "../components/AppTopBar";
import AppScreenShell from "../components/layout/AppScreenShell";
import PrimaryButton from "../components/PrimaryButton";
import SecondaryButton from "../components/SecondaryButton";
import AppCard from "../components/ui/AppCard";
import { scanBarcode } from "../api";

const CameraAny: any = (ExpoCamera as any).CameraView ?? (ExpoCamera as any).Camera;
const useCameraPermissionsAny: any = (ExpoCamera as any).useCameraPermissions;

export default function BarcodeCameraScreen({ navigation }: { navigation: any }) {
  const [permissionState, setPermissionState] = useState<any>(null);
  const [scanned, setScanned] = useState(false);
  const [processing, setProcessing] = useState(false);

  const hookTuple = typeof useCameraPermissionsAny === "function" ? useCameraPermissionsAny() : null;
  const permission = hookTuple ? hookTuple[0] : permissionState;
  const requestPermission = hookTuple
    ? hookTuple[1]
    : async () => {
        if ((ExpoCamera as any).Camera?.requestCameraPermissionsAsync) {
          const result = await (ExpoCamera as any).Camera.requestCameraPermissionsAsync();
          setPermissionState(result);
          return result;
        }
        return null;
      };

  useEffect(() => {
    let mounted = true;

    const loadPermission = async () => {
      if (hookTuple) return;

      if ((ExpoCamera as any).Camera?.getCameraPermissionsAsync) {
        const result = await (ExpoCamera as any).Camera.getCameraPermissionsAsync();
        if (mounted) setPermissionState(result);
      }
    };

    void loadPermission();
    return () => {
      mounted = false;
    };
  }, []);

  const barcodeTypes = useMemo(() => ["ean13", "ean8", "upc_a", "upc_e", "code128", "code39"], []);

  const handleBarcodeScanned = async (event: any) => {
    const data = event?.data;
    if (!data || scanned || processing) return;

    try {
      setScanned(true);
      setProcessing(true);
      const result = await scanBarcode(data);
      navigation.navigate("Result", { analysis: result });
    } catch {
      Alert.alert("Scan failed", "We could not analyze that barcode.");
      setScanned(false);
    } finally {
      setProcessing(false);
    }
  };

  if (!CameraAny) {
    return (
      <AppScreenShell>
        <AppTopBar navigation={navigation} />
        <AppCard>
          <Text style={{ color: "#F3FFF8", fontSize: 18, fontWeight: "800", marginBottom: 8 }}>
            Camera package mismatch
          </Text>
          <Text style={{ color: "#A7BBB1", fontSize: 15, lineHeight: 24 }}>
            The installed expo-camera package does not match the current project SDK yet.
          </Text>
        </AppCard>
      </AppScreenShell>
    );
  }

  if (!permission) {
    return (
      <AppScreenShell>
        <AppTopBar navigation={navigation} />
        <AppCard>
          <Text style={{ color: "#F3FFF8", fontSize: 18, fontWeight: "800", marginBottom: 8 }}>
            Camera permissions
          </Text>
          <Text style={{ color: "#A7BBB1", fontSize: 15, lineHeight: 24 }}>
            Checking camera permission status.
          </Text>
        </AppCard>
      </AppScreenShell>
    );
  }

  if (!permission.granted) {
    return (
      <AppScreenShell>
        <AppTopBar navigation={navigation} />
        <AppCard>
          <Text style={{ color: "#F3FFF8", fontSize: 18, fontWeight: "800", marginBottom: 8 }}>
            Camera access required
          </Text>
          <Text style={{ color: "#A7BBB1", fontSize: 15, lineHeight: 24, marginBottom: 16 }}>
            Allow camera access so HealthLogic can scan real product barcodes.
          </Text>
          <PrimaryButton title="Grant Camera Access" onPress={() => { void requestPermission(); }} />
        </AppCard>
      </AppScreenShell>
    );
  }

  return (
    <AppScreenShell scroll={false}>
      <AppTopBar navigation={navigation} />

      <View style={{ flex: 1, gap: 16 }}>
        <View
          style={{
            flex: 1,
            minHeight: 420,
            borderRadius: 18,
            overflow: "hidden",
            borderWidth: 1,
            borderColor: "rgba(0,255,148,0.18)",
            backgroundColor: "rgba(16,24,21,0.92)",
          }}
        >
          <CameraAny
            style={{ flex: 1 }}
            barcodeScannerSettings={{ barcodeTypes }}
            onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
            facing="back"
          />

          <View
            pointerEvents="none"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View style={{ width: 220, height: 220, position: "relative" }}>
              <View style={{ position: "absolute", top: 0, left: 0, width: 36, height: 36, borderTopWidth: 3, borderLeftWidth: 3, borderColor: "#00FF94" }} />
              <View style={{ position: "absolute", top: 0, right: 0, width: 36, height: 36, borderTopWidth: 3, borderRightWidth: 3, borderColor: "#00FF94" }} />
              <View style={{ position: "absolute", bottom: 0, left: 0, width: 36, height: 36, borderBottomWidth: 3, borderLeftWidth: 3, borderColor: "#00FF94" }} />
              <View style={{ position: "absolute", bottom: 0, right: 0, width: 36, height: 36, borderBottomWidth: 3, borderRightWidth: 3, borderColor: "#00FF94" }} />
            </View>
          </View>
        </View>

        <AppCard>
          <Text style={{ color: "#00FF94", fontSize: 11, fontWeight: "800", letterSpacing: 2, marginBottom: 8 }}>
            LIVE BARCODE SCAN
          </Text>
          <Text style={{ color: "#F3FFF8", fontSize: 18, fontWeight: "800", marginBottom: 8 }}>
            Aim at a product barcode
          </Text>
          <Text style={{ color: "#A7BBB1", fontSize: 15, lineHeight: 24, marginBottom: 16 }}>
            Hold steady and HealthLogic will scan a real barcode using your phone camera.
          </Text>

          {scanned ? (
            <SecondaryButton title="Scan Another Barcode" onPress={() => setScanned(false)} />
          ) : null}
        </AppCard>
      </View>
    </AppScreenShell>
  );
}
