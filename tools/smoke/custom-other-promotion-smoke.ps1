$ErrorActionPreference = "Stop"
Set-Location "D:\HealthLogic"

Write-Host "`n=== CUSTOM OTHER PROMOTION SMOKE ===" -ForegroundColor Cyan

$profile = Get-Content -Raw ".\src\screens\ProfileScreen.tsx"
$helper  = Get-Content -Raw ".\src\modules\profile\helpers\customProfileOptions.ts"

$checks = [ordered]@{
  "Custom option helper exists"                  = (Test-Path ".\src\modules\profile\helpers\customProfileOptions.ts")
  "Profile loads custom options on mount"        = ($profile -match 'loadCustomProfileOptions\(\)')
  "Profile saves custom options locally"         = ($profile -match 'saveCustomProfileOption\(')
  "Profile merges custom options into buttons"   = ($profile -match 'mergeCustomOptions\(')
  "Helper stores via AsyncStorage"               = ($helper -match 'AsyncStorage\.setItem')
  "Helper reads via AsyncStorage"                = ($helper -match 'AsyncStorage\.getItem')
}

$allTrue = $true
foreach ($item in $checks.GetEnumerator()) {
  $status = if ($item.Value) { "TRUE" } else { "FALSE" }
  if (-not $item.Value) { $allTrue = $false }
  Write-Host ("{0,-42} {1}" -f $item.Key, $status) -ForegroundColor ($(if($item.Value){"Green"}else{"Red"}))
}

Write-Host ""
if ($allTrue) {
  Write-Host "OVERALL CUSTOM OTHER PROMOTION SMOKE: TRUE" -ForegroundColor Green
  exit 0
}

Write-Host "OVERALL CUSTOM OTHER PROMOTION SMOKE: FALSE" -ForegroundColor Red
exit 1
