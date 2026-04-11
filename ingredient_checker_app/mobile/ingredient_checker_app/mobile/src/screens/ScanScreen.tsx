import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { colors, spacing } from "../../src/theme/theme";
import Card from "../../src/components/Card";
import { scanBarcode } from "../api";

export default function ScanScreen({ navigation }: { navigation: any }) {
  const [loading, setLoading] = useState(false);

  const handleScan = async () => {
    setLoading(true);
    try {
      // For demo, use a hardcoded barcode. Replace with real scan result.
      const barcode = "1234567890123";
      const result = await scanBarcode(barcode);
      navigation.navigate("ResultScreen", { result });
    } catch (err) {
      Alert.alert("Scan Failed", (err as Error).message || "Could not scan product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scan a product</Text>
      <Text style={styles.subtitle}>Check ingredients for your health profile.</Text>

      <Card>
        <TouchableOpacity style={styles.primaryButton} onPress={handleScan} disabled={loading}>
          <Text style={styles.primaryText}>{loading ? "Scanning..." : "Scan Barcode"}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.secondaryText}>Take a photo of ingredients</Text>
        </TouchableOpacity>
      </Card>

      <Text style={styles.footerText}>
        Your scans help improve recommendations — anonymously.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: spacing.xl,
  },
  primaryButton: {
    backgroundColor: colors.safe,
    padding: spacing.md,
    borderRadius: 16,
    marginBottom: spacing.md,
  },
  primaryText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
  },
  secondaryButton: {
    padding: spacing.md,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.divider,
  },
  secondaryText: {
    textAlign: "center",
    color: colors.textPrimary,
    fontSize: 15,
  },
  footerText: {
    fontSize: 13,
    color: colors.textMuted,
    marginTop: spacing.lg,
    textAlign: "center",
  },
});
