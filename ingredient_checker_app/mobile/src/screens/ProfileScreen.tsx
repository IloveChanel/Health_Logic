
import React from "react";
import { View, Text, Switch, TouchableOpacity, StyleSheet } from "react-native";

export default function ProfileScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Health Profile</Text>
      <Text style={styles.subtitle}>Manage your dietary preferences</Text>
      
      <View style={styles.row}>
        <Text style={styles.label}>Gluten sensitivity</Text>
        <Switch />
      </View>
      
      <View style={styles.row}>
        <Text style={styles.label}>Dairy sensitivity</Text>
        <Switch />
      </View>
      
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9F7",
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1C1F1D",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#5F6B66",
    marginBottom: 40,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#DDE4E0",
  },
  label: {
    fontSize: 16,
    color: "#1C1F1D",
  },
  backButton: {
    marginTop: 40,
  },
  backText: {
    color: "#4F7F6A",
    fontSize: 16,
    textAlign: "center",
  },
});
