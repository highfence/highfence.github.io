$ErrorActionPreference = "Stop"

$root = Resolve-Path -LiteralPath "$PSScriptRoot\.."

Push-Location $root.Path
try {
    & npx quartz build
    & powershell -ExecutionPolicy Bypass -File ".\scripts\strip-sourcemaps.ps1"
    & powershell -ExecutionPolicy Bypass -File ".\scripts\copy-public-to-root.ps1"
}
finally {
    Pop-Location
}
