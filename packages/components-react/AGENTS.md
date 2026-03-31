# AGENTS.md — Components React Package

> This file provides context for AI coding assistants working in `packages/components-react/`.
> See the root [`AGENTS.md`](../../AGENTS.md) for project-wide guidance.

## Overview

This package contains the **React wrapper** for Porsche Design System web components. It also includes integrations for Next.js, Remix, and React Router.

## Structure

```
packages/components-react/
├── src/                    # Vite dev app for testing
├── projects/
│   ├── react-wrapper/      # Generated React wrapper components
│   ├── react-ssr-wrapper/  # SSR-compatible wrapper
│   ├── nextjs/             # Next.js integration
│   ├── remix/              # Remix integration
│   └── react-router/       # React Router integration
└── tests/                  # Test files
```

## Commands

```bash
# Start dev server
yarn start:components-react

# Build wrapper
yarn build:components-react

# Start Next.js integration
yarn start:components-react/nextjs

# Start Remix integration
yarn start:components-react/remix
```

## Usage Patterns

### Client-Side Rendering

```tsx
import { PButton, PLink } from '@porsche-design-system/components-react';
```

### Server-Side Rendering (Next.js, etc.)

```tsx
import { PButton, PLink } from '@porsche-design-system/components-react/ssr';
```

### Provider Setup

The PDS provider must wrap your application:

```tsx
import { PorscheDesignSystemProvider } from '@porsche-design-system/components-react';

function App() {
  return (
    <PorscheDesignSystemProvider>
      {/* Your app */}
    </PorscheDesignSystemProvider>
  );
}
```

## Accessibility

All accessibility requirements from the root [`AGENTS.md`](../../AGENTS.md) apply. When using PDS React components:

- **Prefer PDS components** over custom implementations
- Pass ARIA attributes via the component's `aria` prop when needed
- Avoid placing `aria-*` attributes directly on the component element
- Ensure keyboard navigation works with wrapped components

## Testing

```bash
# Run unit tests
yarn test:unit:components-react
```

Tests are located in the `tests/` directory. When modifying wrapper behavior:

- Ensure wrapped components maintain accessibility
- Test with SSR if changes affect hydration
- Verify ARIA attribute passthrough works correctly

## Integration Notes

### Next.js

- Use `/ssr` import path for server components
- See [`projects/nextjs/`](projects/nextjs/) for integration example

### Remix

- Use `/ssr` import path
- See [`projects/remix/`](projects/remix/) for integration example

### React Router

- See [`projects/react-router/`](projects/react-router/) for integration example

## Build Dependencies

This package requires these to be built first:

1. `shared`, `tokens`, `assets`, `styles`, `utilities`, `component-meta`
2. `components`
3. `components-js`

Run `yarn build` from the root to build all dependencies in order.

