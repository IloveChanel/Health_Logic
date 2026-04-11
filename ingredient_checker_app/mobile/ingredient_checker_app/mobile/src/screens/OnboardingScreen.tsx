import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import OnboardingFooter from '../components/OnboardingFooter';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

export default function OnboardingScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Ingredient Checker</Text>
      <Text style={styles.subtitle}>Scan products, check ingredients, and make safer choices for you and your family.</Text>
      <PrimaryButton title="Get Started" onPress={() => navigation.replace('Home')} />
      <OnboardingFooter />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, backgroundColor: colors.background },
  title: { ...typography.h1, color: colors.primaryText, marginBottom: 16, textAlign: 'center' },
  subtitle: { ...typography.body, color: colors.secondaryText, marginBottom: 32, textAlign: 'center' },
});
