# AGENTS.md — Components Angular Package

> This file provides context for AI coding assistants working in `packages/components-angular/`.
> See the root [`AGENTS.md`](../../AGENTS.md) for project-wide guidance.

## Overview

This package contains the **Angular wrapper** for Porsche Design System web components.

## Structure

```
packages/components-angular/
├── src/                    # Angular dev app for testing
├── projects/
│   └── angular-wrapper/    # Generated Angular wrapper module
├── scripts/                # Build scripts
└── tests/                  # Test files
```

## Commands

```bash
# Start dev server
npm run start:components-angular

# Build wrapper
npm run build:components-angular

# Run unit tests
npm run test:unit:components-angular
```

## Usage

### NgModule Setup

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@NgModule({
  imports: [BrowserModule, PorscheDesignSystemModule.load()],
})
export class AppModule {}
```

### Standalone App Setup

```typescript
import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

bootstrapApplication(AppComponent, {
  providers: [importProvidersFrom(PorscheDesignSystemModule.load())],
});
```

## Accessibility

All accessibility requirements from the root [`AGENTS.md`](../../AGENTS.md) apply. When using PDS Angular components:

- **Prefer PDS components** over custom implementations
- Pass ARIA attributes via the component's `[aria]` input when needed
- Avoid placing `aria-*` attributes directly on the component element
- Ensure keyboard navigation works with wrapped components

## Testing

Tests use Vitest for wrapper logic and Karma/Jasmine for Angular integration. When modifying wrapper behavior:

- Ensure wrapped components maintain accessibility
- Verify ARIA attribute passthrough works correctly
- Test two-way binding if applicable

## Angular Version Compatibility

- Check `MAX_TS_VERSION` in `node_modules/@angular/compiler-cli/src/typescript_support.js` before upgrading TypeScript
- Angular **versions** (`@angular/*`, `ng-packagr`, `zone.js`) are bumped by syncpack like any other dependency
  (`npm run npm:update`). Only Angular's framework **migrations** are applied via `npm run ng:update -- @angular/core
  @angular/cli --migrate-only --from=<old> --to=<new>` — a wrapper around `ng update` that works around this monorepo's
  hoisted `node_modules` and unpublished private workspace deps (see
  [`docs/dependencies.md`](../../docs/dependencies.md) → _Updating Angular (versions vs. migrations)_). Do **not** call
  `ng update` directly; it fails with `Found 0 dependencies` / a registry `404`.

## Build Dependencies

This package requires these to be built first:

1. `shared`, `tokens`, `assets`, `styles`, `utilities`, `component-meta`
2. `components`
3. `components-js`

Run `npm run build` from the root to build all dependencies in order.

