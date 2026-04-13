import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  label: string;
  options: string[];
  value: string;
  onChange: (next: string) => void;
};

export default function ProfileChipGroup({ label, options, value, onChange }: Props) {
  return (
    <View style={styles.section}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.row}>
        {options.map((option) => {
          const active = value === option;
          return (
            <Pressable
              key={option}
              onPress={() => onChange(option)}
              style={[styles.chip, active && styles.chipActive]}
            >
              <Text style={[styles.chipText, active && styles.chipTextActive]}>
                {active ? "✓ " : ""}{option}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "700",
    color: "#60766B",
    marginBottom: 14,
    textTransform: "uppercase",
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  chip: {
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#C9D8CF",
    backgroundColor: "#F7FBF8",
  },
  chipActive: {
    backgroundColor: "#2F855A",
    borderColor: "#2F855A",
  },
  chipText: {
    fontSize: 17,
    fontWeight: "500",
    color: "#20332B",
  },
  chipTextActive: {
    color: "#FFFFFF",
  },
});
