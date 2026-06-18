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

    $target = Join-Path $resolvedOutput.Path "$slug.md"
    Set-Content -LiteralPath $target -Value $raw -Encoding UTF8
}
