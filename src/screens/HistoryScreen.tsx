import React from "react";
import { Text, View } from "react-native";
import AppTopBar from "../components/AppTopBar";
import AppCard from "../components/ui/AppCard";
import AppScreenShell from "../components/layout/AppScreenShell";
import { LIBRARY_COPY } from "../modules/library/helpers/libraryScreenContent";

export default function HistoryScreen({ navigation }: { navigation: any }) {
  return (
    <AppScreenShell>
      <AppTopBar navigation={navigation} />
      <AppCard>
        <View style={{ gap: 12 }}>
          <Text style={{ color: "#00FF94", fontSize: 11, fontWeight: "800", letterSpacing: 2 }}>
            {LIBRARY_COPY.historyEyebrow}
          </Text>
          <Text style={{ color: "#F3FFF8", fontSize: 28, fontWeight: "800", lineHeight: 34 }}>
            {LIBRARY_COPY.historyTitle}
          </Text>
          <Text style={{ color: "#A7BBB1", fontSize: 15, lineHeight: 24 }}>
            {LIBRARY_COPY.historyBody}
          </Text>
        </View>
      </AppCard>
    </AppScreenShell>
  );
}
