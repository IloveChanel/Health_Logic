import React, { JSX } from "react";
import { StyleSheet, View } from "react-native";
import { colors, spacing } from "../theme/theme";

export default function Divider() {
  return <View style={styles.divider} />;
}

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: colors.divider,
    marginVertical: spacing.md,
    width: "100%",
  },
});




