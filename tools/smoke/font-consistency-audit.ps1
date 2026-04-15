$ErrorActionPreference = "Stop"
Set-Location "D:\HealthLogic"

function Print-Result {
  param([string]$Label, [bool]$Value)
  $status = if ($Value) { "TRUE" } else { "FALSE" }
  $color = if ($Value) { "Green" } else { "Red" }
  Write-Host ("{0,-52} {1}" -f $Label, $status) -ForegroundColor $color
}

Write-Host ""
Write-Host "=== FONT CONSISTENCY AUDIT ===" -ForegroundColor Cyan

$files = Get-ChildItem .\src -Recurse -File -Include *.ts,*.tsx

$usesTypography = [bool]($files | Select-String -Pattern 'typography\.' -Quiet)
$inlineFontFamily = [bool]($files | Select-String -Pattern 'fontFamily\s*:' -Quiet)
$inlineFontSize = [bool]($files | Select-String -Pattern 'fontSize\s*:' -Quiet)
$inlineFontWeight = [bool]($files | Select-String -Pattern 'fontWeight\s*:' -Quiet)
$monoFonts = [bool]($files | Select-String -Pattern 'Menlo|monospace|Courier' -Quiet)

Print-Result "App uses shared typography tokens somewhere" $usesTypography
Print-Result "Inline fontFamily still exists" $inlineFontFamily
Print-Result "Inline fontSize still exists" $inlineFontSize
Print-Result "Inline fontWeight still exists" $inlineFontWeight
Print-Result "Monospace fonts exist somewhere" $monoFonts

Write-Host ""
Write-Host "=== RAW FONT MATCHES ===" -ForegroundColor Yellow
Get-ChildItem .\src -Recurse -File -Include *.ts,*.tsx |
  Select-String -Pattern 'fontFamily\s*:|fontSize\s*:|fontWeight\s*:|typography\.' |
  Select-Object Path, LineNumber, Line |
  Sort-Object Path, LineNumber |
  Format-Table -Wrap -AutoSize
