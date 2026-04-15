$ErrorActionPreference = "Stop"
Set-Location "D:\HealthLogic"

function Test-Pattern {
  param([string]$Path, [string]$Pattern)
  if (-not (Test-Path $Path)) { return $false }
  return [bool](Select-String -Path $Path -Pattern $Pattern -Quiet)
}

function Print-Result {
  param([string]$Label, [bool]$Value)
  $status = if ($Value) { "TRUE" } else { "FALSE" }
  $color = if ($Value) { "Green" } else { "Red" }
  Write-Host ("{0,-46} {1}" -f $Label, $status) -ForegroundColor $color
}

Write-Host ""
Write-Host "=== SURFACE WRAPPER AUDIT ===" -ForegroundColor Cyan

Print-Result "AppCard uses shared surface tokens" (Test-Pattern ".\src\components\ui\AppCard.tsx" 'UI_SURFACE_TOKENS')
Print-Result "GlassCard uses shared surface tokens" (Test-Pattern ".\src\components\GlassCard.tsx" 'UI_SURFACE_TOKENS')
Print-Result "ToggleSection uses shared surface tokens" (Test-Pattern ".\src\components\profile\ToggleSection.tsx" 'UI_SURFACE_TOKENS')

Print-Result "Surface radius normalized to token" (Test-Pattern ".\src\components\ui\surfaceTokens.ts" 'radius:\s*18')
Print-Result "Surface border normalized" (Test-Pattern ".\src\components\ui\surfaceTokens.ts" 'borderColor:\s*"rgba\(0,255,148,0\.18\)"')
Print-Result "Surface background normalized" (Test-Pattern ".\src\components\ui\surfaceTokens.ts" 'background:\s*"rgba\(16,24,21,0\.92\)"')
Print-Result "Surface padding normalized" (Test-Pattern ".\src\components\ui\surfaceTokens.ts" 'padding:\s*20')

Write-Host ""
Write-Host "=== RAW SURFACE USAGE ===" -ForegroundColor Yellow
Get-ChildItem .\src -Recurse -File -Include *.ts,*.tsx |
  Select-String -Pattern '<AppCard|<GlassCard|<ToggleSection' |
  Select-Object Path, LineNumber, Line |
  Sort-Object Path, LineNumber |
  Format-Table -Wrap -AutoSize
