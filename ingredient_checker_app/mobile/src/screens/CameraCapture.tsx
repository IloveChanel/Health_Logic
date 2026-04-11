import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import { Camera } from 'expo-camera';

export default function CameraCapture({ navigation }) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [type] = useState(Camera.Constants.Type.back);
  const cameraRef = useRef<Camera | null>(null);
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({ base64: false, quality: 0.8 });
      setPhotoUri(photo.uri);
    }
  };

  if (hasPermission === null) return <Text>Requesting camera permission</Text>;
  if (hasPermission === false) return <Text>No access to camera</Text>;

  return (
    <View style={styles.container}>
      {!photoUri ? (
        <Camera style={styles.camera} type={type} ref={(r) => (cameraRef.current = r)} />
      ) : (
        <Image source={{ uri: photoUri }} style={styles.camera} />
      )}

      <View style={styles.controls}>
        <Button title="Take Photo" onPress={takePicture} />
        {photoUri && (
          <>
            <Button title="Analyze" onPress={() => navigation.navigate('Results', { photoUri })} />
            <Button title="Retake" onPress={() => setPhotoUri(null)} />
          </>
        )}
        <Button title="Back" onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: { flex: 1 },
  controls: { padding: 12, backgroundColor: '#fff' },
});
