import React, { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, ViewStyle } from "react-native";
import { UI_SURFACE_TOKENS } from "./surfaceTokens";

export default function AppCard({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
}) {
  const glow = useRef(new Animated.Value(0.14)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(glow, {
          toValue: 0.22,
          duration: 2600,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
        Animated.timing(glow, {
          toValue: 0.14,
          duration: 2600,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
      ])
    );

    loop.start();
    return () => loop.stop();
  }, [glow]);

  return (
    <Animated.View
      style={[
        styles.card,
        style,
        {
          shadowOpacity: glow,
        },
      ]}
    >
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: UI_SURFACE_TOKENS.background,
    borderRadius: UI_SURFACE_TOKENS.radius,
    padding: UI_SURFACE_TOKENS.padding,
    borderWidth: UI_SURFACE_TOKENS.borderWidth,
    borderColor: UI_SURFACE_TOKENS.borderColor,
    marginTop: 16,
    shadowColor: "#00FF94",
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 0 },
    elevation: 3,
  },
});
