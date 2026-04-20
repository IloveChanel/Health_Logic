export function handleCapturedImageForScanResult(
  navigation: any,
  imageUri: string,
  activeProfileId?: string | null
) {
  navigation.navigate("Result", {
    scanMode: "camera",
    imageUri,
    activeProfileId: activeProfileId ?? null,
  });
}
