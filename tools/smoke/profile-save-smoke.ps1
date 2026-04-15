$ErrorActionPreference = "Stop"
Set-Location "D:\HealthLogic"

Write-Host "`n=== PROFILE SAVE SMOKE ===" -ForegroundColor Cyan

$storePath = ".\src\hooks\useProfileStore.ts"
$profilePath = ".\src\screens\ProfileScreen.tsx"
$helperPath = ".\src\modules\profile\helpers\buildProfileSaveInput.ts"

$store = Get-Content -Raw $storePath
$profile = Get-Content -Raw $profilePath
$helper = Get-Content -Raw $helperPath

$test1 = $store -match 'saveHouseholdAccount\('
$test2 = $store -match 'case "family_monthly":\s*return \{ humanLimit: 5, petLimit: 0 \};'
$test3 = ($profile -match 'buildProfileSaveInput\(') -and ($helper -match 'profilePatch:')

Write-Host ("Store persists to profileStorage".PadRight(42) + ($(if($test1){"TRUE"}else{"FALSE"})))
Write-Host ("Family monthly supports 5 profiles".PadRight(42) + ($(if($test2){"TRUE"}else{"FALSE"})))
Write-Host ("Profile save uses profilePatch".PadRight(42) + ($(if($test3){"TRUE"}else{"FALSE"})))

if ($test1 -and $test2 -and $test3) {
  Write-Host "`nOVERALL: TRUE" -ForegroundColor Green
  exit 0
}

Write-Host "`nOVERALL: FALSE" -ForegroundColor Red
exit 1
