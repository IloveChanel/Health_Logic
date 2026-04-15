import React, { useEffect, useState } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";

const LOG_MESSAGES = [
  "PROFILE VECTOR READY",
  "INGREDIENT DATABASE SYNCED",
  "SCANNER PROTOCOL ACTIVE",
  "SYSTEM STATUS: OPTIMAL",
  "SIGNAL PATH VERIFIED",
  "ANALYSIS ENGINE STANDBY",
  "HEALTH FILTERS LOADED",
  "HOUSEHOLD MODEL READY",
];

export default function SystemTelemetry() {
  const [logs, setLogs] = useState<string[]>([
    "SYSTEM STATUS: OPTIMAL",
    "SCANNER PROTOCOL ACTIVE",
    "PROFILE VECTOR READY",
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      const next = LOG_MESSAGES[Math.floor(Math.random() * LOG_MESSAGES.length)];
      setLogs((prev) => [next, ...prev.filter((x) => x !== next)].slice(0, 3));
    }, 1800);

    return () => clearInterval(timer);
  }, []);

  return (
    <View style={styles.wrap}>
      {logs.map((log, index) => (
        <Text
          key={`${log}-${index}`}
          style={[
            styles.log,
            {
              opacity: index === 0 ? 1 : index === 1 ? 0.7 : 0.45,
            },
          ]}
        >
          {`> ${log}`}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginBottom: 14,
    minHeight: 44,
    justifyContent: "flex-end",
  },
  log: {
    color: "#00FF94",
    fontSize: 10,
    lineHeight: 14,
    fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
    letterSpacing: 1,
    marginBottom: 1,
  },
});
