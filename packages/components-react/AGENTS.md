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

> These are root workspace commands defined in the **repo root `package.json`**, not in this package's own scripts. Run them from the repo root.

```bash
# Start dev server
npm run start:components-react

# Build wrapper
npm run build:components-react

# Start Next.js integration
npm run start:components-react/nextjs

# Start Remix integration
npm run start:components-react/remix
```

## Wrapper Component Pattern

All wrappers are generated — do not hand-edit files under `projects/react-wrapper/src/lib/components/`. The key hooks and utilities:

| Hook / Util | Purpose |
| --- | --- |
| `usePrefix(tagName)` | Resolves prefixed tag name from provider context |
| `useBrowserLayoutEffect(fn, deps)` | SSR-safe `useLayoutEffect` — no-op on server |
| `useMergedClass(ref, className)` | Merges React `className` with component-set classes |
| `syncRef(elementRef, ref)` | Forwards ref to the underlying element |
| `useEventCallback(ref, event, handler)` | Bridges custom events to React callbacks |

Every wrapper uses `forwardRef` + props are synced as **element properties** (not HTML attributes) via `useBrowserLayoutEffect`:

```tsx
'use client';
export const PComponent = forwardRef(({ prop1, className, ...rest }, ref) => {
  const elementRef = useRef<HTMLElement | undefined>(undefined);
  const WebComponentTag = usePrefix('p-component');
  useBrowserLayoutEffect(() => {
    (elementRef.current as any)['prop1'] = prop1;
  }, [prop1]);
  return <WebComponentTag {...rest} class={useMergedClass(elementRef, className)} ref={syncRef(elementRef, ref)} />;
});
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
npm run test:unit:components-react
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

Run `npm run build` from the root to build all dependencies in order.

