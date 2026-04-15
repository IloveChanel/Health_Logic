$ErrorActionPreference = "Stop"
Set-Location "D:\HealthLogic\android"

if (-not (Test-Path ".\play-signing.properties")) {
  throw "Missing android\play-signing.properties"
}

$props = Get-Content ".\play-signing.properties" | Where-Object { $_ -match '=' -and $_ -notmatch '^\s*#' }
$map = @{}
foreach ($line in $props) {
  $parts = $line -split '=', 2
  if ($parts.Count -eq 2) {
    $map[$parts[0].Trim()] = $parts[1].Trim()
  }
}

foreach ($key in @("RELEASE_STORE_FILE","RELEASE_KEY_ALIAS","RELEASE_STORE_PASSWORD","RELEASE_KEY_PASSWORD")) {
  if (-not $map.ContainsKey($key) -or [string]::IsNullOrWhiteSpace($map[$key])) {
    throw "Missing signing value: $key"
  }
}

.\gradlew bundleRelease
