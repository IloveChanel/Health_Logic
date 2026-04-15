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
  Write-Host ("{0,-52} {1}" -f $Label, ($(if ($Value) { "TRUE" } else { "FALSE" }))) -ForegroundColor $color
}

Write-Host ""
Write-Host "=== 1) FONT CONSISTENCY AUDIT ===" -ForegroundColor Yellow

$fontTargets = Get-ChildItem .\src -Recurse -File -Include *.ts,*.tsx

# Detect likely font inconsistency markers
$usesMonospace = $fontTargets | Select-String -Pattern 'fontFamily\s*:\s*.*monospace|fontFamily\s*:\s*.*Menlo|fontFamily\s*:\s*.*Courier' -Quiet
$usesSystemTypography = $fontTargets | Select-String -Pattern 'typography\.' -Quiet
$hasInlineLargeFontOverrides = $fontTargets | Select-String -Pattern 'fontSize\s*:\s*(3[0-9]|4[0-9]|5[0-9])' -Quiet

Print-Result "App uses at least some monospace / technical fonts" ([bool]$usesMonospace)
Print-Result "App uses shared typography tokens somewhere" ([bool]$usesSystemTypography)
Print-Result "App still has large inline font overrides" ([bool]$hasInlineLargeFontOverrides)

Write-Host ""
Write-Host "=== 2) OLD LIGHT THEME LEFTOVERS ===" -ForegroundColor Yellow

$hasOldLightColors = $fontTargets | Select-String -Pattern '"#F7FBF8"|"#EDF6F1"|"#F8FBFA"|"#EAF1ED"|backgroundColor:\s*"white"' -Quiet
$hasOldProfileTitle = $fontTargets | Select-String -Pattern 'Build a smarter personal filter|Use toggles to open only the sections you need' -Quiet

Print-Result "Old light colors still present somewhere" ([bool]$hasOldLightColors)
Print-Result "Old hated profile title still present somewhere" ([bool]$hasOldProfileTitle)

Write-Host ""
Write-Host "=== 3) MATRIX / HUD FEATURE PRESENCE ===" -ForegroundColor Yellow

$homePath = ".\src\screens\HomeScreen.tsx"
$scanPath = ".\src\screens\ScanScreen.tsx"

$hasGridOverlay = Test-Pattern $homePath 'grid|Grid|gridOverlay|gridLine'
$hasBracketCorners = Test-Pattern $homePath 'bracket|topLeft|topRight|bottomLeft|bottomRight'
$hasStatusRowText = Test-Pattern $homePath 'HOME_STATUS|STATUS:|HL_SYS|sysId|systemCode'
$hasScanLineAnimation = Test-Pattern $homePath 'Animated\.|scanAnim|scanLine|translateY'
$hasGlitchEffect = Test-Pattern $homePath 'glitch|Glitch|shakeX|glitchAnim'
$hasSystemLogs = Test-Pattern $homePath 'SystemLogs|LOG_MESSAGES|logContainer|logText'
$hasWireframeCube = Test-Pattern $homePath 'WireframeCube|react-native-svg|<Svg|cubeContainer'
$hasHaptics = $fontTargets | Select-String -Pattern 'expo-haptics|Haptics\.' -Quiet
$hasDiagnosticsModal = $fontTargets | Select-String -Pattern 'DiagnosticModal|INITIALIZING_BOOT_SEQUENCE|ACCESS_GRANTED_BY_LOGIC' -Quiet
$hasCameraHud = Test-Pattern $scanPath 'CameraView|reticle|spectro|dataSidebar|BIO_SPECTROMETER|AIM_AT_PRODUCT_LABELS'
$hasMatchOverlay = Test-Pattern $scanPath 'matchOverlay|MATCH_FOUND|VERIFYING_MOLECULAR_SIGNATURE|DataStreamColumn'

Print-Result "Home has matrix/grid overlay" $hasGridOverlay
Print-Result "Home has HUD bracket corners" $hasBracketCorners
Print-Result "Home still shows extra system status text" $hasStatusRowText
Print-Result "Home has animated scan-line effect" $hasScanLineAnimation
Print-Result "Home has digital glitch effect" $hasGlitchEffect
Print-Result "Home has terminal/system logs" $hasSystemLogs
Print-Result "Home has rotating wireframe/cube mark" $hasWireframeCube
Print-Result "App uses haptics anywhere" ([bool]$hasHaptics)
Print-Result "App has diagnostics boot modal" ([bool]$hasDiagnosticsModal)
Print-Result "Scan screen has tactical HUD camera layer" $hasCameraHud
Print-Result "Scan screen has match/data-stream overlay" $hasMatchOverlay

Write-Host ""
Write-Host "=== 4) PROFILE SAVE / LIBRARY / SCREEN COVERAGE AUDIT ===" -ForegroundColor Yellow

$appRoutesOk = Test-Pattern ".\App.tsx" '<Stack\.Screen name="Home"' `
  -and Test-Pattern ".\App.tsx" '<Stack\.Screen name="Scan"' `
  -and Test-Pattern ".\App.tsx" '<Stack\.Screen name="Profile"' `
  -and Test-Pattern ".\App.tsx" '<Stack\.Screen name="HouseholdHub"' `
  -and Test-Pattern ".\App.tsx" '<Stack\.Screen name="Result"' `
  -and Test-Pattern ".\App.tsx" '<Stack\.Screen name="History"' `
  -and Test-Pattern ".\App.tsx" '<Stack\.Screen name="Search"' `
  -and Test-Pattern ".\App.tsx" '<Stack\.Screen name="Subscription"' `
  -and Test-Pattern ".\App.tsx" '<Stack\.Screen name="Trust"' `
  -and Test-Pattern ".\App.tsx" '<Stack\.Screen name="PrivacyPolicy"' `
  -and Test-Pattern ".\App.tsx" '<Stack\.Screen name="Brand"'

$historyExists = Test-Path ".\src\screens\HistoryScreen.tsx"
$searchExists = Test-Path ".\src\screens\SearchScreen.tsx"
$trustExists = Test-Path ".\src\screens\TrustScreen.tsx"
$privacyExists = Test-Path ".\src\screens\PrivacyPolicyScreen.tsx"
$brandExists = Test-Path ".\src\screens\BrandScreen.tsx"

Print-Result "Registered routes cover major screens" $appRoutesOk
Print-Result "History screen exists" $historyExists
Print-Result "Search screen exists" $searchExists
Print-Result "Trust screen exists" $trustExists
Print-Result "Privacy Policy screen exists" $privacyExists
Print-Result "Brand screen exists" $brandExists

Write-Host ""
Write-Host "=== 5) RAW MATCHES: FONT / COLOR / TITLE LEFTOVERS ===" -ForegroundColor Yellow
Get-ChildItem .\src -Recurse -File -Include *.ts,*.tsx |
  Select-String -Pattern 'fontFamily|fontSize\s*:|"#F7FBF8"|"#EDF6F1"|"#F8FBFA"|"#EAF1ED"|Build a smarter personal filter|Use toggles to open only the sections you need|HOME_STATUS|STATUS:' |
  Select-Object Path, LineNumber, Line |
  Sort-Object Path, LineNumber |
  Format-Table -Wrap -AutoSize

Write-Host ""
Write-Host "=== 6) RAW MATCHES: HUD / ANIMATION FEATURE GAP ===" -ForegroundColor Yellow
Get-ChildItem .\src -Recurse -File -Include *.ts,*.tsx |
  Select-String -Pattern 'Animated\.|expo-haptics|Haptics\.|scanLine|glitch|SystemLogs|DiagnosticModal|WireframeCube|react-native-svg|CameraView|reticle|matchOverlay|DataStreamColumn' |
  Select-Object Path, LineNumber, Line |
  Sort-Object Path, LineNumber |
  Format-Table -Wrap -AutoSize

Write-Host ""
Write-Host "=== OVERALL FEATURE READ ===" -ForegroundColor Cyan
Write-Host "If scan-line / glitch / logs / diagnostics / haptics are FALSE, they are still feature gaps."
Write-Host "If old light colors or old title are TRUE, stale styling still exists."
