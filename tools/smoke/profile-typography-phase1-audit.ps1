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
Write-Host "=== PROFILE + TYPOGRAPHY PHASE 1 AUDIT ===" -ForegroundColor Cyan

Print-Result "tsconfig excludes audit/**/*" (Test-Pattern ".\tsconfig.json" 'audit/\*\*/\*')
Print-Result "ProfileScreen has create-mode flag" (Test-Pattern ".\src\screens\ProfileScreen.tsx" 'const isCreateMode = route\?\.params\?\.mode === "create";')
Print-Result "ProfileScreen nulls activeProfileId in create mode" (Test-Pattern ".\src\screens\ProfileScreen.tsx" 'activeProfileId: isCreateMode \? null : \(activeProfile\?\.id \?\? null\)')
Print-Result "HouseholdHub create routes with mode=create" (Test-Pattern ".\src\screens\HouseholdHubScreen.tsx" 'navigate\("Profile", \{ mode: "create" \}\)')
Print-Result "HouseholdHub edit routes with mode=edit" (Test-Pattern ".\src\screens\HouseholdHubScreen.tsx" 'navigate\("Profile", \{ mode: "edit" \}\)')
Print-Result "AppTopBar uses typography tokens" (Test-Pattern ".\src\components\AppTopBar.tsx" 'typography\.')
Print-Result "AppHeaderBlock uses typography tokens" (Test-Pattern ".\src\components\layout\AppHeaderBlock.tsx" 'typography\.')
Print-Result "ScoreGauge uses typography tokens" (Test-Pattern ".\src\components\ui\ScoreGauge.tsx" 'typography\.')
