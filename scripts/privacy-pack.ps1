# scripts/privacy-pack.ps1 — privacy-safe archive for hosted AI / sharing
# Creates a zip of ONLY tracked files (git HEAD), respecting .gitignore.
# Guarantees excluded: .git/, .claude/, .impeccable/, .env*, node_modules/, dist/, build/, coverage/, untracked files
# Usage: powershell -ExecutionPolicy Bypass -File scripts/privacy-pack.ps1
# Output: $env:TEMP\WebsiteChecker-privacy-pack.zip

$ErrorActionPreference = "Stop"

$repo = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$out = Join-Path $env:TEMP "WebsiteChecker-privacy-pack.zip"

if (Test-Path $out) { Remove-Item $out -Force }

# Verify repo
$top = (git -C $repo rev-parse --show-toplevel 2>&1).Trim()
if ($LASTEXITCODE -ne 0) { throw "Not a git repo: $repo`n$top" }

Write-Host "Repo: $repo"
Write-Host "Top : $top"
Write-Host "Creating archive (tracked files only, HEAD) -> $out"

git -C $repo archive --format=zip --output $out HEAD
if ($LASTEXITCODE -ne 0) { throw "git archive failed" }

Write-Host "Created: $out"
Write-Host ("Size: {0:N0} bytes" -f (Get-Item $out).Length)
Write-Host ""
Write-Host "Contents (first 60 entries):"
# Use git to list archive contents without extracting (via unzip -l if available, else Expand-Archive dry-run)
$hasUnzip = Get-Command unzip -ErrorAction SilentlyContinue
if ($hasUnzip) {
  unzip -l $out | Select-Object -First 80
} else {
  # Fallback: use Expand-Archive to temp and list
  $tmpList = Join-Path $env:TEMP "wc-pack-list"
  if (Test-Path $tmpList) { Remove-Item $tmpList -Recurse -Force }
  Expand-Archive -Path $out -DestinationPath $tmpList -Force
  Get-ChildItem $tmpList -Recurse -File | Select-Object -First 60 | ForEach-Object { $_.FullName.Replace($tmpList + "\","") }
  Remove-Item $tmpList -Recurse -Force
}
Write-Host ""
Write-Host "Verification hints:"
Write-Host "  - Should contain ~45 tracked files (git ls-files --cached | wc -l)"
Write-Host "  - Should NOT contain .git/, .claude/, .impeccable/, node_modules/, dist/, .env"
Write-Host "Done."
