import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function OnboardingScreen({ navigation }) {
  const [conditions, setConditions] = useState('');

  useEffect(() => {
    // nothing for now
  }, []);

  const saveAndContinue = async () => {
    // Store locally only; do not send to server unless user explicitly opts in
    await AsyncStorage.setItem('user_conditions', conditions);
    navigation.replace('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Health Logic</Text>
      <Text style={styles.subtitle}>Enter any health conditions you'd like us to consider (comma-separated). We store this locally only.</Text>

      <TextInput
        style={styles.input}
        placeholder="e.g. diabetes, hypertension, peanut allergy"
        value={conditions}
        onChangeText={setConditions}
        multiline
      />

      <Button title="Continue" onPress={saveAndContinue} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 8 },
  subtitle: { marginBottom: 12, color: '#444' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 12, borderRadius: 8, minHeight: 80, marginBottom: 12 }
});
