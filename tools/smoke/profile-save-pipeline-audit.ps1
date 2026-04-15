$ErrorActionPreference = "Stop"
Set-Location "D:\HealthLogic"

function Print-Result {
  param([string]$Label, [bool]$Value)
  $status = if ($Value) { "TRUE" } else { "FALSE" }
  $color = if ($Value) { "Green" } else { "Red" }
  Write-Host ("{0,-56} {1}" -f $Label, $status) -ForegroundColor $color
}

function Test-Pattern {
  param([string]$Path, [string]$Pattern)
  if (-not (Test-Path $Path)) { return $false }
  return [bool](Select-String -Path $Path -Pattern $Pattern -Quiet)
}

Write-Host ""
Write-Host "=== PROFILE SAVE PIPELINE AUDIT ===" -ForegroundColor Cyan

# broad search across store/hook files
$storeFiles = Get-ChildItem .\src -Recurse -File -Include *profile*store*.ts,*profile*store*.tsx,*useProfileStore*.ts,*useProfileStore*.tsx,*profile*.ts,*profile*.tsx

$hasSaveFn = [bool]($storeFiles | Select-String -Pattern 'saveOrUpdateProfile' -Quiet)
$hasProfilesArray = [bool]($storeFiles | Select-String -Pattern 'profiles' -Quiet)
$hasPush = [bool]($storeFiles | Select-String -Pattern '\.push\(' -Quiet)
$hasMapReplace = [bool]($storeFiles | Select-String -Pattern '\.map\(' -Quiet)
$hasFilter = [bool]($storeFiles | Select-String -Pattern '\.filter\(' -Quiet)
$hasFindExisting = [bool]($storeFiles | Select-String -Pattern 'find\(|findIndex\(' -Quiet)
$hasIdGen = [bool]($storeFiles | Select-String -Pattern 'crypto\.randomUUID|randomUUID|Date\.now|Math\.random|uuid' -Quiet)
$profileScreenUsesSave = Test-Pattern ".\src\screens\ProfileScreen.tsx" 'saveOrUpdateProfile'
$profileScreenUsesPatch = Test-Pattern ".\src\screens\ProfileScreen.tsx" 'const result = saveOrUpdateProfile'
$profileScreenReadsAccount = Test-Pattern ".\src\screens\ProfileScreen.tsx" 'const \{ account, activeProfile, saveOrUpdateProfile \} = useProfileStore\(\);'

Print-Result "Store has saveOrUpdateProfile" $hasSaveFn
Print-Result "Store references profiles array" $hasProfilesArray
Print-Result "Store uses find/findIndex existing profile lookup" $hasFindExisting
Print-Result "Store uses .map somewhere (possible replace path)" $hasMapReplace
Print-Result "Store uses .push somewhere (possible append path)" $hasPush
Print-Result "Store uses .filter somewhere (possible delete path)" $hasFilter
Print-Result "Store has ID generation path" $hasIdGen
Print-Result "ProfileScreen calls saveOrUpdateProfile" $profileScreenUsesSave
Print-Result "ProfileScreen saves via profile patch object" $profileScreenUsesPatch
Print-Result "ProfileScreen reads account from store" $profileScreenReadsAccount

Write-Host ""
Write-Host "=== RAW PROFILE SAVE MATCHES ===" -ForegroundColor Yellow
$storeFiles |
  Select-String -Pattern 'saveOrUpdateProfile|profiles|findIndex|find\(|map\(|push\(|filter\(|randomUUID|Date\.now|uuid|activeProfile|setActiveProfileId' |
  Select-Object Path, LineNumber, Line |
  Sort-Object Path, LineNumber |
  Format-Table -Wrap -AutoSize
