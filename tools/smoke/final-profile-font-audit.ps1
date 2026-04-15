$ErrorActionPreference = "Stop"
Set-Location "D:\HealthLogic"

function Print-Result {
  param([string]$Label, [bool]$Value)
  $status = if ($Value) { "TRUE" } else { "FALSE" }
  $color = if ($Value) { "Green" } else { "Red" }
  Write-Host ("{0,-62} {1}" -f $Label, $status) -ForegroundColor $color
}
function Test-Pattern {
  param([string]$Path, [string]$Pattern)
  if (-not (Test-Path $Path)) { return $false }
  return [bool](Select-String -Path $Path -Pattern $Pattern -Quiet)
}

Write-Host ""
Write-Host "=== FINAL PROFILE / FONT AUDIT ===" -ForegroundColor Cyan

Print-Result "Typography has label token" (Test-Pattern ".\src\theme\typography.ts" 'label:\s*\{')
Print-Result "AppTopBar uses typography tokens" (Test-Pattern ".\src\components\AppTopBar.tsx" 'typography\.')
Print-Result "AppHeaderBlock uses typography tokens" (Test-Pattern ".\src\components\layout\AppHeaderBlock.tsx" 'typography\.')
Print-Result "PrimaryButton uses typography tokens" (Test-Pattern ".\src\components\PrimaryButton.tsx" 'typography\.')
Print-Result "SecondaryButton uses typography tokens" (Test-Pattern ".\src\components\SecondaryButton.tsx" 'typography\.')
Print-Result "AppButton uses typography tokens" (Test-Pattern ".\src\components\ui\AppButton.tsx" 'typography\.')
Print-Result "ScoreGauge uses typography tokens" (Test-Pattern ".\src\components\ui\ScoreGauge.tsx" 'typography\.')

Print-Result "ProfileSectionCard exists" (Test-Path ".\src\modules\profile\components\ProfileSectionCard.tsx")
Print-Result "ProfileInputRow exists" (Test-Path ".\src\modules\profile\components\ProfileInputRow.tsx")
Print-Result "ProfileChipField exists" (Test-Path ".\src\modules\profile\components\ProfileChipField.tsx")
Print-Result "SavedProfileCard exists" (Test-Path ".\src\modules\profile\components\SavedProfileCard.tsx")

Print-Result "HouseholdHub uses SavedProfileCard" (Test-Pattern ".\src\screens\HouseholdHubScreen.tsx" 'SavedProfileCard')
Print-Result "HouseholdHub create routes with mode=create" (Test-Pattern ".\src\screens\HouseholdHubScreen.tsx" 'navigate\("Profile", \{ mode: "create" \}\)')
Print-Result "HouseholdHub edit routes with mode=edit and profileId" (Test-Pattern ".\src\screens\HouseholdHubScreen.tsx" 'navigate\("Profile", \{ mode: "edit", profileId \}\)')

Print-Result "ProfileScreen uses route mode as source of truth" (Test-Pattern ".\src\screens\ProfileScreen.tsx" 'route\?\.params\?\.mode')
Print-Result "ProfileScreen save forces null id in create mode" (Test-Pattern ".\src\screens\ProfileScreen.tsx" 'activeProfileId: route\?\.params\?\.mode === ''create'' \? null : routeProfileId')
Print-Result "ProfileScreen duplicate guard exists" (Test-Pattern ".\src\screens\ProfileScreen.tsx" 'duplicateProfile')
