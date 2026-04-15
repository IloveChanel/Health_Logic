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

  $color = if ($Value) { "Green" } else { "Red" }
  $status = if ($Value) { "TRUE" } else { "FALSE" }
  Write-Host ("{0,-48} {1}" -f $Label, $status) -ForegroundColor $color
}

Write-Host ""
Write-Host "=== BOX CONSISTENCY AUDIT ===" -ForegroundColor Cyan

$appCardPath = ".\src\components\ui\AppCard.tsx"
$glassCardPath = ".\src\components\GlassCard.tsx"
$pricingCardPath = ".\src\components\PricingCard.tsx"
$toggleSectionPath = ".\src\components\profile\ToggleSection.tsx"
$homeStylesPath = ".\src\modules\home\styles\homeScreenStyles.ts"

$appCardDark = Test-Pattern $appCardPath 'borderRadius:\s*18'
$glassCardDark = Test-Pattern $glassCardPath 'borderRadius:\s*18'
$pricingCardDark = Test-Pattern $pricingCardPath 'borderRadius:\s*18'
$toggleSectionDark = Test-Pattern $toggleSectionPath 'borderRadius:\s*18'
$homeChipMinWidth = Test-Pattern $homeStylesPath 'minWidth:\s*110'
$homeChipHeight = Test-Pattern $homeStylesPath 'height:\s*42'
$pricingAtBottom = Test-Pattern ".\src\screens\HomeScreen.tsx" '<PricingCard'
$subscriptionsBelowMain = Test-Pattern ".\src\screens\HomeScreen.tsx" '</View>\s*<PricingCard'

Print-Result "AppCard uses shared radius 18" $appCardDark
Print-Result "GlassCard uses shared radius 18" $glassCardDark
Print-Result "PricingCard uses shared radius 18" $pricingCardDark
Print-Result "ToggleSection uses shared radius 18" $toggleSectionDark
Print-Result "Home category chips use minWidth 110" $homeChipMinWidth
Print-Result "Home category chips use fixed height 42" $homeChipHeight
Print-Result "Home renders subscriptions card" $pricingAtBottom
Print-Result "Subscriptions sit below the main hero" $subscriptionsBelowMain

Write-Host ""
Write-Host "=== RAW CARD STYLE MATCHES ===" -ForegroundColor Yellow
Get-ChildItem .\src -Recurse -File -Include *.ts,*.tsx |
  Select-String -Pattern 'borderRadius:\s*18|backgroundColor:\s*"rgba\(16,24,21,0\.92\)"|minWidth:\s*110|height:\s*42' |
  Select-Object Path, LineNumber, Line |
  Sort-Object Path, LineNumber |
  Format-Table -Wrap -AutoSize
