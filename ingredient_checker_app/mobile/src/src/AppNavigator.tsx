import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import OnboardingScreen from './screens/OnboardingScreen';
import ScanScreen from './screens/ScanScreen';
import ResultScreen from './screens/ResultScreen';
import ProfileScreen from './screens/ProfileScreen';
import BrandScreen from './screens/BrandScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Onboarding">
        <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={require('./screens/HomeScreen').default} />
        <Stack.Screen name="Search" component={require('./screens/SearchScreen').default} />
        <Stack.Screen name="ScanScreen" component={ScanScreen} />
        <Stack.Screen name="HistoryScreen" component={require('./screens/HistoryScreen').default} />
        <Stack.Screen name="ResultScreen" component={ResultScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="BrandScreen" component={BrandScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
