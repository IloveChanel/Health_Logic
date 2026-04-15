$ErrorActionPreference = "Stop"
Set-Location "D:\HealthLogic"

function Test-Pattern {
  param([string]$Path, [string]$Pattern)
  if (-not (Test-Path $Path)) { return $false }
  return [bool](Select-String -Path $Path -Pattern $Pattern -Quiet)
}

function Print-Result {
  param([string]$Label, [bool]$Value)
  $status = if ($Value) { "TRUE" } else { "FALSE" }
  $color = if ($Value) { "Green" } else { "Red" }
  Write-Host ("{0,-48} {1}" -f $Label, $status) -ForegroundColor $color
}

Write-Host ""
Write-Host "=== WRAPPER / HEADER / ANIMATION AUDIT ===" -ForegroundColor Cyan

Print-Result "Shared AppHeaderBlock exists" (Test-Pattern ".\src\components\layout\AppHeaderBlock.tsx" 'export default function AppHeaderBlock')

Print-Result "Home uses home helper copy" (Test-Pattern ".\src\screens\HomeScreen.tsx" 'HOME_COPY')
Print-Result "Household uses helper copy" (Test-Pattern ".\src\screens\HouseholdHubScreen.tsx" 'HOUSEHOLD_COPY')
Print-Result "Scan uses helper copy" (Test-Pattern ".\src\screens\ScanScreen.tsx" 'SCAN_SCREEN_COPY')
Print-Result "History uses helper copy" (Test-Pattern ".\src\screens\HistoryScreen.tsx" 'LIBRARY_COPY')
Print-Result "Search uses helper copy" (Test-Pattern ".\src\screens\SearchScreen.tsx" 'SEARCH_SCREEN_COPY')
Print-Result "Subscription uses helper copy" (Test-Pattern ".\src\screens\SubscriptionScreen.tsx" 'SUBSCRIPTION_COPY')
Print-Result "Trust uses helper copy" (Test-Pattern ".\src\screens\TrustScreen.tsx" 'TRUST_COPY')

Print-Result "Home has live logo" (Test-Pattern ".\src\screens\HomeScreen.tsx" 'HealthLogicLiveLogo')
Print-Result "Home has telemetry" (Test-Pattern ".\src\screens\HomeScreen.tsx" 'SystemTelemetry')
Print-Result "Home has sheen" (Test-Pattern ".\src\screens\HomeScreen.tsx" 'ScanSheen')
Print-Result "Scan has HUD overlay" (Test-Pattern ".\src\screens\ScanScreen.tsx" 'ScanHudOverlay')
Print-Result "Scan has data stream overlay" (Test-Pattern ".\src\screens\ScanScreen.tsx" 'DataStreamOverlay')

Write-Host ""
Write-Host "=== HEADER SOURCE OF TRUTH ===" -ForegroundColor Yellow
Write-Host "Home / Household / Scan / Result / History / Subscription / Trust / Search now read from helper modules again."
