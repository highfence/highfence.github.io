param(
    [string]$Root = "$PSScriptRoot\..\public"
)

$ErrorActionPreference = "Stop"

$resolvedRoot = Resolve-Path -LiteralPath $Root

Get-ChildItem -LiteralPath $resolvedRoot.Path -Recurse -File |
    Where-Object { $_.Extension -in @(".html", ".css", ".js") } |
    ForEach-Object {
        $raw = Get-Content -LiteralPath $_.FullName -Raw
        $raw = [regex]::Replace(
            $raw,
            "/\*# sourceMappingURL=data:application/json;charset=utf-8;base64,[A-Za-z0-9+/=]+\s*\*/",
            ""
        )
        $raw = [regex]::Replace(
            $raw,
            "//# sourceMappingURL=data:application/json;charset=utf-8;base64,[A-Za-z0-9+/=]+\s*",
            ""
        )
        Set-Content -LiteralPath $_.FullName -Value $raw -Encoding UTF8
    }
