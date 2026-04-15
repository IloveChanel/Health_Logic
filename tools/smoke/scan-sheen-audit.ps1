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
Write-Host "=== SCAN SHEEN AUDIT ===" -ForegroundColor Cyan

Print-Result "ScanSheen component exists" (Test-Pattern ".\src\components\effects\ScanSheen.tsx" 'export default function ScanSheen')
Print-Result "ScanSheen uses animation" (Test-Pattern ".\src\components\effects\ScanSheen.tsx" 'Animated\.timing|translateX')
Print-Result "Home imports ScanSheen" (Test-Pattern ".\src\screens\HomeScreen.tsx" 'import ScanSheen')
Print-Result "Home renders ScanSheen" (Test-Pattern ".\src\screens\HomeScreen.tsx" '<ScanSheen />')
Print-Result "Sheen uses gradient beam" (Test-Pattern ".\src\components\effects\ScanSheen.tsx" 'LinearGradient')
