import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { typography } from "../../theme/typography";

export default function AppHeaderBlock({
  eyebrow,
  pretitle,
  title,
  titleAccent,
  subtitle,
  body,
  monoSubtitle = false,
}: {
  eyebrow?: string;
  pretitle?: string;
  title: string;
  titleAccent?: string;
  subtitle?: string;
  body?: string;
  monoSubtitle?: boolean;
}) {
  return (
    <View style={styles.wrap}>
      {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}
      {pretitle ? <Text style={styles.pretitle}>{pretitle}</Text> : null}

      <Text style={styles.title}>
        {title}
        {titleAccent ? <Text style={styles.titleAccent}>{titleAccent}</Text> : null}
      </Text>

      {subtitle ? (
        <Text style={[styles.subtitle, monoSubtitle && styles.subtitleMono]}>
          {subtitle}
        </Text>
      ) : null}

      {body ? <Text style={styles.body}>{body}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginBottom: 18,
  },
  eyebrow: {
    ...typography.caption,
    color: "#00FF94",
    letterSpacing: 4,
    marginBottom: 10,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  pretitle: {
    ...typography.caption,
    color: "#A7BBB1",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 2,
    marginBottom: 4,
    textTransform: "uppercase",
  },
  title: {
    ...typography.h1,
    color: "#F3FFF8",
    fontWeight: "300",
    lineHeight: 38,
    marginBottom: 10,
  },
  titleAccent: {
    color: "#00FF94",
    fontWeight: "900",
  },
  subtitle: {
    ...typography.h2,
    color: "#F3FFF8",
    fontWeight: "800",
    lineHeight: 26,
    marginBottom: 12,
  },
  subtitleMono: {
    ...typography.body,
    color: "#A7BBB1",
    fontSize: 18,
    lineHeight: 24,
    fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
  },
  body: {
    ...typography.body,
    color: "#A7BBB1",
    marginBottom: 4,
  },
});
