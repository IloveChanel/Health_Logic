# Clean, reinstall, prebuild, and run Android (PowerShell safe)
# Run this from the mobile project root (ingredient_checker_app/mobile)
Set-StrictMode -Version Latest

Write-Host "CWD: " (Get-Location)

Write-Host "Cleaning npm cache and node_modules..."
try {
  npm cache clean --force 2>&1 | Write-Host
  Remove-Item -Recurse -Force node_modules,package-lock.json -ErrorAction SilentlyContinue
} catch {
  Write-Warning "Cleanup step had issues: $_"
}

Write-Host "Installing dependencies..."
npm install
if ($LASTEXITCODE -ne 0) { Write-Error "npm install failed"; exit 1 }

Write-Host "Running expo prebuild --clean..."
npx expo prebuild --clean
if ($LASTEXITCODE -ne 0) { Write-Error "expo prebuild failed"; exit 1 }

Write-Host "Running expo run:android..."
npx expo run:android
if ($LASTEXITCODE -ne 0) {
  Write-Host "expo run failed; collecting Gradle stacktrace..."
  if (Test-Path android) {
    Push-Location android
    if (Test-Path "gradlew.bat") {
      .\gradlew.bat assembleDebug --stacktrace > "$env:TEMP\gradle-stack.txt" 2>&1
      Get-Content "$env:TEMP\gradle-stack.txt" -TotalCount 200 | Write-Host
    } else {
      Write-Warning "gradlew.bat not found in android/. Did prebuild create android folder?"
    }
    Pop-Location
  } else {
    Write-Warning "android directory not found. Prebuild may have failed earlier."
  }
  exit 1
}

Write-Host "Build succeeded."