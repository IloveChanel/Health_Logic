import React, { useEffect, useRef } from "react";
import { Animated, Easing, Pressable, StyleSheet, Text } from "react-native";
import { UI_BUTTON_TOKENS } from "./ui/buttonTokens";
import { typography } from "../theme/typography";

export default function SecondaryButton({
  title,
  onPress,
  testID,
}: {
  title: string;
  onPress: () => void;
  testID?: string;
}) {
  const glow = useRef(new Animated.Value(0.72)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(glow, {
          toValue: 1,
          duration: 2200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(glow, {
          toValue: 0.72,
          duration: 2200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );

    loop.start();
    return () => loop.stop();
  }, [glow]);

  return (
    <Animated.View style={[styles.wrap, { opacity: glow }]}>
      <Pressable
        testID={testID}
        onPress={onPress}
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      >
        <Text style={styles.text}>{title}</Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginTop: 2,
  },
  button: {
    minHeight: UI_BUTTON_TOKENS.height,
    borderRadius: UI_BUTTON_TOKENS.radius,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: UI_BUTTON_TOKENS.secondaryBg,
    borderWidth: 1,
    borderColor: UI_BUTTON_TOKENS.secondaryBorder,
    paddingHorizontal: 18,
  },
  text: {
    ...typography.button,
    color: UI_BUTTON_TOKENS.secondaryText,
    fontWeight: "800",
    letterSpacing: 1,
  },
  pressed: {
    opacity: 0.9,
  },
});
