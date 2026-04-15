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
  Write-Host ("{0,-44} {1}" -f $Label, $status) -ForegroundColor $color
}

Write-Host ""
Write-Host "=== NEURAL GLOW AUDIT ===" -ForegroundColor Cyan

$effectExists = Test-Pattern ".\src\components\effects\NeuralGlowField.tsx" 'export default function NeuralGlowField'
$shellImportsEffect = Test-Pattern ".\src\components\layout\AppScreenShell.tsx" 'import NeuralGlowField'
$shellMountsEffect = Test-Pattern ".\src\components\layout\AppScreenShell.tsx" '<NeuralGlowField />'
$effectHasGrid = Test-Pattern ".\src\components\effects\NeuralGlowField.tsx" 'gridLineVertical|gridLineHorizontal'
$effectHasScan = Test-Pattern ".\src\components\effects\NeuralGlowField.tsx" 'scanLineWrap|translateY'
$effectHasGlow = Test-Pattern ".\src\components\effects\NeuralGlowField.tsx" 'centerGlow|outerGlow'

Print-Result "NeuralGlowField component exists" $effectExists
Print-Result "AppScreenShell imports NeuralGlowField" $shellImportsEffect
Print-Result "AppScreenShell mounts NeuralGlowField" $shellMountsEffect
Print-Result "Effect contains matrix grid" $effectHasGrid
Print-Result "Effect contains scan beam" $effectHasScan
Print-Result "Effect contains glow layers" $effectHasGlow
