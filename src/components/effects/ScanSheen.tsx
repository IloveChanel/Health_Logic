import React, { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function ScanSheen() {
  const translateX = useRef(new Animated.Value(-260)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.delay(2400),
        Animated.timing(translateX, {
          toValue: 520,
          duration: 1100,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(translateX, {
          toValue: -260,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    );

    loop.start();
    return () => loop.stop();
  }, [translateX]);

  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      <Animated.View
        style={[
          styles.sheenWrap,
          {
            transform: [{ translateX }, { rotate: "-18deg" }],
          },
        ]}
      >
        <LinearGradient
          colors={["transparent", "rgba(160,255,245,0.18)", "transparent"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.sheen}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  sheenWrap: {
    position: "absolute",
    top: -60,
    bottom: -60,
    width: 140,
  },
  sheen: {
    flex: 1,
  },
});
