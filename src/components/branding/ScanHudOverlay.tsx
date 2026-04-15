import React, { useEffect, useRef } from "react";
import { Animated, Easing, Platform, StyleSheet, Text, View } from "react-native";

export default function ScanHudOverlay() {
  const pulse = useRef(new Animated.Value(1)).current;
  const sweep = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1.05,
          duration: 900,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 1,
          duration: 900,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );

    const sweepLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(sweep, {
          toValue: 1,
          duration: 2200,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(sweep, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
        Animated.delay(450),
      ])
    );

    pulseLoop.start();
    sweepLoop.start();

    return () => {
      pulseLoop.stop();
      sweepLoop.stop();
    };
  }, [pulse, sweep]);

  const translateY = sweep.interpolate({
    inputRange: [0, 1],
    outputRange: [-90, 90],
  });

  return (
    <View pointerEvents="none" style={styles.wrap}>
      <Animated.View style={[styles.reticle, { transform: [{ scale: pulse }] }]}>
        <View style={[styles.corner, styles.topLeft]} />
        <View style={[styles.corner, styles.topRight]} />
        <View style={[styles.corner, styles.bottomLeft]} />
        <View style={[styles.corner, styles.bottomRight]} />

        <Animated.View
          style={[
            styles.sweepLine,
            {
              transform: [{ translateY }],
            },
          ]}
        />
      </Animated.View>

      <View style={styles.readout}>
        <Text style={styles.readoutText}>ANALYSIS ENGINE READY</Text>
        <Text style={styles.readoutText}>AIM AT PRODUCT OR LABEL</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: "center",
    marginTop: 6,
    marginBottom: 4,
  },
  reticle: {
    width: 210,
    height: 210,
    position: "relative",
    marginBottom: 14,
  },
  corner: {
    position: "absolute",
    width: 36,
    height: 36,
    borderColor: "#00FF94",
  },
  topLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 3,
    borderLeftWidth: 3,
  },
  topRight: {
    top: 0,
    right: 0,
    borderTopWidth: 3,
    borderRightWidth: 3,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 3,
    borderRightWidth: 3,
  },
  sweepLine: {
    position: "absolute",
    left: 20,
    right: 20,
    top: 100,
    height: 2,
    backgroundColor: "rgba(0,255,148,0.75)",
    shadowColor: "#00FF94",
    shadowOpacity: 0.8,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
    elevation: 6,
  },
  readout: {
    alignItems: "center",
  },
  readoutText: {
    color: "#00FF94",
    fontSize: 10,
    lineHeight: 14,
    fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
    letterSpacing: 1,
  },
});
