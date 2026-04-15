import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type ProfileType = "adult" | "kid" | "pet";

type Props = {
  value: ProfileType;
  onChange: (next: ProfileType) => void;
};

const OPTIONS: Array<{ key: ProfileType; label: string }> = [
  { key: "adult", label: "You" },
  { key: "kid", label: "Kid" },
  { key: "pet", label: "Pet" },
];

export default function HouseholdProfileSwitcher({ value, onChange }: Props) {
  return (
    <View style={styles.wrap}>
      {OPTIONS.map((item) => {
        const active = value === item.key;
        return (
          <Pressable
            key={item.key}
            onPress={() => onChange(item.key)}
            style={[styles.chip, active && styles.chipActive]}
          >
            <Text style={[styles.chipText, active && styles.chipTextActive]}>
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  chip: {
    minWidth: 96,
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#C9D8CF",
    backgroundColor: "#F7FBF8",
    alignItems: "center",
  },
  chipActive: {
    backgroundColor: "#2F855A",
    borderColor: "#2F855A",
  },
  chipText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#20332B",
  },
  chipTextActive: {
    color: "#FFFFFF",
  },
});




