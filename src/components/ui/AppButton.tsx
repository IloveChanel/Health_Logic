import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { UI_BUTTON_TOKENS } from "./buttonTokens";
import { typography } from "../../theme/typography";

type Props = {
  title: string;
  onPress: () => void;
  testID?: string;
};

export function AppPrimaryButton({ title, onPress, testID }: Props) {
  return (
    <Pressable testID={testID} onPress={onPress} style={({ pressed }) => [styles.primary, pressed && styles.pressed]}>
      <Text style={styles.primaryText}>{title}</Text>
    </Pressable>
  );
}

export function AppSecondaryButton({ title, onPress, testID }: Props) {
  return (
    <Pressable testID={testID} onPress={onPress} style={({ pressed }) => [styles.secondary, pressed && styles.pressed]}>
      <Text style={styles.secondaryText}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  primary: {
    minHeight: UI_BUTTON_TOKENS.height,
    borderRadius: UI_BUTTON_TOKENS.radius,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: UI_BUTTON_TOKENS.primaryBg,
    paddingHorizontal: 18,
  },
  primaryText: {
    ...typography.button,
    color: UI_BUTTON_TOKENS.primaryText,
    fontWeight: "900",
    letterSpacing: 1,
  },
  secondary: {
    minHeight: UI_BUTTON_TOKENS.height,
    borderRadius: UI_BUTTON_TOKENS.radius,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: UI_BUTTON_TOKENS.secondaryBg,
    borderWidth: 1,
    borderColor: UI_BUTTON_TOKENS.secondaryBorder,
    paddingHorizontal: 18,
  },
  secondaryText: {
    ...typography.button,
    color: UI_BUTTON_TOKENS.secondaryText,
    fontWeight: "800",
    letterSpacing: 1,
  },
  pressed: {
    opacity: 0.9,
  },
});
