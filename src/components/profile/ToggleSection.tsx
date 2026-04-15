import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { UI_SURFACE_TOKENS } from "../ui/surfaceTokens";

export default function ToggleSection({
  title,
  subtitle,
  open,
  onToggle,
  children,
}: {
  title: string;
  subtitle?: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.card}>
      <Pressable onPress={onToggle} style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.title}>{title}</Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
        <Text style={styles.toggle}>{open ? "−" : "+"}</Text>
      </Pressable>

      {open ? <View style={styles.body}>{children}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: UI_SURFACE_TOKENS.background,
    borderRadius: UI_SURFACE_TOKENS.radius,
    borderWidth: UI_SURFACE_TOKENS.borderWidth,
    borderColor: UI_SURFACE_TOKENS.borderColor,
    padding: 18,
    marginBottom: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  headerText: {
    flex: 1,
    paddingRight: 12,
  },
  title: {
    color: "#F3FFF8",
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 6,
  },
  subtitle: {
    color: "#A7BBB1",
    fontSize: 14,
    lineHeight: 20,
  },
  toggle: {
    color: "#00FF94",
    fontSize: 28,
    fontWeight: "700",
    lineHeight: 28,
  },
  body: {
    marginTop: 16,
  },
});
