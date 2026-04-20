import * as ExpoCamera from "expo-camera";

export type ImageBarcodeRecoveryResult = {
  ok: boolean;
  barcode?: string;
  barcodeType?: string;
  explanation: string;
};

export async function recoverBarcodeFromImage(imageUri: string): Promise<ImageBarcodeRecoveryResult> {
  try {
    const scanFromURLAsyncAny =
      (ExpoCamera as any).scanFromURLAsync ??
      (ExpoCamera as any).Camera?.scanFromURLAsync;

    if (typeof scanFromURLAsyncAny !== "function") {
      return {
        ok: false,
        explanation: "scanFromURLAsync is not available in this runtime."
      };
    }

    const results = await scanFromURLAsyncAny(imageUri);

    if (!Array.isArray(results) || results.length === 0) {
      return {
        ok: false,
        explanation: "No barcode recovered from captured image."
      };
    }

    const first = results[0];

    return {
      ok: true,
      barcode: typeof first?.data === "string" ? first.data : undefined,
      barcodeType: typeof first?.type === "string" ? first.type : undefined,
      explanation: "Recovered barcode from captured image."
    };
  } catch {
    return {
      ok: false,
      explanation: "Image barcode recovery failed."
    };
  }
}
