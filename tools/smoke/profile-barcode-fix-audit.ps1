$ErrorActionPreference = "Stop"
Set-Location "D:\HealthLogic"

function Print-Result {
  param([string]$Label, [bool]$Value)
  $status = if ($Value) { "TRUE" } else { "FALSE" }
  $color = if ($Value) { "Green" } else { "Red" }
  Write-Host ("{0,-58} {1}" -f $Label, $status) -ForegroundColor $color
}

function Test-Pattern {
  param([string]$Path, [string]$Pattern)
  if (-not (Test-Path $Path)) { return $false }
  return [bool](Select-String -Path $Path -Pattern $Pattern -Quiet)
}

Write-Host ""
Write-Host "=== PROFILE + BARCODE FIX AUDIT ===" -ForegroundColor Cyan

Print-Result "ProfileScreen reads account from store" (Test-Pattern ".\src\screens\ProfileScreen.tsx" 'const \{ account, activeProfile, saveOrUpdateProfile \} = useProfileStore\(\);')
Print-Result "ProfileScreen has duplicate guard" (Test-Pattern ".\src\screens\ProfileScreen.tsx" 'duplicateProfile')
Print-Result "ProfileScreen create mode nulls activeProfileId" (Test-Pattern ".\src\screens\ProfileScreen.tsx" 'activeProfileId: isEditingExistingProfile \? \(activeProfile\?\.id \?\? null\) : null')

Print-Result "BarcodeCameraScreen exists" (Test-Pattern ".\src\screens\BarcodeCameraScreen.tsx" 'export default function BarcodeCameraScreen')
Print-Result "BarcodeCameraScreen uses CameraView" (Test-Pattern ".\src\screens\BarcodeCameraScreen.tsx" 'CameraView')
Print-Result "BarcodeCameraScreen uses onBarcodeScanned" (Test-Pattern ".\src\screens\BarcodeCameraScreen.tsx" 'onBarcodeScanned')
Print-Result "ScanScreen routes to BarcodeCamera" (Test-Pattern ".\src\screens\ScanScreen.tsx" 'navigate\("BarcodeCamera"\)')
Print-Result "App registers BarcodeCamera route" (Test-Pattern ".\App.tsx" '<Stack\.Screen name="BarcodeCamera"')
