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
  Write-Host ("{0,-40} {1}" -f $Label, $status) -ForegroundColor $color
}

Write-Host ""
Write-Host "=== DATA STREAM AUDIT ===" -ForegroundColor Cyan

Print-Result "DataStreamOverlay exists" (Test-Pattern ".\src\components\effects\DataStreamOverlay.tsx" 'export default function DataStreamOverlay')
Print-Result "ScanScreen imports overlay" (Test-Pattern ".\src\screens\ScanScreen.tsx" 'import DataStreamOverlay')
Print-Result "ScanScreen triggers overlay" (Test-Pattern ".\src\screens\ScanScreen.tsx" 'analyzing')
Print-Result "Overlay rendered in ScanScreen" (Test-Pattern ".\src\screens\ScanScreen.tsx" '<DataStreamOverlay')
