import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import AppTopBar from "../components/AppTopBar";
import AppScreenShell from "../components/layout/AppScreenShell";
import { fetchBrandInfo } from "../api";
import { colors } from "../theme/theme";
import { BRAND_SCREEN_COPY } from "../modules/brand/helpers/brandScreenContent";
import { brandScreenStyles as styles } from "../modules/brand/styles/brandScreenStyles";

type Brand = {
  id?: string;
  name?: string;
  description?: string;
};

export default function BrandScreen({
  navigation,
  route,
}: {
  navigation: any;
  route?: { params?: { brandId?: string } };
}) {
  const brandId = route?.params?.brandId ?? "sample";

  const [brand, setBrand] = useState<Brand | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadBrand = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchBrandInfo(brandId);
        const normalized: Brand | null = data
          ? {
                            name:
                typeof data.brandName === "string"
                    ? data.brandName
                    : undefined,
              description:
                typeof data.notes === "string"
                    ? data.notes
                    : undefined,
            }
          : null;

        if (!cancelled) {
          setBrand(normalized);
        }
      } catch {
        if (!cancelled) {
          setBrand(null);
          setError(BRAND_SCREEN_COPY.errorBody);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void loadBrand();

    return () => {
      cancelled = true;
    };
  }, [brandId]);

  return (
    <AppScreenShell scroll={false}>
      <AppTopBar navigation={navigation} />

      <View style={styles.wrap}>
        {loading ? (
          <View style={[styles.card, styles.centered]}>
            <ActivityIndicator size="small" color={colors.primaryText} />
            <Text style={styles.statusText}>{BRAND_SCREEN_COPY.loadingTitle}</Text>
          </View>
        ) : error ? (
          <View style={[styles.card, styles.centered]}>
            <Text style={styles.errorTitle}>{BRAND_SCREEN_COPY.errorTitle}</Text>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : !brand ? (
          <View style={[styles.card, styles.centered]}>
            <Text style={styles.errorTitle}>{BRAND_SCREEN_COPY.emptyTitle}</Text>
            <Text style={styles.errorText}>{BRAND_SCREEN_COPY.emptyBody}</Text>
          </View>
        ) : (
          <View style={styles.card}>
            <Text style={styles.eyebrow}>{BRAND_SCREEN_COPY.eyebrow}</Text>
            <Text style={styles.title}>{brand.name ?? BRAND_SCREEN_COPY.fallbackName}</Text>
            <Text style={styles.body}>
              {brand.description ?? BRAND_SCREEN_COPY.fallbackDescription}
            </Text>
          </View>
        )}
      </View>
    </AppScreenShell>
  );
}





