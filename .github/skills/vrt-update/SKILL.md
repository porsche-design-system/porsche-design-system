---
name: vrt-update
description: Use when the user wants to update VRT snapshots, run visual regression tests, asks why VRT is failing after a visual change, or needs to accept new screenshots for a component.
allowed-tools: shell
---

# VRT Update

Run visual regression tests in Docker and update snapshots.

**Component name or filter** (optional): read from user's message (e.g., `button`). Run all if not specified.

## Context

VRT tests use Playwright to capture screenshots and compare against baseline snapshots. They **must run in Docker** — local screenshots will not match CI.

Docker image: `mcr.microsoft.com/playwright:v1.59.1-jammy`

## Steps

### 1. Ensure the build is current

```bash
npm run build:components && npm run build:components-js
```

Or full build if multiple packages changed: `npm run build`

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

### 3. Update snapshots if differences are intentional

```bash
./docker.sh npm run test:vrt:components-js -- --update-snapshots --grep "{name}"
```

### 4. Review snapshot changes

```bash
git diff --stat -- "*.png"
```

Verify:
- Only expected components have changed snapshots
- Changes look intentional (not rendering artifacts)
- Both light and dark color schemes are correct
- All viewport widths are covered

### 5. Report

Summarize how many snapshots were updated, which components/viewports/schemes were affected, and any unexpected changes.

## In this repository (Porsche Design System)

- **Never run VRT without Docker** — local browser rendering differs from the CI Playwright image
- Docker must be running before invoking `./docker.sh`
- See `packages/components-js/AGENTS.md` for full VRT architecture

## Troubleshooting

**Docker not running**: Start Docker Desktop first.
**Permission errors on snapshots**: The Docker compose config includes a `chown` service to fix file permissions.
**Memory issues**: VRT config sets `NODE_OPTIONS=--max-old-space-size=5120`.
