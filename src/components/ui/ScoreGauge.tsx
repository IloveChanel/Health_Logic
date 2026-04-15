import React, { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { typography } from "../../theme/typography";

export default function ScoreGauge({ score }: { score: number }) {
  const progress = useRef(new Animated.Value(0)).current;
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    Animated.timing(progress, {
      toValue: score,
      duration: 900,
      useNativeDriver: false,
    }).start();

    let start = 0;
    const interval = setInterval(() => {
      start += 2;
      if (start >= score) {
        start = score;
        clearInterval(interval);
      }
      setDisplayScore(start);
    }, 20);

    return () => clearInterval(interval);
  }, [score]);

  let color = "#00FF94";
  if (score < 40) color = "#FF4D4D";
  else if (score < 70) color = "#FFC857";

  return (
    <View style={styles.wrap}>
      <View style={[styles.circle, { borderColor: color }]}>
        <Text style={[styles.score, { color }]}>{displayScore}%</Text>
        <Text style={styles.label}>Health Score</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: "center",
    marginBottom: 18,
  },
  circle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  score: {
    ...typography.h1,
    fontWeight: "900",
  },
  label: {
    ...typography.caption,
    color: "#A7BBB1",
    marginTop: 4,
    letterSpacing: 1,
  },
});
