import React from "react";
import { Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, View } from "react-native";
import NeuralGlowField from "../effects/NeuralGlowField";

function getTopPadding() {
  if (Platform.OS === "android") {
    return (StatusBar.currentHeight ?? 0) + 18;
  }

  return 18;
}

export default function AppScreenShell({
  children,
  scroll = true,
}: {
  children: React.ReactNode;
  scroll?: boolean;
}) {
  if (!scroll) {
    return (
      <SafeAreaView style={styles.safe}>
        <NeuralGlowField />
        <View style={styles.inner}>{children}</View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <NeuralGlowField />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
      >
        <View style={styles.inner}>{children}</View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#000000",
  },
  scrollContent: {
    flexGrow: 1,
    backgroundColor: "#000000",
  },
  inner: {
    flexGrow: 1,
    backgroundColor: "transparent",
    paddingHorizontal: 20,
    paddingTop: getTopPadding(),
    paddingBottom: 60,
  },
});
