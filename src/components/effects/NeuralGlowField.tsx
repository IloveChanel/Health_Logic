import React, { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function NeuralGlowField() {
  const scanAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(0.82)).current;

  useEffect(() => {
    const scanLoop = Animated.loop(
      Animated.timing(scanAnim, {
        toValue: 1,
        duration: 7000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2400,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.82,
          duration: 2400,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );

    scanLoop.start();
    pulseLoop.start();

    return () => {
      scanLoop.stop();
      pulseLoop.stop();
    };
  }, [scanAnim, pulseAnim]);

  const translateY = scanAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-220, 1100],
  });

  return (
    <View pointerEvents="none" style={styles.root}>
      <Animated.View style={[styles.centerGlow, { opacity: pulseAnim }]} />
      <Animated.View style={[styles.outerGlow, { opacity: pulseAnim }]} />

      <View style={styles.gridOverlay}>
        {[...Array(9)].map((_, i) => (
          <View
            key={`v-${i}`}
            style={[styles.gridLineVertical, { left: `${(i + 1) * 10}%` }]}
          />
        ))}

        {[...Array(15)].map((_, i) => (
          <View
            key={`h-${i}`}
            style={[styles.gridLineHorizontal, { top: `${(i + 1) * 6}%` }]}
          />
        ))}
      </View>

      <Animated.View
        style={[
          styles.scanLineWrap,
          {
            transform: [{ translateY }],
          },
        ]}
      >
        <LinearGradient
          colors={["transparent", "rgba(0,255,148,0.16)", "transparent"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.scanLine}
        />
      </Animated.View>

      <View style={styles.noiseDots}>
        {[...Array(18)].map((_, i) => (
          <View
            key={`d-${i}`}
            style={[
              styles.dot,
              {
                top: `${8 + ((i * 5.1) % 78)}%`,
                left: `${5 + ((i * 7.7) % 88)}%`,
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
    overflow: "hidden",
  },

  centerGlow: {
    position: "absolute",
    width: 420,
    height: 420,
    borderRadius: 210,
    alignSelf: "center",
    top: 110,
    backgroundColor: "rgba(0,255,148,0.05)",
  },

  outerGlow: {
    position: "absolute",
    width: 620,
    height: 620,
    borderRadius: 310,
    alignSelf: "center",
    top: 10,
    backgroundColor: "rgba(0,255,148,0.025)",
  },

  gridOverlay: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.075,
  },

  gridLineVertical: {
    position: "absolute",
    width: 1,
    height: "100%",
    backgroundColor: "#00FF94",
  },

  gridLineHorizontal: {
    position: "absolute",
    width: "100%",
    height: 1,
    backgroundColor: "#00FF94",
  },

  scanLineWrap: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 190,
  },

  scanLine: {
    flex: 1,
  },

  noiseDots: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.22,
  },

  dot: {
    position: "absolute",
    width: 2,
    height: 2,
    borderRadius: 1,
    backgroundColor: "#00FF94",
  },
});
