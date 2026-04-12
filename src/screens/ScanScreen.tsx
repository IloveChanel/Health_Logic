import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { colors } from "../app/theme/colors";

export default function ScanScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.wrap}>
        <Text style={styles.title}>Scan</Text>
        <Text style={styles.subtitle}>
          This screen will host:
        </Text>

        <View style={styles.list}>
          <Text style={styles.item}>• BarcodeScannerModule</Text>
          <Text style={styles.item}>• IngredientPhotoCaptureModule</Text>
          <Text style={styles.item}>• ScanEntryChooser</Text>
          <Text style={styles.item}>• ScanResultPreview</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  wrap: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: colors.textSoft,
    marginBottom: 14,
  },
  list: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 16,
    borderColor: colors.border,
    borderWidth: 1,
  },
  item: {
    fontSize: 15,
    color: colors.text,
    marginBottom: 8,
  },
});
