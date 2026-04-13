import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ScanScreen from "../screens/ScanScreen";
import ResultScreen from "../screens/ResultScreen";
import HistoryScreen from "../screens/HistoryScreen";
import BrandScreen from "../screens/BrandScreen";
import OnboardingScreen from "../screens/OnboardingScreen";
import SearchScreen from "../screens/SearchScreen";

export type RootStackParamList = {
  Onboarding: undefined;
  Home: undefined;
  Profile: undefined;
  Scan: undefined;
  Result: {
    scanMode?: "barcode" | "camera";
    productCategory?: "food" | "supplement" | "skincare" | "haircare" | "makeup" | "bodycare";
    barcode?: string;
    imageUri?: string;
  } | undefined;
  History: undefined;
  Brand: { brandName?: string } | undefined;
  Search: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator id="main-stack"
      initialRouteName="Onboarding"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Scan" component={ScanScreen} />
      <Stack.Screen name="Result" component={ResultScreen} />
      <Stack.Screen name="History" component={HistoryScreen} />
      <Stack.Screen name="Brand" component={BrandScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
    </Stack.Navigator>
  );
}



