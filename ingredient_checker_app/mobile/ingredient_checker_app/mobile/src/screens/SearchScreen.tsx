import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

const MOCK_PRODUCTS = [
  { id: '1', name: 'Oat Milk', status: 'Safe' },
  { id: '2', name: 'Protein Bar', status: 'Caution' },
  { id: '3', name: 'Frozen Meal', status: 'Avoid' },
];

export default function SearchScreen({ navigation }: { navigation: NavigationProp<any> }) {
  const [query, setQuery] = useState('');
  const filtered = MOCK_PRODUCTS.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search Products</Text>
      <TextInput
        style={styles.input}
        placeholder="Type a product name..."
        value={query}
        onChangeText={setQuery}
      />
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('ResultScreen', { product: item })}>
            <Text style={styles.product}>{item.name}</Text>
            <Text style={styles.status}>{item.status}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No products found.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 24 },
  title: { ...typography.h2, color: colors.primaryText, marginBottom: 16 },
  input: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    fontSize: 16,
    color: colors.primaryText,
  },
  item: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  product: { ...typography.body, color: colors.primaryText },
  status: { ...typography.bodySecondary, color: colors.secondaryText },
  empty: { ...typography.bodySecondary, color: colors.secondaryText, textAlign: 'center', marginTop: 32 },
});
