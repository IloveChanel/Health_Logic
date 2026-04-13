import React from "react";
import { BackHandler, Platform, Pressable, StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { colors, typography } from "../theme/theme";

type Props = {
  title?: string;
};

export default function ExitButton({ title = "Exit" }: Props) {
  const navigation = useNavigation<any>();

  const handleExit = () => {
    if (Platform.OS === "android") {
      BackHandler.exitApp();
      return;
    }

    if (navigation?.canGoBack?.()) {
      navigation.goBack();
    }
  };

  return (
    <Pressable onPress={handleExit} style={styles.button}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignSelf: "flex-start",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.78)",
    borderWidth: 1,
    borderColor: colors.border,
  },
  text: {
    ...typography.bodySecondary,
    color: colors.primaryText,
  },
});
