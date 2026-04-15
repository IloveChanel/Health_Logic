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
Write-Host "=== BUTTON WRAPPER AUDIT ===" -ForegroundColor Cyan

Print-Result "PrimaryButton uses shared button tokens" (Test-Pattern ".\src\components\PrimaryButton.tsx" 'UI_BUTTON_TOKENS')
Print-Result "SecondaryButton uses shared button tokens" (Test-Pattern ".\src\components\SecondaryButton.tsx" 'UI_BUTTON_TOKENS')
Print-Result "AppButton uses shared button tokens" (Test-Pattern ".\src\components\ui\AppButton.tsx" 'UI_BUTTON_TOKENS')

Print-Result "Button height normalized to token" (Test-Pattern ".\src\components\ui\buttonTokens.ts" 'height:\s*60')
Print-Result "Button radius normalized to token" (Test-Pattern ".\src\components\ui\buttonTokens.ts" 'radius:\s*14')
Print-Result "Primary button bg normalized" (Test-Pattern ".\src\components\ui\buttonTokens.ts" 'primaryBg:\s*"#12E381"')
Print-Result "Secondary button border normalized" (Test-Pattern ".\src\components\ui\buttonTokens.ts" 'secondaryBorder:\s*"#00FF94"')

Write-Host ""
Write-Host "=== RAW BUTTON USAGE ===" -ForegroundColor Yellow
Get-ChildItem .\src -Recurse -File -Include *.ts,*.tsx |
  Select-String -Pattern '<PrimaryButton|<SecondaryButton|<AppPrimaryButton|<AppSecondaryButton' |
  Select-Object Path, LineNumber, Line |
  Sort-Object Path, LineNumber |
  Format-Table -Wrap -AutoSize
