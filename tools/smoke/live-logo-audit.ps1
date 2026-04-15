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

function Print-Result {
  param(
    [string]$Label,
    [bool]$Value
  )

  $status = if ($Value) { "TRUE" } else { "FALSE" }
  $color = if ($Value) { "Green" } else { "Red" }
  Write-Host ("{0,-42} {1}" -f $Label, $status) -ForegroundColor $color
}

Write-Host ""
Write-Host "=== LIVE LOGO AUDIT ===" -ForegroundColor Cyan

Print-Result "Live logo component exists" (Test-Pattern ".\src\components\branding\HealthLogicLiveLogo.tsx" 'export default function HealthLogicLiveLogo')
Print-Result "Home imports live logo" (Test-Pattern ".\src\screens\HomeScreen.tsx" 'import HealthLogicLiveLogo')
Print-Result "Home renders live logo" (Test-Pattern ".\src\screens\HomeScreen.tsx" '<HealthLogicLiveLogo')
Print-Result "Logo has glitch layers" (Test-Pattern ".\src\components\branding\HealthLogicLiveLogo.tsx" 'glitchBackCyan|glitchBackMagenta')
Print-Result "Logo has scan line" (Test-Pattern ".\src\components\branding\HealthLogicLiveLogo.tsx" 'scanLine')
Print-Result "Logo has diagnostics text" (Test-Pattern ".\src\components\branding\HealthLogicLiveLogo.tsx" 'SYSTEM DIAGNOSTICS \[ACTIVE\]')
