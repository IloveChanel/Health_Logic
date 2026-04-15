import React, { useEffect, useRef } from "react";
import { Animated, Easing, Pressable, StyleSheet, Text } from "react-native";
import { UI_BUTTON_TOKENS } from "./ui/buttonTokens";

export default function PrimaryButton({
  title,
  onPress,
  testID,
}: {
  title: string;
  onPress: () => void;
  testID?: string;
}) {
  const pulse = useRef(new Animated.Value(0.985)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 1800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0.985,
          duration: 1800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );

    loop.start();
    return () => loop.stop();
  }, [pulse]);

  return (
    <Animated.View style={[styles.wrap, { transform: [{ scale: pulse }] }]}>
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
    backgroundColor: UI_BUTTON_TOKENS.primaryBg,
    paddingHorizontal: 18,
    shadowColor: UI_BUTTON_TOKENS.primaryBg,
    shadowOpacity: 0.22,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    elevation: 5,
  },
  text: {
    color: UI_BUTTON_TOKENS.primaryText,
    fontWeight: "900",
    fontSize: UI_BUTTON_TOKENS.fontSize,
    letterSpacing: 1,
  },
  pressed: {
    opacity: 0.9,
  },
});
