import React from "react";
import { Text, View } from "react-native";
import PrimaryButton from "../PrimaryButton";

export default function BarcodeScanner({ navigation }: { navigation: any }) {
  return (
    <View style={{ gap: 12 }}>
      <Text style={{ color: "#F3FFF8", fontSize: 18, fontWeight: "800" }}>
        Live Barcode Scan
      </Text>
      <Text style={{ color: "#A7BBB1", fontSize: 15, lineHeight: 24 }}>
        Open the live camera scanner to read a real product barcode.
      </Text>
      <PrimaryButton
        title="Open Live Barcode Scanner"
        onPress={() => navigation.navigate("BarcodeCamera")}
      />
    </View>
  );
}
