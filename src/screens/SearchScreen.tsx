import React from "react";
import { Text, View } from "react-native";
import AppTopBar from "../components/AppTopBar";
import AppCard from "../components/ui/AppCard";
import AppScreenShell from "../components/layout/AppScreenShell";
import { SEARCH_SCREEN_COPY } from "../modules/search/helpers/searchScreenContent";

export default function SearchScreen({ navigation }: { navigation: any }) {
  return (
    <AppScreenShell>
      <AppTopBar navigation={navigation} />
      <AppCard>
        <View style={{ gap: 12 }}>
          <Text style={{ color: "#00FF94", fontSize: 11, fontWeight: "800", letterSpacing: 2 }}>
            {SEARCH_SCREEN_COPY.eyebrow}
          </Text>
          <Text style={{ color: "#F3FFF8", fontSize: 28, fontWeight: "800", lineHeight: 34 }}>
            {SEARCH_SCREEN_COPY.title}
          </Text>
          <Text style={{ color: "#A7BBB1", fontSize: 15, lineHeight: 24 }}>
            {SEARCH_SCREEN_COPY.body}
          </Text>
        </View>
      </AppCard>
    </AppScreenShell>
  );
}
