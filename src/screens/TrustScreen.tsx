import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';

export default function TrustScreen({ navigation }: { navigation: any }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.logo}>Health Logic</Text>
      <Text style={styles.tagline}>Clear. Trusted. Modern.</Text>

      <View style={styles.heroCard}>
        <Text style={styles.heroTitle}>Know what's in your food — instantly</Text>
        <Text style={styles.heroText}>Scan barcodes or photograph ingredient lists. Get a clear health score, ingredient explanations, and personalized guidance based on your profile.</Text>
      </View>

      <View style={styles.features}>
        <View style={styles.featureItem}>
          <Text style={styles.featureTitle}>Trusted analysis</Text>
          <Text style={styles.featureText}>Evidence-based ingredient notes and clear risk indicators.</Text>
        </View>
        <View style={styles.featureItem}>
          <Text style={styles.featureTitle}>Private by default</Text>
          <Text style={styles.featureText}>Your health conditions and library stay on your device unless you opt in.</Text>
        </View>
        <View style={styles.featureItem}>
          <Text style={styles.featureTitle}>Fast results</Text>
          <Text style={styles.featureText}>Scan or photo → analyzed in seconds.</Text>
        </View>
      </View>

      <View style={styles.ctaRow}>
        <TouchableOpacity style={styles.ctaButton} onPress={() => navigation.navigate('ScanScreen')}>
          <Text style={styles.ctaText}>Scan Now</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.navigate('ProfileScreen')}>
          <Text style={styles.secondaryText}>Set Profile</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.small}>Secure • No surprise subscriptions • Designed for clarity</Text>
        <TouchableOpacity onPress={() => Alert.alert('Learn more', 'Visit our Privacy Policy at thetrendsetteragency.com') }>
          <Text style={styles.privacyLink}>Privacy Policy</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, backgroundColor: '#F7FBF8', alignItems: 'stretch' },
  logo: { fontSize: 28, fontWeight: '800', color: '#103827', textAlign: 'center', marginBottom: 6 },
  tagline: { fontSize: 14, color: '#3A5A50', textAlign: 'center', marginBottom: 16 },
  heroCard: { backgroundColor: 'white', borderRadius: 14, padding: 18, shadowColor: '#000', shadowOpacity: 0.05, elevation: 2, marginBottom: 18 },
  heroTitle: { fontSize: 20, fontWeight: '700', color: '#0E3B2E', marginBottom: 8 },
  heroText: { color: '#516259', lineHeight: 20 },
  features: { marginBottom: 18 },
  featureItem: { backgroundColor: 'white', borderRadius: 10, padding: 12, marginBottom: 10 },
  featureTitle: { fontWeight: '700', color: '#103827' },
  featureText: { color: '#556B64' },
  ctaRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
  ctaButton: { flex: 1, backgroundColor: '#1FA77E', padding: 14, borderRadius: 12, marginRight: 8, alignItems: 'center' },
  ctaText: { color: 'white', fontWeight: '700' },
  secondaryButton: { flex: 1, backgroundColor: '#E9F4EF', padding: 14, borderRadius: 12, marginLeft: 8, alignItems: 'center' },
  secondaryText: { color: '#11674F', fontWeight: '700' },
  footer: { alignItems: 'center' },
  small: { color: '#6C7D78', fontSize: 12, marginBottom: 6 },
  privacyLink: { color: '#11674F', fontWeight: '600' }
});
