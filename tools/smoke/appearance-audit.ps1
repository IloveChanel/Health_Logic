$ErrorActionPreference = "Stop"
Set-Location "D:\HealthLogic"

Write-Host ""
Write-Host "=== APPEARANCE AUDIT ===" -ForegroundColor Cyan

Get-ChildItem .\src -Recurse -File -Include *.ts,*.tsx |
  Select-String -Pattern '"#F7FBF8"','"#EDF6F1"','"#F8FBFA"','Build a smarter personal filter','Use toggles to open only the sections you need','backgroundColor:\s*"white"' |
  Select-Object Path, LineNumber, Line |
  Sort-Object Path, LineNumber |
  Format-Table -Wrap -AutoSize
