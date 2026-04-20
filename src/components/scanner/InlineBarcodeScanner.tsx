import React, { useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  CameraView,
  useCameraPermissions,
  type BarcodeScanningResult,
} from "expo-camera";

type Props = {
  disabled?: boolean;
  analyzing?: boolean;
  onDetected: (payload: { rawValue: string; type?: string }) => Promise<void> | void;
};

const BARCODE_TYPES = [
  "ean13",
  "ean8",
  "upc_a",
  "upc_e",
  "code128",
  "code39",
  "qr",
] as const;

export default function InlineBarcodeScanner({
  disabled = false,
  analyzing = false,
  onDetected,
}: Props) {
  const [permission, requestPermission] = useCameraPermissions();
  const [locked, setLocked] = useState(false);
  const mountedRef = useRef(true);

  React.useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const canScan = useMemo(() => {
    return !disabled && !analyzing && !locked;
  }, [disabled, analyzing, locked]);

  const handleBarcodeScanned = async (result: BarcodeScanningResult) => {
    if (!canScan) return;

    const rawValue = String(result?.data ?? "").trim();
    if (!rawValue) return;

    setLocked(true);
    try {
      await onDetected({
        rawValue,
        type: result?.type ? String(result.type) : undefined,
      });
    } finally {
      if (mountedRef.current) {
        setTimeout(() => {
          if (mountedRef.current) setLocked(false);
        }, 1200);
      }
    }
  };

  if (!permission) {
    return (
      <View style={styles.centerState}>
        <ActivityIndicator size="large" color="#00FF94" />
        <Text style={styles.stateText}>Initializing camera…</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.centerState}>
        <Text style={styles.permissionTitle}>Camera access required</Text>
        <Text style={styles.stateText}>
          HealthLogic needs camera permission to scan a real product barcode.
        </Text>
        <Pressable style={styles.permissionButton} onPress={() => { void requestPermission(); }}>
          <Text style={styles.permissionButtonText}>Grant Camera Access</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.frame}>
      <CameraView
        style={styles.camera}
        facing="back"
        barcodeScannerSettings={{ barcodeTypes: [...BARCODE_TYPES] }}
        onBarcodeScanned={canScan ? handleBarcodeScanned : undefined}
      />

      <View pointerEvents="none" style={styles.overlay}>
        <View style={[styles.corner, styles.topLeft]} />
        <View style={[styles.corner, styles.topRight]} />
        <View style={[styles.corner, styles.bottomLeft]} />
        <View style={[styles.corner, styles.bottomRight]} />

        <View style={styles.footerTextWrap}>
          <Text style={styles.footerMono}>
            {analyzing ? "ANALYZING PRODUCT…" : locked ? "SCAN CAPTURED" : "ANALYSIS ENGINE READY"}
          </Text>
          <Text style={styles.footerSub}>
            {analyzing ? "Hold steady while HealthLogic processes" : "Aim at barcode or product label"}
          </Text>
        </View>
      </View>
    </View>
  );
}

const glow = "#00FF94";

const styles = StyleSheet.create({
  frame: {
    minHeight: 320,
    borderRadius: 24,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(0,255,148,0.28)",
    backgroundColor: "#021612",
  },
  camera: {
    flex: 1,
    minHeight: 320,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 8, 6, 0.12)",
    justifyContent: "space-between",
    paddingHorizontal: 28,
    paddingVertical: 24,
  },
  corner: {
    position: "absolute",
    width: 34,
    height: 34,
    borderColor: glow,
    shadowColor: glow,
    shadowOpacity: 0.8,
    shadowRadius: 8,
  },
  topLeft: {
    top: 24,
    left: 24,
    borderTopWidth: 3,
    borderLeftWidth: 3,
  },
  topRight: {
    top: 24,
    right: 24,
    borderTopWidth: 3,
    borderRightWidth: 3,
  },
  bottomLeft: {
    bottom: 56,
    left: 24,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
  },
  bottomRight: {
    bottom: 56,
    right: 24,
    borderBottomWidth: 3,
    borderRightWidth: 3,
  },
  footerTextWrap: {
    alignItems: "center",
    marginTop: "auto",
    marginBottom: 8,
  },
  footerMono: {
    color: glow,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 2,
  },
  footerSub: {
    color: "#C5F7DD",
    fontSize: 12,
    marginTop: 6,
    textAlign: "center",
  },
  centerState: {
    minHeight: 320,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(0,255,148,0.28)",
    backgroundColor: "#021612",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    gap: 12,
  },
  permissionTitle: {
    color: "#F3FFF8",
    fontSize: 20,
    fontWeight: "800",
    textAlign: "center",
  },
  stateText: {
    color: "#A7BBB1",
    fontSize: 14,
    lineHeight: 22,
    textAlign: "center",
  },
  permissionButton: {
    marginTop: 8,
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: "#00DB80",
  },
  permissionButtonText: {
    color: "#00170E",
    fontSize: 14,
    fontWeight: "800",
    letterSpacing: 0.4,
  },
});
