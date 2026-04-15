$ErrorActionPreference = "Stop"
Set-Location "D:\HealthLogic"

Write-Host ""
Write-Host "=== CLEAN TYPECHECK ===" -ForegroundColor Cyan
npx tsc --noEmit --pretty false
