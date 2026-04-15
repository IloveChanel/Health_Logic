$ErrorActionPreference="Stop"

Write-Host ""
Write-Host "=== HEALTHLOGIC DEV RUNNER ===" -ForegroundColor Cyan

Set-Location "D:\HealthLogic"

Write-Host ""
Write-Host "1) TypeScript check" -ForegroundColor Yellow
npx tsc --noEmit
if ($LASTEXITCODE -ne 0) { 
    Write-Host "TypeScript failed. Fix errors first." -ForegroundColor Red
    exit 
}

Write-Host ""
Write-Host "2) Start ADB" -ForegroundColor Yellow
$adb="D:\Android\Sdk\platform-tools\adb.exe"
& $adb start-server | Out-Null
& $adb devices

Write-Host ""
Write-Host "3) Reverse Metro ports" -ForegroundColor Yellow
& $adb reverse tcp:8081 tcp:8081
& $adb reverse tcp:19000 tcp:19000
& $adb reverse tcp:19001 tcp:19001

Write-Host ""
Write-Host "4) Kill old Metro" -ForegroundColor Yellow
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue

Write-Host ""
Write-Host "5) Start Expo Metro" -ForegroundColor Yellow
Start-Process powershell -ArgumentList '-NoExit','-Command','Set-Location "D:\HealthLogic"; npx expo start --clear --android'

Write-Host ""
Write-Host "6) Start device logs" -ForegroundColor Yellow
Start-Process powershell -ArgumentList '-NoExit','-Command','& "D:\Android\Sdk\platform-tools\adb.exe" logcat *:S ReactNative:V ReactNativeJS:V'

Write-Host ""
Write-Host "Dev environment started." -ForegroundColor Green
Write-Host "Press R in Metro to reload the app."
