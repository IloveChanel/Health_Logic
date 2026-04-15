import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { typography } from "../../../theme/typography";

export default function ProfileSectionCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      <View style={styles.body}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "rgba(16,24,21,0.92)",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(0,255,148,0.18)",
    padding: 18,
    marginBottom: 16,
  },
  title: {
    ...typography.h3,
    color: "#F3FFF8",
    marginBottom: 6,
  },
  subtitle: {
    ...typography.bodySecondary,
    color: "#A7BBB1",
    marginBottom: 12,
  },
  body: {
    gap: 12,
  },
});
