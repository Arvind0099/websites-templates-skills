# Installs every skill in .\skills into your Claude Code skills folder.
#   Personal (all projects):  .\install.ps1
#   One project only:         .\install.ps1 -Project "C:\path\to\project"
param([string]$Project = "")

$ErrorActionPreference = 'Stop'
$src = Join-Path $PSScriptRoot 'skills'
if ($Project) {
    if (-not (Test-Path $Project)) { throw "Project folder not found: $Project" }
    $dest = Join-Path $Project '.claude\skills'
} else {
    $dest = Join-Path $HOME '.claude\skills'
}
New-Item -ItemType Directory -Force -Path $dest | Out-Null

Get-ChildItem -Path $src -Directory | ForEach-Object {
    $target = Join-Path $dest $_.Name
    New-Item -ItemType Directory -Force -Path $target | Out-Null
    Copy-Item -Path (Join-Path $_.FullName '*') -Destination $target -Recurse -Force
    Write-Host "[ok] Installed $($_.Name) -> $target" -ForegroundColor Green
}

Write-Host ""
Write-Host "Done. Open a new Claude Code session and type /animated-landing" -ForegroundColor Cyan
