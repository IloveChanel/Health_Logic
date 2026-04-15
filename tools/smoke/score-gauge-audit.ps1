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
Write-Host "=== SCORE GAUGE AUDIT ===" -ForegroundColor Cyan

Print-Result "ScoreGauge component exists" (Test-Pattern ".\src\components\ui\ScoreGauge.tsx" 'export default function ScoreGauge')
Print-Result "ResultScreen imports gauge" (Test-Pattern ".\src\screens\ResultScreen.tsx" 'ScoreGauge')
Print-Result "ResultScreen renders gauge" (Test-Pattern ".\src\screens\ResultScreen.tsx" '<ScoreGauge')
