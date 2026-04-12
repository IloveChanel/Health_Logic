<#
Runs a safe sequence to fix common Android build problems for this repo:
- reinstalls node_modules
- clears Gradle caches
- installs expo-font and runs expo prebuild
- runs Gradle assembleDebug with warnings shown
#>
param(
  [string]$ProjectRoot = "D:\Ingredient Checker",
  [string]$ExpoProject = "D:\Ingredient Checker\ingredient_checker_app\mobile"
)

Write-Host "Running Android environment fix sequence"

Push-Location $ProjectRoot

if (Test-Path "node_modules") {
  Write-Host "Removing node_modules..."
  rd /s /q node_modules
}

Write-Host "Cleaning yarn/npm caches"
npm cache clean --force

Write-Host "Installing node modules"
npm install

Write-Host "Ensure expo-font installed"
npx expo install expo-font

Write-Host "Running expo prebuild (android)"
npx expo prebuild -p android --no-install

Write-Host "Cleaning Gradle caches"
if (-not (Test-Path "$ProjectRoot\.gradle-home")) { New-Item -ItemType Directory -Path "$ProjectRoot\.gradle-home" | Out-Null }
$env:GRADLE_USER_HOME = "$ProjectRoot\.gradle-home"

Push-Location "$ProjectRoot\android"
Write-Host "Running Gradle clean"
.\gradlew.bat clean

Write-Host "Assembling debug with warnings:" 
.\gradlew.bat assembleDebug --warning-mode all --stacktrace

Pop-Location
Pop-Location

Write-Host "Done. Check output above for deprecation warnings and errors."
