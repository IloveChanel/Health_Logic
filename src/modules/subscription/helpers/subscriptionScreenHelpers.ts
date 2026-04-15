import { Alert, BackHandler, Platform } from "react-native";

export function handleSubscriptionBack(navigation: any) {
  if (navigation?.canGoBack?.()) {
    navigation.goBack();
    return;
  }

  navigation?.reset?.({
    index: 0,
    routes: [{ name: "Home" }],
  });
}

export function handleSubscriptionExitApp() {
  if (Platform.OS === "android") {
    BackHandler.exitApp();
    return;
  }

  Alert.alert("Exit App", "Exit is Android-only in this build.");
}




