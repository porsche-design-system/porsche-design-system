# Turborepo GitHub Actions Cache — Design Spec

**Date:** 2026-06-23  
**Branch:** issue/4531  
**Scope:** CI build speed via `actions/cache` for `.turbo` directory

---

## Problem

The `build-development` and `build-production` CI jobs run 13 sequential `npm run build:xxx` steps with no caching between runs. Every push rebuilds everything from scratch (~280s). Turbo is already wired locally but not used in CI.

---

## Goal

- Workflow retries on the same SHA finish in ~2s (full cache hit)
- PRs that only touch storefront skip the 4-min Stencil build (~280s → ~50s)
- No changes to artifact upload/download, Docker setup, lint, test, or deploy workflows

---

## Changes

### 1. `.github/workflows/build.yml`

**`build-development` job** — replace 13 sequential steps with:

```yaml
- uses: actions/cache@v5
  with:
    path: .turbo
    key: ${{ runner.os }}-turbo-${{ github.sha }}
    restore-keys: |
      ${{ runner.os }}-turbo-
- run: npm run build
```

**`build-production` job** — replace 13 sequential steps with:

```yaml
- uses: actions/cache@v5
  with:
    path: .turbo
    key: ${{ runner.os }}-turbo-${{ github.sha }}
    restore-keys: |
      ${{ runner.os }}-turbo-
- run: npm run build-prod
  env:
    NEXT_PUBLIC_BASE_PATH: ${{ inputs.storefront-slug }}
```

The `upload-artifact` steps at the end of each job are unchanged.

### 2. `packages/storefront/turbo.json`

Add `NEXT_PUBLIC_BASE_PATH` to the `build-prod` task's `env` array:

```json
"build-prod": {
  "env": ["NEXT_PUBLIC_BASE_PATH"],
  ...
}
```

Turbo uses `envMode: strict` by default — env vars not declared in `env` or `passThroughEnv` are invisible to tasks. `NEXT_PUBLIC_BASE_PATH` must be in `env` (not `passThroughEnv`) so that different storefront slugs (e.g. `pr-1234` vs `nightly`) produce different cache keys and don't serve stale builds.

The `build` task does not need this — dev CI does not set `NEXT_PUBLIC_BASE_PATH`.

---

## Cache Key Strategy

| Key | Purpose |
|-----|---------|
| `${{ runner.os }}-turbo-${{ github.sha }}` | Exact hit on workflow re-runs (retries) |
| `${{ runner.os }}-turbo-` | Fallback: restores previous commit's cache; turbo only rebuilds what changed |

Both jobs use identical keys so the prod job can hit cache populated by the dev job on the same SHA.

---

## What Does Not Change

- `actions/upload-artifact` / `actions/download-artifact` steps — artifacts pass between jobs as before
- Docker container config (`image`, `--user 1001`)
- `.github/actions/install` — node_modules cache unchanged
- Lint, test, deploy, release workflows
- All other `turbo.json` configs

---

## Risks

| Risk | Mitigation |
|------|-----------|
| `NEXT_PUBLIC_BASE_PATH` invisible to Next.js in strict mode | Declare in storefront `build-prod` env |
| Cache miss on first run per branch | Expected — fallback key restores from nearest ancestor |
| `.turbo` dir permissions inside Docker container | `actions/cache` restores before container starts; workspace is mounted read/write; same pattern already works for `node_modules` cache in `install` action |
