$ErrorActionPreference = "Stop"
Set-Location "D:\HealthLogic"

Write-Host "`n=== BARCODE PLACEHOLDER AUDIT ===" -ForegroundColor Cyan

$scan = Get-Content -Raw ".\src\screens\ScanScreen.tsx"

$hasHardcodedBarcode = $scan -match 'scanBarcode\("737628064502"\)'
$usesRealScannerUi   = $scan -match 'BarcodeScanner|CameraCapture'

Write-Host ("Hardcoded barcode placeholder".PadRight(36) + ($(if($hasHardcodedBarcode){"TRUE"}else{"FALSE"}))) -ForegroundColor ($(if($hasHardcodedBarcode){"Yellow"}else{"Green"}))
Write-Host ("Real scanner component referenced".PadRight(36) + ($(if($usesRealScannerUi){"TRUE"}else{"FALSE"}))) -ForegroundColor ($(if($usesRealScannerUi){"Green"}else{"Red"}))

if ($hasHardcodedBarcode) {
  Write-Host "`nOVERALL BARCODE PLACEHOLDER: TRUE (placeholder exists)" -ForegroundColor Yellow
  exit 1
}

Write-Host "`nOVERALL BARCODE PLACEHOLDER: FALSE" -ForegroundColor Green
exit 0
