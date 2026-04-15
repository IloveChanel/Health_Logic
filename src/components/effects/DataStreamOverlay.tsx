import React, { useEffect, useState } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";

const STREAM_LINES = [
  "INDEXING INGREDIENT MATRIX",
  "MATCHING PROFILE VECTOR",
  "CROSS-REFERENCING DATABASE",
  "SCANNING NUTRIENT SIGNALS",
  "DETECTING RISK INDICATORS",
  "VERIFYING INGREDIENT CHAIN",
  "EVALUATING HEALTH SCORE",
  "ASSEMBLING ANALYSIS RESULT",
];

export default function DataStreamOverlay() {
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    let index = 0;

    const timer = setInterval(() => {
      setLines((prev) => [
        STREAM_LINES[index % STREAM_LINES.length],
        ...prev,
      ].slice(0, 6));

      index++;
    }, 120);

    return () => clearInterval(timer);
  }, []);

  return (
    <View style={styles.overlay}>
      <View style={styles.panel}>
        {lines.map((line, i) => (
          <Text
            key={`${line}-${i}`}
            style={[
              styles.line,
              { opacity: 1 - i * 0.18 },
            ]}
          >
            {`> ${line}`}
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.78)",
  },
  panel: {
    width: "82%",
    padding: 18,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#00FF94",
    backgroundColor: "rgba(0,0,0,0.92)",
  },
  line: {
    color: "#00FF94",
    fontSize: 11,
    marginBottom: 6,
    letterSpacing: 1,
    fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
  },
});
