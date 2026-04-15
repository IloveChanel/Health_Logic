$ErrorActionPreference = "Stop"
Set-Location "D:\HealthLogic"

function Print-Result {
  param([string]$Label, [bool]$Value)
  $status = if ($Value) { "TRUE" } else { "FALSE" }
  $color = if ($Value) { "Green" } else { "Red" }
  Write-Host ("{0,-60} {1}" -f $Label, $status) -ForegroundColor $color
}
function Test-Pattern {
  param([string]$Path, [string]$Pattern)
  if (-not (Test-Path $Path)) { return $false }
  return [bool](Select-String -Path $Path -Pattern $Pattern -Quiet)
}

Write-Host ""
Write-Host "=== REPAIR AUDIT ===" -ForegroundColor Cyan

Print-Result "tsconfig excludes backup folders" (Test-Pattern ".\tsconfig.json" '_repair_backup_')
Print-Result "tsconfig excludes audit folder" (Test-Pattern ".\tsconfig.json" '"audit"')
Print-Result "Profile route typed with mode create/edit" (Test-Pattern ".\App.tsx" 'Profile: \{ mode\?: "create" \| "edit" \} \| undefined;')
Print-Result "HouseholdHub create navigates with mode=create" (Test-Pattern ".\src\screens\HouseholdHubScreen.tsx" 'navigate\("Profile", \{ mode: "create" \}\)')
Print-Result "HouseholdHub edit navigates with mode=edit" (Test-Pattern ".\src\screens\HouseholdHubScreen.tsx" 'navigate\("Profile", \{ mode: "edit" \}\)')
Print-Result "ProfileScreen has create-mode flag" (Test-Pattern ".\src\screens\ProfileScreen.tsx" 'const isCreateMode = route\?\.params\?\.mode === "create";')
Print-Result "ProfileScreen nulls id in create mode" (Test-Pattern ".\src\screens\ProfileScreen.tsx" 'activeProfileId: isEditingExistingProfile \? \(activeProfile\?\.id \?\? null\) : null')
Print-Result "Legacy BarcodeScanner no longer imports expo-barcode-scanner" (-not (Test-Pattern ".\src\components\scanner\BarcodeScanner.tsx" 'expo-barcode-scanner'))
Print-Result "BarcodeCameraScreen uses expo-camera namespace import" (Test-Pattern ".\src\screens\BarcodeCameraScreen.tsx" 'import \* as ExpoCamera from "expo-camera"')
