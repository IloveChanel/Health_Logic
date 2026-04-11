import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';

export default function Results({ route, navigation }) {
  const { barcode, photoUri } = route.params || {};
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (barcode) {
      fetchByBarcode(barcode);
    } else if (photoUri) {
      analyzePhoto(photoUri);
    }
  }, []);

  const fetchByBarcode = async (code: string) => {
    setLoading(true);
    try {
      // Try OpenFoodFacts as a public lookup
      const res = await axios.get(`https://world.openfoodfacts.org/api/v0/product/${code}.json`);
      if (res.data && res.data.status === 1) {
        const prod = res.data.product;
        const ingredients_text = prod.ingredients_text || prod.ingredients_text_en || '';

        // POST to backend product scoring
        const scoreRes = await axios.post(`${process.env.BACKEND_URL || 'http://localhost:8000'}/product/score`, {
          product_name: prod.product_name || prod.brands || 'Unknown',
          ingredients: ingredients_text ? ingredients_text.split(/,|;/).map((s: string) => s.trim()) : []
        });

        setResult({ product: prod, score: scoreRes.data });
      } else {
        setError('Product not found in public database');
      }
    } catch (e: any) {
      setError(e.message || 'Lookup error');
    }
    setLoading(false);
  };

  const analyzePhoto = async (uri: string) => {
    setLoading(true);
    try {
      // Upload photo to backend /scan-image which uses Vision OCR
      const form = new FormData();
      form.append('file', {
        uri,
        name: 'photo.jpg',
        type: 'image/jpeg'
      } as any);

      const res = await axios.post(`${process.env.BACKEND_URL || 'http://localhost:8000'}/scan-image`, form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (res.data && res.data.ingredients) {
        // Call product scoring with extracted ingredients
        const ingredients = res.data.ingredients.split(/\n|,|;/).map((s: string) => s.trim()).filter(Boolean);
        const scoreRes = await axios.post(`${process.env.BACKEND_URL || 'http://localhost:8000'}/product/score`, {
          product_name: 'Photo Scan',
          ingredients
        });

        setResult({ ocr: res.data, score: scoreRes.data });
      } else {
        setError('No text found in image');
      }
    } catch (e: any) {
      setError(e.message || 'Analyze error');
    }
    setLoading(false);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
      {loading && <ActivityIndicator size="large" />}
      {error && <Text style={styles.error}>{error}</Text>}
      {result && (
        <View>
          <Text style={styles.title}>Analysis Result</Text>
          <Text>Score: {result.score && result.score.score}</Text>
          <Text style={{ marginTop: 12, fontWeight: '600' }}>Breakdown:</Text>
          {result.score && result.score.breakdown && result.score.breakdown.map((b: any, i: number) => (
            <Text key={i}>- {b.ingredient}: {b.impact} ({b.reason})</Text>
          ))}
        </View>
      )}

      <Button title="Back" onPress={() => navigation.goBack()} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 8 },
  error: { color: 'red', marginBottom: 12 }
});
