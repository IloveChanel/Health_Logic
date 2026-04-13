import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { colors, radius, spacing, typography } from "../theme/theme";

type Props = {
  title: string;
  onPress: () => void;
  testID?: string;
};

export default function PrimaryButton({ title, onPress, testID }: Props) {
  return (
    <Pressable style={styles.button} onPress={onPress} testID={testID} accessibilityLabel={testID}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    ...typography.button,
    color: colors.white,
  },
});
