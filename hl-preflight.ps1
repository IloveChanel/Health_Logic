$ErrorActionPreference = "Stop"
Set-Location "D:\HealthLogic"

$adb = "D:\Android\Sdk\platform-tools\adb.exe"
$emu = "D:\Android\Sdk\emulator\emulator.exe"
$profile = ".\src\screens\ProfileScreen.tsx"

function Step($name) {
  Write-Host ""
  Write-Host "=== $name ===" -ForegroundColor Cyan
}

function Fail($msg) {
  Write-Host "FAIL: $msg" -ForegroundColor Red
  exit 1
}

Step "1. Paths"
if (!(Test-Path $adb)) { Fail "ADB missing: $adb" }
if (!(Test-Path $emu)) { Fail "Emulator missing: $emu" }
if (!(Test-Path $profile)) { Fail "Missing file: $profile" }
Write-Host "PASS"

Step "2. TypeScript"
npx tsc --noEmit
if ($LASTEXITCODE -ne 0) { Fail "TypeScript failed" }
Write-Host "PASS"

Step "3. Emulator / ADB"
& $adb start-server | Out-Null
$devices = & $adb devices
$devices | ForEach-Object { Write-Host $_ }
$joined = $devices -join "`n"
if ($joined -notmatch "emulator-\d+\s+device") {
  Write-Host "No emulator detected. Available AVDs:" -ForegroundColor Yellow
  & $emu -list-avds
  Fail "Start an emulator first"
}
Write-Host "PASS"

Step "4. Metro ports"
& $adb reverse tcp:8081 tcp:8081
& $adb reverse tcp:19000 tcp:19000
& $adb reverse tcp:19001 tcp:19001
Get-NetTCPConnection -LocalPort 8081 -ErrorAction SilentlyContinue | Format-Table -AutoSize
Write-Host "PASS"

Step "5. ProfileScreen hotspot audit"
$lines = Get-Content $profile
foreach ($range in @(@(350,382), @(430,480))) {
  $start = $range[0]
  $end = $range[1]
  Write-Host ""
  Write-Host "--- lines $start..$end ---" -ForegroundColor Yellow
  for ($i = $start; $i -le $end; $i++) {
    if ($i -le $lines.Count) {
      "{0,4}: {1}" -f $i, $lines[$i-1]
    }
  }
}

Step "6. Quick raw-text scan"
Select-String -Path $profile -Pattern '>\s*[A-Za-z][^<{}]*\s*</View>' -AllMatches | Format-Table LineNumber,Line -AutoSize

Step "7. Start Metro"
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Process powershell -ArgumentList '-NoExit','-Command','Set-Location "D:\HealthLogic"; npx expo start --clear'
Start-Process powershell -ArgumentList '-NoExit','-Command','& "D:\Android\Sdk\platform-tools\adb.exe" logcat *:S ReactNative:V ReactNativeJS:V'

Write-Host ""
Write-Host "PRE-FLIGHT COMPLETE" -ForegroundColor Green
Write-Host "Use the Metro window for r/a. Use the logcat window for the first red error." -ForegroundColor Green
