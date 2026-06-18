# highfence devlog

Personal developer blog published at <https://highfence.github.io>.

This site is powered by Quartz. Draft writing happens in the local Obsidian vault under:

`02-Areas/Blog/highfence-devlog`

Only notes explicitly marked with `published: true` should be copied into this repository.

## Local Commands

```powershell
npm ci
npm run sync:vault
npm run build:pages
npx quartz build --serve
```

## Publishing Rule

Do not copy the whole Obsidian vault into this repository. Review every public post for company-internal details, private project names, logs, screenshots, credentials, and personal identifiers before publishing.

GitHub Pages is configured to publish from the repository root. Run `npm run build:pages` before committing so the checked-in static files match `content/`.
