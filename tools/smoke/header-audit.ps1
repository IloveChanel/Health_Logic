$ErrorActionPreference = "Stop"
Set-Location "D:\HealthLogic"

Write-Host ""
Write-Host "=== HEADER AUDIT ===" -ForegroundColor Cyan

$checks = [ordered]@{
  "Home uses PRODUCT INTELLIGENCE INTERFACE" = [bool](Select-String -Path ".\src\modules\home\helpers\homeScreenContent.ts" -Pattern 'PRODUCT INTELLIGENCE INTERFACE' -Quiet)
  "Home uses WELCOME TO" = [bool](Select-String -Path ".\src\modules\home\helpers\homeScreenContent.ts" -Pattern 'WELCOME TO' -Quiet)
  "Home uses HEALTHLOGIC" = [bool](Select-String -Path ".\src\modules\home\helpers\homeScreenContent.ts" -Pattern 'HEALTHLOGIC' -Quiet)
  "Home categories reordered correctly" = [bool](Select-String -Path ".\src\modules\home\helpers\homeScreenContent.ts" -Pattern '"FOOD".*"SKINCARE".*"SUPPLEMENTS".*"HAIR".*"PETS".*"ESSENTIALS"' -Quiet)
  "Welcome font is tiny" = [bool](Select-String -Path ".\src\modules\home\styles\homeScreenStyles.ts" -Pattern 'welcome:.*?fontSize:\s*9' -Quiet)
  "Household Hub header updated" = [bool](Select-String -Path ".\src\modules\household\helpers\householdHubContent.ts" -Pattern 'Your Health Command Center' -Quiet)
  "Profile screen title updated" = [bool](Select-String -Path ".\src\screens\ProfileScreen.tsx" -Pattern 'Configure your scanning profile' -Quiet)
  "Scan screen header updated" = [bool](Select-String -Path ".\src\modules\scan\helpers\scanScreenContent.ts" -Pattern 'Let the Ingredients Speak' -Quiet)
  "History header updated" = [bool](Select-String -Path ".\src\modules\library\helpers\libraryScreenContent.ts" -Pattern 'SCAN HISTORY' -Quiet)
  "Search header updated" = [bool](Select-String -Path ".\src\modules\search\helpers\searchScreenContent.ts" -Pattern 'PRODUCT LOOKUP' -Quiet)
  "Subscription header updated" = [bool](Select-String -Path ".\src\modules\subscription\helpers\subscriptionContent.ts" -Pattern 'HEALTHLOGIC ACCESS' -Quiet)
  "Mission header mapped into TrustScreen" = [bool](Select-String -Path ".\src\modules\trust\helpers\trustScreenContent.ts" -Pattern 'OUR MISSION' -Quiet)
}

foreach ($item in $checks.GetEnumerator()) {
  $status = if ($item.Value) { "TRUE" } else { "FALSE" }
  $color = if ($item.Value) { "Green" } else { "Red" }
  Write-Host ("{0,-44} {1}" -f $item.Key, $status) -ForegroundColor $color
}

Write-Host ""
Write-Host "=== NOTE ===" -ForegroundColor Yellow
Write-Host "BrandScreen and PrivacyPolicyScreen were not remapped because your uploaded master copy did not provide replacement header text for those screens."
