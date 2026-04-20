export type InlineScanPayload = {
  rawValue: string;
  type?: string;
};

export function normalizeScannedValue(value: unknown): string {
  return String(value ?? "").trim();
}

export function isUsableScan(value: unknown): boolean {
  return normalizeScannedValue(value).length > 0;
}

export function getScanFailureMessage(error: unknown): string {
  if (error instanceof Error && error.message.trim()) {
    return error.message.trim();
  }
  return "We could not complete the barcode scan.";
}
