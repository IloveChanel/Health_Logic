import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function ScanScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scan Product</Text>
      <Text style={styles.subtitle}>Choose scanning method</Text>
      
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('BarcodeScanner')}>
        <Text style={styles.buttonText}>Scan Barcode</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CameraCapture')}>
        <Text style={styles.buttonText}>Photo of Ingredients</Text>
      </TouchableOpacity>
      
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
    justifyContent: "center",
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
  backButton: {
    marginTop: 20,
  },
  backText: {
    color: "#4F7F6A",
    fontSize: 16,
    textAlign: "center",
  },
});
