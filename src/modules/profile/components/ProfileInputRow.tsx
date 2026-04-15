import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { typography } from "../../../theme/typography";

export default function ProfileInputRow({
  label,
  value,
  onChangeText,
  placeholder,
  multiline = false,
}: {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  multiline?: boolean;
}) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#7F948A"
        style={[styles.input, multiline && styles.multiline]}
        multiline={multiline}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: 8,
  },
  label: {
    ...(typography.label as any),
    color: "#A7BBB1",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  input: {
    ...typography.body,
    color: "#F3FFF8",
    backgroundColor: "#16211D",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(0,255,148,0.12)",
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  multiline: {
    minHeight: 96,
    textAlignVertical: "top",
  },
});
