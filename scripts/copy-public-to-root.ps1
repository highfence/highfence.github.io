param(
    [string]$Public = "$PSScriptRoot\..\public",
    [string]$Root = "$PSScriptRoot\.."
)

$ErrorActionPreference = "Stop"

$resolvedRoot = Resolve-Path -LiteralPath $Root
$resolvedPublic = Resolve-Path -LiteralPath $Public

$rootPath = $resolvedRoot.Path.TrimEnd([IO.Path]::DirectorySeparatorChar, [IO.Path]::AltDirectorySeparatorChar)
$generatedTargets = @(
    "404.html",
    "favicon.ico",
    "index.html",
    "index.css",
    "index.xml",
    "index-og-image.webp",
    "posts",
    "postscript.js",
    "prescript.js",
    "sitemap.xml",
    "static",
    "tags"
)

foreach ($target in $generatedTargets) {
    $path = Join-Path $rootPath $target
    if (Test-Path -LiteralPath $path) {
        $resolvedTarget = Resolve-Path -LiteralPath $path
        if (-not $resolvedTarget.Path.StartsWith($rootPath, [StringComparison]::OrdinalIgnoreCase)) {
            throw "Refusing to remove path outside repository root: $($resolvedTarget.Path)"
        }
        Remove-Item -LiteralPath $resolvedTarget.Path -Recurse -Force
    }
}

Get-ChildItem -LiteralPath $resolvedPublic.Path -Force |
    ForEach-Object {
        Copy-Item -LiteralPath $_.FullName -Destination $rootPath -Recurse -Force
    }
