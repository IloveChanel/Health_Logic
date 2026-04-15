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

$results = [ordered]@{}

# App route registration
$results["Route: Home"]            = Test-Pattern ".\App.tsx" '<Stack\.Screen name="Home"'
$results["Route: Scan"]            = Test-Pattern ".\App.tsx" '<Stack\.Screen name="Scan"'
$results["Route: HouseholdHub"]    = Test-Pattern ".\App.tsx" '<Stack\.Screen name="HouseholdHub"'
$results["Route: Profile"]         = Test-Pattern ".\App.tsx" '<Stack\.Screen name="Profile"'
$results["Route: Result"]          = Test-Pattern ".\App.tsx" '<Stack\.Screen name="Result"'
$results["Route: History"]         = Test-Pattern ".\App.tsx" '<Stack\.Screen name="History"'
$results["Route: Search"]          = Test-Pattern ".\App.tsx" '<Stack\.Screen name="Search"'
$results["Route: Subscription"]    = Test-Pattern ".\App.tsx" '<Stack\.Screen name="Subscription"'
$results["Route: Trust"]           = Test-Pattern ".\App.tsx" '<Stack\.Screen name="Trust"'
$results["Route: PrivacyPolicy"]   = Test-Pattern ".\App.tsx" '<Stack\.Screen name="PrivacyPolicy"'
$results["Route: Brand"]           = Test-Pattern ".\App.tsx" '<Stack\.Screen name="Brand"'

# Home screen buttons
$results["Home CTA -> Scan"]            = Test-Pattern ".\src\screens\HomeScreen.tsx" 'navigate\("Scan"\)'
$results["Home CTA -> HouseholdHub"]    = Test-Pattern ".\src\screens\HomeScreen.tsx" 'navigate\("HouseholdHub"\)'
$results["Home renders PricingCard"]    = Test-Pattern ".\src\screens\HomeScreen.tsx" '<PricingCard'
$results["PricingCard -> Subscription"] = Test-Pattern ".\src\screens\HomeScreen.tsx" 'handleOpenSubscription'

# Scan / result
$results["Scan -> Result"]              = Test-Pattern ".\src\screens\ScanScreen.tsx" 'navigate\("Result"'
$results["BarcodeScanner route typo fixed"] = -not (Test-Pattern ".\src\components\scanner\BarcodeScanner.tsx" 'navigate\(\s*["'']Results["'']')

# Trust buttons
$results["Trust CTA -> Scan"]           = Test-Pattern ".\src\screens\TrustScreen.tsx" 'navigate\("Scan"\)'
$results["Trust CTA -> Profile"]        = Test-Pattern ".\src\screens\TrustScreen.tsx" 'navigate\("Profile"\)'

# Subscription buttons
$results["Subscription -> HouseholdHub"] = Test-Pattern ".\src\screens\SubscriptionScreen.tsx" 'navigate\("HouseholdHub"\)'
$results["Subscription -> Home"]         = Test-Pattern ".\src\screens\SubscriptionScreen.tsx" 'navigate\("Home"\)'

# Household Hub buttons
$results["HouseholdHub -> Profile"]     = Test-Pattern ".\src\screens\HouseholdHubScreen.tsx" 'navigate\("Profile"\)'
$results["HouseholdHub back wiring"]    = Test-Pattern ".\src\screens\HouseholdHubScreen.tsx" 'goBack\('

# Profile save flow
$results["Profile save -> HouseholdHub"] = Test-Pattern ".\src\screens\ProfileScreen.tsx" 'navigate\("HouseholdHub"\)'

Write-Host ""
Write-Host "=== NAVIGATION SMOKE TEST (STATIC) ===" -ForegroundColor Cyan

$allPass = $true
foreach ($item in $results.GetEnumerator()) {
  $status = if ($item.Value) { "TRUE" } else { "FALSE" }
  $color = if ($item.Value) { "Green" } else { "Red" }
  if (-not $item.Value) { $allPass = $false }

  Write-Host ("{0,-38} {1}" -f $item.Key, $status) -ForegroundColor $color
}

Write-Host ""
if ($allPass) {
  Write-Host "OVERALL: TRUE" -ForegroundColor Green
} else {
  Write-Host "OVERALL: FALSE" -ForegroundColor Red
  exit 1
}
