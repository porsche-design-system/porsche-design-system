---
name: vrt-update
description: Run visual regression tests in Docker and update snapshots. Use when a visual change is intentional and VRT snapshots need to be updated to match the new appearance.
---

# VRT Update

Run visual regression tests in Docker and update snapshots for a component.

**Component name or filter** (optional): read from user's message (e.g., `button`, `input-text`). Run all if not specified.

## Context

VRT tests use Playwright to capture screenshots and compare against baseline snapshots. They **must run in Docker** to ensure consistent rendering across machines and match CI.

Docker image: `mcr.microsoft.com/playwright:v1.59.1-jammy`

## Steps

### 1. Ensure the build is current

VRT tests run against built output. Check if a rebuild is needed:

```bash
npm run build
```

If only the target component changed:

```bash
npm run build:components && npm run build:components-js
```

### 2. Run VRT tests in Docker

**For a specific component**:

```bash
./docker.sh npm run test:vrt:components-js -- --grep "{name}"
```

**For all components**:

```bash
./docker.sh npm run test:vrt:components-js
```

**For styles VRT**:

```bash
./docker.sh npm run test:vrt:styles
```

### 3. If tests fail — update snapshots

When snapshot differences are intentional:

```bash
./docker.sh npm run test:vrt:components-js -- --update-snapshots --grep "{name}"
```

### 4. Review snapshot changes

After updating, inspect the git diff for snapshot files:

```bash
git diff --stat -- "*.png"
```

Verify:
- Only expected components have changed snapshots
- Changes look intentional (not rendering artifacts)
- Both light and dark color schemes are correct
- All viewport widths are covered

### 5. Report

Summarize how many snapshots were updated, which components/viewports/schemes were affected, and any unexpected changes that need investigation.

## In this repository (Porsche Design System)

- **Never run VRT without Docker** — local browser rendering differs from the CI Playwright image
- Docker must be running before invoking `./docker.sh`
- VRT config sets `NODE_OPTIONS=--max-old-space-size=5120` for memory
- Tests are sharded 6 ways in CI — local runs are not sharded
- See `packages/components-js/AGENTS.md` for full VRT architecture

## Troubleshooting

**Docker not running**: Start Docker Desktop first.

**Screenshots don't match CI**: Always use `./docker.sh`. Never run VRT locally without it.

**Permission errors on snapshots**: The Docker compose config includes a `chown` service to fix file permissions.
