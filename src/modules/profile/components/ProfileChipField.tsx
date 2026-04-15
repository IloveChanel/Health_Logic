import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { typography } from "../../../theme/typography";

export default function ProfileChipField({
  label,
  options,
  selected,
  onToggle,
}: {
  label: string;
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.chipWrap}>
        {options.map((item) => {
          const isSelected = selected.includes(item);

          return (
            <Pressable
              key={item}
              onPress={() => onToggle(item)}
              style={[styles.chip, isSelected && styles.chipSelected]}
            >
              <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
                {item}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: 8,
  },
  label: {
    ...typography.label,
    color: "#A7BBB1",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  chipWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  chip: {
    backgroundColor: "rgba(0,255,148,0.05)",
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(0,255,148,0.18)",
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  chipSelected: {
    backgroundColor: "#12E381",
    borderColor: "#12E381",
  },
  chipText: {
    ...typography.bodySecondary,
    color: "#F3FFF8",
  },
  chipTextSelected: {
    color: "#08100D",
    fontWeight: "800",
  },
});
