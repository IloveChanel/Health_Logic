import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ProfileChipGroup from "./ProfileChipGroup";

type Props = {
  petType: string;
  setPetType: (v: string) => void;
  lifeStage: string;
  setLifeStage: (v: string) => void;
  diet: string;
  setDiet: (v: string) => void;
};

export default function PetProfileSection(props: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Pet profile</Text>
      <Text style={styles.subtitle}>
        Build a pet-safe ingredient filter with species, life stage, and dietary needs.
      </Text>

      <ProfileChipGroup
        label="Pet Type"
        options={["Dog", "Cat", "Other Pet"]}
        value={props.petType}
        onChange={props.setPetType}
      />

      <ProfileChipGroup
        label="Life Stage"
        options={["Puppy/Kitten", "Adult", "Senior"]}
        value={props.lifeStage}
        onChange={props.setLifeStage}
      />

      <ProfileChipGroup
        label="Dietary Need"
        options={["Sensitive Stomach", "Weight Control", "Grain Free", "Skin & Coat", "Renal Support"]}
        value={props.diet}
        onChange={props.setDiet}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 20,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: "#D7E4DC",
    backgroundColor: "#FFFFFF",
    padding: 22,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#20332B",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    lineHeight: 29,
    color: "#5E7269",
  },
});
