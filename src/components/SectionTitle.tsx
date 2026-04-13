import React, { ReactNode } from "react";
import { StyleSheet, Text } from "react-native";
import { colors, spacing, typography } from "../theme/theme";

type Props = {
  children: ReactNode;
};

export default function SectionTitle({ children }: Props) {
  return <Text style={styles.title}>{children}</Text>;
}

const styles = StyleSheet.create({
  title: {
    ...typography.h3,
    color: colors.primaryText,
    marginBottom: spacing.sm,
  },
});
