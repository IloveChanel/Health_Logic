import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { fetchBrandInfo } from "../api";
import { colors, spacing, typography } from "../theme/theme";

export default function BrandScreen({ route }: any) {
  const { brandId } = route.params || {};
  const [brand, setBrand] = useState<any>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const data = await fetchBrandInfo(brandId || "sample");
      if (mounted) setBrand(data);
    })();
    return () => { mounted = false; };
  }, [brandId]);

  if (!brand) return <View style={styles.container}><Text>Loading...</Text></View>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{brand.name}</Text>
      <Text style={styles.body}>{brand.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
    backgroundColor: colors.background
  },
  title: {
    ...typography.h2,
    color: colors.primaryText,
    marginBottom: spacing.sm
  },
  body: {
    ...typography.body,
    color: colors.secondaryText
  }
});
