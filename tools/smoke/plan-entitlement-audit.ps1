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

$files = Get-ChildItem .\src -Recurse -File -Include *.ts,*.tsx

Write-Host ""
Write-Host "=== ENTITLEMENT RULE AUDIT ===" -ForegroundColor Cyan

$hasPlanTerms = [bool]($files | Select-String -Pattern 'single monthly|family monthly|single annual|family annual|yearly|monthly' -Quiet)
$hasProfileCapLogic = [bool]($files | Select-String -Pattern 'maxProfiles|maxHuman|maxPets|profileLimit|petLimit|countProfilesByType' -Quiet)
$hasPetSpecificLogic = [bool]($files | Select-String -Pattern 'pet.*limit|limit.*pet|maxPets|pet profiles|type === "pet"' -Quiet)
$hasHumanSpecificLogic = [bool]($files | Select-String -Pattern 'adult|child|you|maxProfiles|human profiles|type === "you"|type === "child"|type === "adult"' -Quiet)
$hasPlanGateHelper = [bool]($files | Select-String -Pattern 'get.*plan.*limit|get.*entitlement|getProfile.*Limit|canAddProfile|canCreateProfile|canSaveProfile' -Quiet)
$profileScreenChecksGate = Test-Pattern ".\src\screens\ProfileScreen.tsx" 'canAddProfile|canCreateProfile|profileLimit|petLimit|entitlement'
$storeChecksGate = Test-Pattern ".\src\hooks\useProfileStore.ts" 'countProfilesByType|maxProfiles|maxPets|limit'
$hubDisplaysCounts = Test-Pattern ".\src\screens\HouseholdHubScreen.tsx" 'profiles.length|Profiles'
$subscriptionHasPlanCopy = [bool]($files | Select-String -Pattern 'Single Monthly|Family Monthly|Single Annual|Family Annual' -Quiet)

Print-Result "Plan/package terms exist in code" $hasPlanTerms
Print-Result "Profile cap logic exists somewhere" $hasProfileCapLogic
Print-Result "Pet-specific cap logic exists" $hasPetSpecificLogic
Print-Result "Human-profile cap logic exists" $hasHumanSpecificLogic
Print-Result "Dedicated plan gate helper exists" $hasPlanGateHelper
Print-Result "ProfileScreen checks entitlement gate before save" $profileScreenChecksGate
Print-Result "Store contains profile counting logic" $storeChecksGate
Print-Result "HouseholdHub displays profile counts" $hubDisplaysCounts
Print-Result "Subscription screen/copy has plan names" $subscriptionHasPlanCopy

Write-Host ""
Write-Host "=== RAW ENTITLEMENT MATCHES ===" -ForegroundColor Yellow
$files |
  Select-String -Pattern 'single monthly|family monthly|single annual|family annual|maxProfiles|maxPets|profileLimit|petLimit|countProfilesByType|canAddProfile|canCreateProfile|entitlement|type === "pet"|type === "you"|type === "child"|type === "adult"' |
  Select-Object Path, LineNumber, Line |
  Sort-Object Path, LineNumber |
  Format-Table -Wrap -AutoSize
