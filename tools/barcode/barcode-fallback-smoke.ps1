$ErrorActionPreference = "Stop"
Set-Location "D:\HealthLogic"

Write-Host "`n=== BARCODE FALLBACK STUB SMOKE ===" -ForegroundColor Cyan

$path = ".\tools\barcode\barcode-fallback-stub.json"

if (-not (Test-Path $path)) {
  throw "Missing stub file"
}

$json = Get-Content $path -Raw -Encoding UTF8 | ConvertFrom-Json

$checks = @(
  @{ Name="productName"; Pass = ($json.productName -is [string]) },
  @{ Name="brandName"; Pass = ($json.brandName -is [string]) },
  @{ Name="ingredients"; Pass = ($json.ingredients.Count -gt 0) }
)

$checks | ForEach-Object {
  "{0}: {1}" -f $_.Name, ($(if ($_.Pass) {"TRUE"} else {"FALSE"}))
}

$overall = (($checks | Where-Object { -not $_.Pass }).Count -eq 0)

Write-Host ""
Write-Host ("FALLBACK CONTRACT VALID: " + $(if ($overall) {"TRUE"} else {"FALSE"}))
