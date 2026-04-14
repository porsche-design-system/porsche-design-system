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
- Use `ng update` for Angular upgrades (see [`docs/dependencies.md`](../../docs/dependencies.md))

## Build Dependencies

This package requires these to be built first:

1. `shared`, `tokens`, `assets`, `styles`, `utilities`, `component-meta`
2. `components`
3. `components-js`

Run `npm run build` from the root to build all dependencies in order.

