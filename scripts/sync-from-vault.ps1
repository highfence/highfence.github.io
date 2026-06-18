param(
    [string]$VaultBlogPath = "C:\Users\highfence\Documents\Google Drive\Obsidian Vault\02-Areas\Blog\highfence-devlog",
    [string]$OutputPath = "$PSScriptRoot\..\content\posts"
)

$ErrorActionPreference = "Stop"

$resolvedVault = Resolve-Path -LiteralPath $VaultBlogPath
$resolvedOutput = Resolve-Path -LiteralPath $OutputPath

Get-ChildItem -LiteralPath $resolvedOutput.Path -Filter "*.md" -File |
    Where-Object { $_.Name -ne "starting-highfence-devlog.md" } |
    Remove-Item -Force

Get-ChildItem -LiteralPath $resolvedVault.Path -Filter "*.md" -File | ForEach-Object {
    $raw = Get-Content -LiteralPath $_.FullName -Raw
    if ($raw -notmatch "(?m)^published:\s*true\s*$") {
        return
    }

    if ($raw -match "(?m)^blog_status:\s*draft\s*$") {
        return
    }

    $slugMatch = [regex]::Match($raw, "(?m)^slug:\s*([A-Za-z0-9][A-Za-z0-9_-]*)\s*$")
    if ($slugMatch.Success) {
        $slug = $slugMatch.Groups[1].Value.ToLowerInvariant()
    } else {
        $slug = [System.IO.Path]::GetFileNameWithoutExtension($_.Name).ToLowerInvariant()
        $slug = [regex]::Replace($slug, "[^\p{L}\p{Nd}]+", "-").Trim("-")
    }
    if ([string]::IsNullOrWhiteSpace($slug)) {
        throw "Could not derive slug from $($_.FullName)"
    }

    $publicRaw = $raw
    $dateMatch = [regex]::Match($publicRaw, "(?m)^date:\s*(\d{4}-\d{2}-\d{2})\s*$")
    if (-not $dateMatch.Success) {
        $dateMatch = [regex]::Match($publicRaw, "(?m)^created:\s*(\d{4}-\d{2}-\d{2})\s*$")
    }
    if ($dateMatch.Success) {
        $publishedFlag = [regex]::new("(?m)^published:\s*true\s*$")
        $publicRaw = $publishedFlag.Replace($publicRaw, "published: $($dateMatch.Groups[1].Value)", 1)
    }

    $target = Join-Path $resolvedOutput.Path "$slug.md"
    Set-Content -LiteralPath $target -Value $publicRaw -Encoding UTF8
}
