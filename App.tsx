import React from "react";
import { StatusBar } from "react-native";
import {
  DarkTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./src/screens/HomeScreen";
import ScanScreen from "./src/screens/ScanScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import HouseholdHubScreen from "./src/screens/HouseholdHubScreen";
import ResultScreen from "./src/screens/ResultScreen";
import HistoryScreen from "./src/screens/HistoryScreen";
import SearchScreen from "./src/screens/SearchScreen";
import SubscriptionScreen from "./src/screens/SubscriptionScreen";
import TrustScreen from "./src/screens/TrustScreen";
import PrivacyPolicyScreen from "./src/screens/PrivacyPolicyScreen";
import BrandScreen from "./src/screens/BrandScreen";
import BarcodeCameraScreen from "./src/screens/BarcodeCameraScreen";

export type RootStackParamList = {
  Home: undefined;
  Scan: undefined;
  Profile: { mode?: "create" | "edit" } | undefined;
  HouseholdHub: undefined;
  Result: { analysis?: any } | undefined;
  History: undefined;
  Search: undefined;
  Subscription: undefined;
  Trust: undefined;
  PrivacyPolicy: undefined;
  Brand: { brandId?: string } | undefined;
  BarcodeCamera: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const navTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: "#000000",
    card: "#000000",
    primary: "#00FF94",
    text: "#F3FFF8",
    border: "#0B1511",
    notification: "#00FF94",
  },
};

export default function App() {
  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#000000"
        translucent={false}
      />

      <NavigationContainer theme={navTheme}>
        <Stack.Navigator
          id="root-stack"
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor: "#000000" },
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Scan" component={ScanScreen} />
          <Stack.Screen name="HouseholdHub" component={HouseholdHubScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Result" component={ResultScreen} />
          <Stack.Screen name="History" component={HistoryScreen} />
          <Stack.Screen name="Search" component={SearchScreen} />
          <Stack.Screen name="Subscription" component={SubscriptionScreen} />
          <Stack.Screen name="Trust" component={TrustScreen} />
          <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
          <Stack.Screen name="Brand" component={BrandScreen} />
          <Stack.Screen name="BarcodeCamera" component={BarcodeCameraScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}



