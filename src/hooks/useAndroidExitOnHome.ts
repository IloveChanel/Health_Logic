import { useEffect } from "react";
import { BackHandler, Platform } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import React from "react";

export default function useAndroidExitOnHome(enabled: boolean) {
  useFocusEffect(
    React.useCallback(() => {
      if (!enabled || Platform.OS !== "android") return;

      const sub = BackHandler.addEventListener("hardwareBackPress", () => {
        BackHandler.exitApp();
        return true;
      });

      return () => sub.remove();
    }, [enabled])
  );

  useEffect(() => {}, []);
}
