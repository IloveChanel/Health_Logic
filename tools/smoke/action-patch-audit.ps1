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
Write-Host "=== ACTION PATCH AUDIT ===" -ForegroundColor Cyan

Print-Result "SystemTelemetry exists" (Test-Pattern ".\src\components\branding\SystemTelemetry.tsx" 'export default function SystemTelemetry')
Print-Result "Home imports telemetry" (Test-Pattern ".\src\screens\HomeScreen.tsx" 'import SystemTelemetry')
Print-Result "Home renders telemetry" (Test-Pattern ".\src\screens\HomeScreen.tsx" '<SystemTelemetry')
Print-Result "ScanHudOverlay exists" (Test-Pattern ".\src\components\branding\ScanHudOverlay.tsx" 'export default function ScanHudOverlay')
Print-Result "Scan imports HUD overlay" (Test-Pattern ".\src\screens\ScanScreen.tsx" 'import ScanHudOverlay')
Print-Result "Scan renders HUD overlay" (Test-Pattern ".\src\screens\ScanScreen.tsx" '<ScanHudOverlay')
Print-Result "Scan status lines exist" (Test-Pattern ".\src\modules\scan\helpers\scanStatusContent.ts" 'Decoding ingredient data')
