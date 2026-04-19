$ErrorActionPreference = "Stop"
Set-Location "D:\HealthLogic"

function Test-Pattern {
  param(
    [string]$Path,
    [string]$Pattern
  )

  if (-not (Test-Path $Path)) { return $false }
  return [bool](Select-String -Path $Path -Pattern $Pattern -Quiet)
}

Write-Host ""
Write-Host "=== SCAN / BARCODE SMOKE ===" -ForegroundColor Cyan

$results = [ordered]@{}

$results["Route: Scan exists"]                  = Test-Pattern ".\App.tsx" '<Stack\.Screen name="Scan"'
$results["Home navigates to Scan"]              = Test-Pattern ".\src\screens\HomeScreen.tsx" 'navigate\("Scan"\)'
$results["Scan imports scanBarcode"]            = Test-Pattern ".\src\screens\ScanScreen.tsx" 'import \{ scanBarcode \}'
$results["Scan imports access gate"]            = Test-Pattern ".\src\screens\ScanScreen.tsx" 'getScanAccessDecision'
$results["Barcode button exists"]               = Test-Pattern ".\src\screens\ScanScreen.tsx" 'barcode_scan_button'
$results["Camera button exists"]                = Test-Pattern ".\src\screens\ScanScreen.tsx" 'camera_ingredient_scan_button'
$results["Barcode button calls handler"]        = Test-Pattern ".\src\screens\ScanScreen.tsx" 'onPress=\{handleBarcodeScan\}'
$results["Camera button calls handler"]         = Test-Pattern ".\src\screens\ScanScreen.tsx" 'onPress=\{handleCameraIngredientScan\}'
$results["Barcode handler routes to scanner or result"] = (
  (Test-Pattern ".\src\screens\ScanScreen.tsx" 'navigate\("BarcodeCamera"\)') -or
  (Test-Pattern ".\src\screens\ScanScreen.tsx" 'navigate\("Result"')
)
$results["Camera handler navigates to Result"]  = Test-Pattern ".\src\screens\ScanScreen.tsx" 'navigate\("Result"'
$results["Access gate redirects Subscription"]  = Test-Pattern ".\src\screens\ScanScreen.tsx" 'navigate\(decision\.redirectRoute\)'
$results["expo-camera installed"]               = Test-Pattern ".\package.json" '"expo-camera"'
$results["Scanner package strategy valid"]      = (
  (Test-Pattern ".\package.json" '"expo-camera"') -or
  (Test-Pattern ".\package.json" '"expo-barcode-scanner"')
)
$results["BarcodeScanner route typo fixed"]     = -not (Test-Pattern ".\src\components\scanner\BarcodeScanner.tsx" 'navigate\(\s*["'']Results["'']')

$allPass = $true
foreach ($item in $results.GetEnumerator()) {
  $status = if ($item.Value) { "TRUE" } else { "FALSE" }
  $color = if ($item.Value) { "Green" } else { "Red" }
  if (-not $item.Value) { $allPass = $false }
  Write-Host ("{0,-42} {1}" -f $item.Key, $status) -ForegroundColor $color
}

Write-Host ""
if ($allPass) {
  Write-Host "OVERALL STATIC SCAN SMOKE: TRUE" -ForegroundColor Green
  exit 0
}

Write-Host "OVERALL STATIC SCAN SMOKE: FALSE" -ForegroundColor Red
exit 1