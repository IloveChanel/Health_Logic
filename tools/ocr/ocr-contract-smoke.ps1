$ErrorActionPreference = "Stop"
Set-Location "D:\HealthLogic"

Write-Host "`n=== OCR CONTRACT STUB SMOKE ===" -ForegroundColor Cyan

$stubPath = ".\tools\ocr\ingredient-ocr-stub.json"
if (-not (Test-Path $stubPath)) {
  throw "Missing OCR stub file: $stubPath"
}

$json = Get-Content $stubPath -Raw -Encoding UTF8 | ConvertFrom-Json

$checks = @(
  @{ Name = "rawText present";    Pass = ($null -ne $json.rawText -and $json.rawText -is [string] -and $json.rawText.Length -gt 0) },
  @{ Name = "ingredients array";  Pass = ($null -ne $json.ingredients -and $json.ingredients -is [System.Object[]] -and $json.ingredients.Count -gt 0) },
  @{ Name = "explanation present";Pass = ($null -ne $json.explanation -and $json.explanation -is [string] -and $json.explanation.Length -gt 0) }
)

$checks | ForEach-Object {
  "{0} : {1}" -f $_.Name, ($(if ($_.Pass) { "TRUE" } else { "FALSE" }))
}

$overall = (($checks | Where-Object { -not $_.Pass } | Measure-Object).Count -eq 0)
Write-Host ""
Write-Host ("OCR CONTRACT STUB VALID : " + $(if ($overall) { "TRUE" } else { "FALSE" })) -ForegroundColor $(if ($overall) { "Green" } else { "Red" })
