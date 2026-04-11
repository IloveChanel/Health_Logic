import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

export default function OnboardingFooter() {
  return (
    <View style={styles.footer}>
      <Text style={styles.text}>
        This app provides educational information only and does not constitute medical advice. Consult a healthcare professional for medical concerns.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: { marginTop: 32, padding: 16 },
  text: { ...typography.bodySecondary, color: colors.secondaryText, textAlign: 'center' },
});
