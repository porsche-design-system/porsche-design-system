# VRT Update

Run visual regression tests in Docker and update snapshots for a component.

**Component name or filter**: $ARGUMENTS (e.g., `button`, `input-text`, or blank for all)

## Context

VRT (Visual Regression Tests) use Playwright to capture screenshots and compare against baseline snapshots. They **must run in Docker** to ensure consistent rendering across machines and match CI.

Docker image: `mcr.microsoft.com/playwright:v1.59.1-jammy`

## Steps

### 1. Ensure the build is current

VRT tests run against built output. Check if a rebuild is needed:

```bash
npm run build
```

If only the target component changed, a targeted rebuild may suffice:

```bash
npm run build:components && npm run build:components-js
```

### 2. Run VRT tests in Docker

**For a specific component**:

```bash
./docker.sh npm run test:vrt:components-js -- --grep "$ARGUMENTS"
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

When snapshots differ intentionally (visual changes were expected):

```bash
./docker.sh npm run test:vrt:components-js -- --update-snapshots --grep "$ARGUMENTS"
```

### 4. Review snapshot changes

After updating, check the git diff for snapshot files:

```bash
git diff --stat -- "*.png"
```

Verify:
- Only expected components have changed snapshots
- Changes look intentional (not rendering artifacts)
- Both light and dark color schemes are correct
- All viewport widths are covered

### 5. Report

Summarize:
- How many snapshots were updated
- Which components/viewports/schemes were affected
- Any unexpected changes that need investigation
- Whether the changes should be committed

## Troubleshooting

**Docker not running**: Start Docker Desktop first.

**Permission errors**: The Docker compose config uses a `chown` service to fix file permissions. If snapshots can't be written, check Docker volume mounts.

**Screenshots don't match CI**: Never run VRT without Docker. Local browser rendering differs from the Docker Playwright image.

**Memory issues**: The Docker config sets `NODE_OPTIONS=--max-old-space-size=5120`. If tests OOM, consider running fewer shards.
