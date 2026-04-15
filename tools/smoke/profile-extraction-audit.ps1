$ErrorActionPreference = "Stop"
Set-Location "D:\HealthLogic"

function Print-Result {
  param([string]$Label, [bool]$Value)
  $status = if ($Value) { "TRUE" } else { "FALSE" }
  $color = if ($Value) { "Green" } else { "Red" }
  Write-Host ("{0,-60} {1}" -f $Label, $status) -ForegroundColor $color
}
function Test-Pattern {
  param([string]$Path, [string]$Pattern)
  if (-not (Test-Path $Path)) { return $false }
  return [bool](Select-String -Path $Path -Pattern $Pattern -Quiet)
}

Write-Host ""
Write-Host "=== PROFILE EXTRACTION AUDIT ===" -ForegroundColor Cyan

Print-Result "ProfileSectionCard exists" (Test-Path ".\src\modules\profile\components\ProfileSectionCard.tsx")
Print-Result "ProfileInputRow exists" (Test-Path ".\src\modules\profile\components\ProfileInputRow.tsx")
Print-Result "ProfileChipField exists" (Test-Path ".\src\modules\profile\components\ProfileChipField.tsx")
Print-Result "ProfileScreen imports extracted wrappers" (Test-Pattern ".\src\screens\ProfileScreen.tsx" 'ProfileSectionCard|ProfileInputRow|ProfileChipField')
Print-Result "ProfileScreen uses route mode create/edit" (Test-Pattern ".\src\screens\ProfileScreen.tsx" 'route\?\.params\?\.mode')
Print-Result "ProfileScreen save uses explicit create null rule" (Test-Pattern ".\src\screens\ProfileScreen.tsx" 'activeProfileId: route\?\.params\?\.mode === "create" \? null : routeProfileId')
Print-Result "HouseholdHub edit sends profileId" (Test-Pattern ".\src\screens\HouseholdHubScreen.tsx" 'navigate\("Profile", \{ mode: "edit", profileId \}\)')
