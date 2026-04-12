param(
  [string]$BaseUrl = "http://localhost:8000"
)

Write-Host "Running backend smoke tests against $BaseUrl"

try {
  $health = Invoke-RestMethod -Uri "$BaseUrl/health" -Method Get -ErrorAction Stop
  Write-Host "Health: " ($health | ConvertTo-Json)
} catch {
  Write-Error "Health check failed: $_"
  exit 1
}

try {
  $subscribeResp = Invoke-RestMethod -Uri "$BaseUrl/subscribe" -Method Post -Body (@{email="smoketest@example.com"} | ConvertTo-Json) -ContentType "application/json" -ErrorAction Stop
  Write-Host "Subscribe response: " ($subscribeResp | ConvertTo-Json)
} catch {
  Write-Warning "Subscribe endpoint returned error (may be unconfigured): $_"
}

Write-Host "Smoke tests complete."
