import React from "react";
import {
  Alert,
  BackHandler,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { typography } from "../theme/typography";

export default function AppTopBar({ navigation }: { navigation: any }) {
  const handleBack = () => {
    if (navigation?.canGoBack?.()) {
      navigation.goBack();
      return;
    }

    navigation?.reset?.({
      index: 0,
      routes: [{ name: "Home" }],
    });
  };

  const handleExitApp = () => {
    if (Platform.OS === "android") {
      BackHandler.exitApp();
      return;
    }

    Alert.alert("Exit App", "Exit is Android-only in this build.");
  };

  return (
    <View style={styles.topBar}>
      <Pressable onPress={handleBack} style={styles.topBarButton}>
        <Text style={styles.topBarButtonText}>BACK</Text>
      </Pressable>

      <Pressable onPress={handleExitApp} style={styles.topBarButtonExit}>
        <Text style={styles.topBarButtonExitText}>EXIT</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  topBarButton: {
    paddingVertical: 4,
  },
  topBarButtonText: {
    ...typography.caption,
    color: "#00FF41",
    fontWeight: "800",
    letterSpacing: 1,
  },
  topBarButtonExit: {
    paddingVertical: 4,
  },
  topBarButtonExitText: {
    ...typography.caption,
    color: "#FF4D4D",
    fontWeight: "800",
    letterSpacing: 1,
  },
});
