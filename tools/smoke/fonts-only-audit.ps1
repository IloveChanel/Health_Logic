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
Write-Host "=== FONT CONSISTENCY AUDIT ===" -ForegroundColor Cyan

Print-Result "Typography token file exists" (Test-Path ".\src\theme\typography.ts")
Print-Result "Typography has label token" (Test-Pattern ".\src\theme\typography.ts" 'label:\s*\{')
Print-Result "AppTopBar uses typography tokens" (Test-Pattern ".\src\components\AppTopBar.tsx" 'typography\.')
Print-Result "AppHeaderBlock uses typography tokens" (Test-Pattern ".\src\components\layout\AppHeaderBlock.tsx" 'typography\.')
Print-Result "PrimaryButton uses typography tokens" (Test-Pattern ".\src\components\PrimaryButton.tsx" 'typography\.')
Print-Result "SecondaryButton uses typography tokens" (Test-Pattern ".\src\components\SecondaryButton.tsx" 'typography\.')
Print-Result "AppButton uses typography tokens" (Test-Pattern ".\src\components\ui\AppButton.tsx" 'typography\.')
Print-Result "ScoreGauge uses typography tokens" (Test-Pattern ".\src\components\ui\ScoreGauge.tsx" 'typography\.')

Write-Host ""
Write-Host "=== TOP INLINE FONT HOTSPOTS ===" -ForegroundColor Yellow
Get-ChildItem .\src -Recurse -File -Include *.ts,*.tsx |
  Select-String -Pattern 'fontFamily\s*:|fontSize\s*:|fontWeight\s*:' |
  Select-Object Path, LineNumber, Line |
  Sort-Object Path, LineNumber |
  Format-Table -Wrap -AutoSize
