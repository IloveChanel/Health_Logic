$ErrorActionPreference = "Stop"
Set-Location "D:\HealthLogic"

function Print-Result {
  param([string]$Label, [bool]$Value)
  $status = if ($Value) { "TRUE" } else { "FALSE" }
  $color = if ($Value) { "Green" } else { "Red" }
  Write-Host ("{0,-54} {1}" -f $Label, $status) -ForegroundColor $color
}

Write-Host ""
Write-Host "=== FONT CONSISTENCY AUDIT (REAL) ===" -ForegroundColor Cyan

$files = Get-ChildItem .\src -Recurse -File -Include *.ts,*.tsx

$hasInlineFontFamily = [bool]($files | Select-String -Pattern 'fontFamily\s*:' -Quiet)
$hasInlineFontSize = [bool]($files | Select-String -Pattern 'fontSize\s*:' -Quiet)
$hasInlineFontWeight = [bool]($files | Select-String -Pattern 'fontWeight\s*:' -Quiet)
$hasTypographyTokens = [bool]($files | Select-String -Pattern 'typography\.' -Quiet)
$hasMonoFonts = [bool]($files | Select-String -Pattern 'Menlo|monospace|Courier' -Quiet)

Print-Result "Inline fontFamily still exists" $hasInlineFontFamily
Print-Result "Inline fontSize still exists" $hasInlineFontSize
Print-Result "Inline fontWeight still exists" $hasInlineFontWeight
Print-Result "Shared typography tokens exist somewhere" $hasTypographyTokens
Print-Result "Monospace fonts exist somewhere" $hasMonoFonts

Write-Host ""
Write-Host "=== RAW FONT MATCHES ===" -ForegroundColor Yellow
Get-ChildItem .\src -Recurse -File -Include *.ts,*.tsx |
  Select-String -Pattern 'fontFamily\s*:|fontSize\s*:|fontWeight\s*:|typography\.' |
  Select-Object Path, LineNumber, Line |
  Sort-Object Path, LineNumber |
  Format-Table -Wrap -AutoSize
