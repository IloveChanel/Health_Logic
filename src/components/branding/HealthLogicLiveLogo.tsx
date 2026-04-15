import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing, Platform, StyleSheet, Text, View } from "react-native";

export default function HealthLogicLiveLogo({
  showDiagnostics = true,
}: {
  showDiagnostics?: boolean;
}) {
  const scanAnim = useRef(new Animated.Value(0)).current;
  const glitchX = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0.92)).current;
  const [glitchOn, setGlitchOn] = useState(false);

  useEffect(() => {
    const scanLoop = Animated.loop(
      Animated.timing(scanAnim, {
        toValue: 1,
        duration: 3600,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

    const glowLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 1800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0.92,
          duration: 1800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );

    let mounted = true;

    const runGlitch = () => {
      if (!mounted) return;

      setGlitchOn(true);

      Animated.sequence([
        Animated.timing(glitchX, {
          toValue: -2,
          duration: 40,
          useNativeDriver: true,
        }),
        Animated.timing(glitchX, {
          toValue: 2,
          duration: 40,
          useNativeDriver: true,
        }),
        Animated.timing(glitchX, {
          toValue: -1,
          duration: 40,
          useNativeDriver: true,
        }),
        Animated.timing(glitchX, {
          toValue: 0,
          duration: 40,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setGlitchOn(false);
        if (mounted) {
          const delay = 1800 + Math.floor(Math.random() * 2200);
          setTimeout(runGlitch, delay);
        }
      });
    };

    scanLoop.start();
    glowLoop.start();
    const t = setTimeout(runGlitch, 1500);

    return () => {
      mounted = false;
      clearTimeout(t);
      scanLoop.stop();
      glowLoop.stop();
    };
  }, [glitchX, glowAnim, scanAnim]);

  const translateY = scanAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-40, 100],
  });

  return (
    <View style={styles.wrap}>
      <Animated.View style={[styles.titleWrap, { opacity: glowAnim }]}>
        {glitchOn ? (
          <>
            <Animated.Text
              style={[
                styles.glitchBackCyan,
                { transform: [{ translateX: glitchX }] },
              ]}
            >
              HEALTHLOGIC
            </Animated.Text>

            <Animated.Text
              style={[
                styles.glitchBackMagenta,
                { transform: [{ translateX: Animated.multiply(glitchX, -1) }] },
              ]}
            >
              HEALTHLOGIC
            </Animated.Text>
          </>
        ) : null}

        <Animated.Text style={[styles.title, { transform: [{ translateX: glitchX }] }]}>
          HEALTH<Text style={styles.logic}>LOGIC</Text>
        </Animated.Text>

        <Animated.View
          pointerEvents="none"
          style={[styles.scanLine, { transform: [{ translateY }] }]}
        />
      </Animated.View>

      {showDiagnostics ? (
        <Text style={styles.diagnostics}>SYSTEM DIAGNOSTICS [ACTIVE]</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginBottom: 16,
  },

  titleWrap: {
    position: "relative",
    justifyContent: "center",
    minHeight: 86,
  },

  title: {
    color: "#F3FFF8",
    fontSize: 40,
    lineHeight: 44,
    fontWeight: "300",
    letterSpacing: -1,
  },

  logic: {
    color: "#00FF94",
    fontWeight: "900",
  },

  glitchBackCyan: {
    position: "absolute",
    top: 0,
    left: 0,
    color: "rgba(0,255,255,0.45)",
    fontSize: 40,
    lineHeight: 44,
    fontWeight: "800",
  },

  glitchBackMagenta: {
    position: "absolute",
    top: 0,
    left: 0,
    color: "rgba(255,0,140,0.35)",
    fontSize: 40,
    lineHeight: 44,
    fontWeight: "800",
  },

  scanLine: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 10,
    backgroundColor: "rgba(120,240,255,0.10)",
  },

  diagnostics: {
    color: "#A7BBB1",
    fontSize: 11,
    fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
    letterSpacing: 1,
    marginTop: 2,
  },
});
