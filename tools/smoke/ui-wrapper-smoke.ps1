$ErrorActionPreference = "Stop"
Set-Location "D:\HealthLogic"

function Print-Result {
  param([string]$Label, [bool]$Value)
  $status = if ($Value) { "TRUE" } else { "FALSE" }
  $color = if ($Value) { "Green" } else { "Red" }
  Write-Host ("{0,-50} {1}" -f $Label, $status) -ForegroundColor $color
}

Write-Host ""
Write-Host "=== UI WRAPPER SMOKE TEST ===" -ForegroundColor Cyan

$checks = [ordered]@{
  "PrimaryButton wrapper file exists" = (Test-Path ".\src\components\PrimaryButton.tsx")
  "SecondaryButton wrapper file exists" = (Test-Path ".\src\components\SecondaryButton.tsx")
  "AppButton wrapper file exists" = (Test-Path ".\src\components\ui\AppButton.tsx")
  "AppCard wrapper file exists" = (Test-Path ".\src\components\ui\AppCard.tsx")
  "GlassCard wrapper file exists" = (Test-Path ".\src\components\GlassCard.tsx")
  "ToggleSection wrapper file exists" = (Test-Path ".\src\components\profile\ToggleSection.tsx")
  "Home screen exists" = (Test-Path ".\src\screens\HomeScreen.tsx")
  "Scan screen exists" = (Test-Path ".\src\screens\ScanScreen.tsx")
  "Result screen exists" = (Test-Path ".\src\screens\ResultScreen.tsx")
  "Profile screen exists" = (Test-Path ".\src\screens\ProfileScreen.tsx")
}

foreach ($item in $checks.GetEnumerator()) {
  Print-Result $item.Key $item.Value
}
