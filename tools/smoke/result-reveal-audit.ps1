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
Write-Host "=== RESULT REVEAL AUDIT ===" -ForegroundColor Cyan

Print-Result "ResultReveal component exists" (Test-Pattern ".\src\components\effects\ResultReveal.tsx" 'export default function ResultReveal')
Print-Result "ResultScreen imports reveal" (Test-Pattern ".\src\screens\ResultScreen.tsx" 'import ResultReveal')
Print-Result "Reveal wraps GlassCard" (Test-Pattern ".\src\screens\ResultScreen.tsx" '<ResultReveal>')
