import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text } from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import SecondaryButton from "../components/SecondaryButton";
import { scanBarcode } from "../api";
import { colors, spacing, typography } from "../theme/theme";

export default function ScanScreen({ navigation }: { navigation: any }) {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={[styles.content, { flexGrow: 1 }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={true}
      >
        <Text style={styles.title}>Scan</Text>
        <Text style={styles.subtitle}>
          Choose barcode scanning or ingredient-photo scanning.
        </Text>

        <PrimaryButton
          title="Barcode Scan"
          onPress={async () => {
            const result = await scanBarcode("1234567890"); navigation.navigate("Result",{analysis:result});
          }}
          testID="barcode_scan_button"
        />

        <SecondaryButton
          title="Camera Ingredient Scan"
          onPress={() => navigation.navigate("Result")}
          testID="camera_ingredient_scan_button"
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, paddingBottom: spacing.xxl, gap: spacing.md },
  title: { ...typography.h1, color: colors.primaryText, marginBottom: spacing.sm },
  subtitle: { ...typography.body, color: colors.secondaryText, marginBottom: spacing.lg },
});


