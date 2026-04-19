$ErrorActionPreference = "Stop"
Set-Location "D:\HealthLogic"

Write-Host "`n=== SCAN / BARCODE SMOKE ===" -ForegroundColor Cyan

$appPath        = ".\App.tsx"
$scanPath       = ".\src\screens\ScanScreen.tsx"
$homePath       = ".\src\screens\HomeScreen.tsx"
$gatePath       = ".\src\modules\scan\helpers\scanAccessGate.ts"
$pkgPath        = ".\package.json"

$appText        = if (Test-Path $appPath)  { Get-Content -Raw $appPath }  else { "" }
$scanText       = if (Test-Path $scanPath) { Get-Content -Raw $scanPath } else { "" }
$homeScreenText = if (Test-Path $homePath) { Get-Content -Raw $homePath } else { "" }
$gateText       = if (Test-Path $gatePath) { Get-Content -Raw $gatePath } else { "" }
$pkgText        = if (Test-Path $pkgPath)  { Get-Content -Raw $pkgPath }  else { "" }

$checks = [ordered]@{
  "Route: Scan exists"                    = ($appText  -match 'name="Scan"')
  "Home navigates to Scan"               = ($homeScreenText -match 'navigate\("Scan"\)')
  "Scan imports scanBarcode"             = ($scanText -match 'import\s+\{\s*scanBarcode\s*\}\s+from')
  "Scan imports access gate"             = ($scanText -match 'getScanAccessDecision')
  "Barcode button exists"                = ($scanText -match 'testID="barcode_scan_button"')
  "Camera button exists"                 = ($scanText -match 'testID="camera_ingredient_scan_button"')
  "Barcode button calls handler"         = ($scanText -match 'onPress=\{handleBarcodeScan\}')
  "Camera button calls handler"          = ($scanText -match 'onPress=\{handleCameraIngredientScan\}')
  "Barcode handler navigates to Result"  = ($scanText -match 'navigate\("Result",\s*\{\s*analysis:\s*result\s*\}\)')
  "Camera handler navigates to Result"   = ($scanText -match 'navigate\("Result"\)')
  "Access gate redirects Subscription"   = ($gateText -match 'redirectRoute:\s*"Subscription"')
  "expo-camera installed"                = ($pkgText  -match '"expo-camera"')
  "expo-barcode-scanner installed"       = ($pkgText  -match '"expo-barcode-scanner"')
}

$allTrue = $true
foreach ($item in $checks.GetEnumerator()) {
  $status = if ($item.Value) { "TRUE" } else { "FALSE" }
  if (-not $item.Value) { $allTrue = $false }
  Write-Host ("{0,-40} {1}" -f $item.Key, $status) -ForegroundColor ($(if($item.Value){"Green"}else{"Red"}))
}

Write-Host ""
if ($allTrue) {
  Write-Host "OVERALL STATIC SCAN SMOKE: TRUE" -ForegroundColor Green
  exit 0
}

Write-Host "OVERALL STATIC SCAN SMOKE: FALSE" -ForegroundColor Red
exit 1
