import React, { useState } from "react";
import { View, Text, Button, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";

type CameraCaptureProps = {
  onCaptured?: (imageUri: string) => void;
};

export default function CameraCapture({ onCaptured }: CameraCaptureProps) {
  const [imageUri, setImageUri] = useState<string | null>(null);

  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      alert("Camera permission required");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      quality: 0.7,
      base64: false
    });

    if (!result.canceled && result.assets?.length) {
      const uri = result.assets[0].uri;
      setImageUri(uri);
      if (onCaptured) {
        onCaptured(uri);
      }
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 16 }}>
      {imageUri ? (
        <Image
          source={{ uri: imageUri }}
          style={{ width: 300, height: 400, marginBottom: 16 }}
          resizeMode="contain"
        />
      ) : (
        <Text style={{ marginBottom: 16 }}>Capture Ingredient Label</Text>
      )}

      <Button title="Take Photo" onPress={takePhoto} />
    </View>
  );
}
