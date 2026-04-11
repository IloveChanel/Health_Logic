import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Health Logic</Text>
      <Text style={styles.subtitle}>Check ingredients for your health</Text>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('ScanScreen')}
      >
        <Text style={styles.buttonText}>Scan a Product</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('Trust')}
      >
        <Text style={styles.buttonText}>Why Trust Health Logic?</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('ProfileScreen')}
      >
        <Text style={styles.buttonText}>Health Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9F7",
    padding: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1C1F1D",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#5F6B66",
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#4F7F6A",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});