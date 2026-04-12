<#
Creates a timestamped backup branch, commits all changes, and pushes to origin.
Usage: run from repository root: `.
ecipes\git-backup.ps1` or `.	ools\git-backup.ps1`
#>
param(
  [string]$RepoRoot = "D:\Ingredient Checker",
  [string]$Message = "chore: workspace backup"
)

Set-Location $RepoRoot

if (-not (Test-Path ".git")) {
  Write-Error "No .git directory found in $RepoRoot. Initialize a git repo first or run this from the repo root."
  exit 1
}

$time = Get-Date -Format "yyyyMMdd-HHmmss"
$branch = "backup/$time"

Write-Host "Creating branch $branch and committing all changes..."

git checkout -b $branch
git add -A
try {
  git commit -m "$Message ($time)"
} catch {
  Write-Warning "No changes to commit or commit failed: $_"
}

Write-Host "Pushing branch to origin..."
try {
  git push -u origin $branch
  Write-Host "Pushed to origin/$branch"
} catch {
  Write-Warning "Push failed. Check remote settings and network. Error: $_"
}

Write-Host "Backup complete. Note the branch name: $branch"
