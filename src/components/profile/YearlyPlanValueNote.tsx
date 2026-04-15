import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function YearlyPlanValueNote() {
  return (
    <View style={styles.wrap}>
      <Text style={styles.kicker}>Yearly benefit</Text>
      <Text style={styles.text}>Includes 1 free pet profile with the yearly subscription.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginTop: 18,
    borderRadius: 22,
    padding: 18,
    backgroundColor: "#EEF7F1",
    borderWidth: 1,
    borderColor: "#CFE2D6",
  },
  kicker: {
    fontSize: 15,
    fontWeight: "800",
    color: "#2F855A",
    textTransform: "uppercase",
    marginBottom: 6,
  },
  text: {
    fontSize: 17,
    lineHeight: 26,
    color: "#20332B",
    fontWeight: "600",
  },
});




