$ErrorActionPreference = "Stop"
Set-Location "D:\HealthLogic"

Write-Host "`n=== AI / LIBRARY / OTHER FIELD SMOKE ===" -ForegroundColor Cyan

function ReadText($path) {
  if (Test-Path $path) { return (Get-Content -Raw $path) }
  return ""
}

$scanScreen      = ReadText ".\src\screens\ScanScreen.tsx"
$resultScreen    = ReadText ".\src\screens\ResultScreen.tsx"
$profileScreen   = ReadText ".\src\screens\ProfileScreen.tsx"
$apiFile         = ReadText ".\src\api.ts"
$pkgFile         = ReadText ".\package.json"

$engineFiles = Get-ChildItem ".\src\engine" -Recurse -Include *.ts,*.tsx -ErrorAction SilentlyContinue
$engineText = ""
foreach ($f in $engineFiles) {
  $engineText += "`n" + (Get-Content -Raw $f.FullName)
}

$checks = [ordered]@{
  "Scan screen exists"                              = (Test-Path ".\src\screens\ScanScreen.tsx")
  "Result screen exists"                            = (Test-Path ".\src\screens\ResultScreen.tsx")
  "Profile screen exists"                           = (Test-Path ".\src\screens\ProfileScreen.tsx")

  "Scan imports scanBarcode"                        = ($scanScreen -match 'scanBarcode')
  "Scan goes to Result"                             = ($scanScreen -match 'navigate\("Result"')
  "Result reads route analysis"                     = ($resultScreen -match 'route\?\.params\?\.analysis|route\.params\.analysis')

  "Engine folder exists"                            = (Test-Path ".\src\engine")
  "Product analyzer present"                        = ($engineText -match 'analyzeProduct|productAnalyzer')
  "Scoring engine present"                          = ($engineText -match 'scoringEngine|productScoreEngine')
  "Ingredient parser/normalizer present"            = ($engineText -match 'ingredientParser|ingredientNormalizer|ingredientKnowledge')
  "OpenFood/OpenBeauty client present"              = ($engineText -match 'openFoodFactsClient|openBeautyFactsClient')

  "AI key present in env or package flow"           = ((Test-Path ".\.env") -or ($pkgFile -match 'openai'))
  "API file exists"                                 = (Test-Path ".\src\api.ts")
  "API has custom profile submit path"              = ($apiFile -match 'submitCustomProfileOption')
  "Profile has renderOther"                         = ($profileScreen -match 'renderOther')
  "Profile has addSectionOther"                     = ($profileScreen -match 'addSectionOther')
  "Other field calls backend submit"                = ($profileScreen -match 'submitCustomProfileOption')
  "Other field updates local state"                 = ($profileScreen -match 'setOtherEntries')
  "Other field renders saved chips immediately"     = ($profileScreen -match 'otherEntries\[section\].*map|otherEntries\[section\] \?\? \[\]\)\.map')
  "Profile save uses profilePatch"                  = ($profileScreen -match 'buildProfileSaveInput')
  "Split ingredient text helper used"               = ($profileScreen -match 'splitIngredientText')

  "Search screen exists"                            = (Test-Path ".\src\screens\SearchScreen.tsx")
  "History screen exists"                           = (Test-Path ".\src\screens\HistoryScreen.tsx")
}

$allTrue = $true
foreach ($item in $checks.GetEnumerator()) {
  $status = if ($item.Value) { "TRUE" } else { "FALSE" }
  if (-not $item.Value) { $allTrue = $false }
  $color = if ($item.Value) { "Green" } else { "Red" }
  Write-Host ("{0,-48} {1}" -f $item.Key, $status) -ForegroundColor $color
}

Write-Host ""
if ($allTrue) {
  Write-Host "OVERALL STATIC AI/LIBRARY/OTHER SMOKE: TRUE" -ForegroundColor Green
  exit 0
}

Write-Host "OVERALL STATIC AI/LIBRARY/OTHER SMOKE: FALSE" -ForegroundColor Red
exit 1
