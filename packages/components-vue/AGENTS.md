# AGENTS.md — Components Vue Package

> This file provides context for AI coding assistants working in `packages/components-vue/`.
> See the root [`AGENTS.md`](../../AGENTS.md) for project-wide guidance.

## Overview

This package contains the **Vue 3 wrapper** for Porsche Design System web components.

## Structure

```
packages/components-vue/
├── src/                    # Vite dev app for testing
├── projects/
│   └── vue-wrapper/        # Generated Vue wrapper components
├── scripts/                # Build scripts
└── tests/                  # Test files
```

## Commands

```bash
# Start dev server
yarn start:components-vue

# Build wrapper
yarn build:components-vue

# Run unit tests
yarn test:unit:components-vue
```

## Usage

### Plugin Registration

```typescript
import { createApp } from 'vue';
import { PorscheDesignSystemPlugin } from '@porsche-design-system/components-vue';
import App from './App.vue';

const app = createApp(App);
app.use(PorscheDesignSystemPlugin);
app.mount('#app');
```

### Component Import

```vue
<script setup lang="ts">
import { PButton, PLink } from '@porsche-design-system/components-vue';
</script>

<template>
  <PButton>Click me</PButton>
  <PLink href="/path">Link</PLink>
</template>
```

## Accessibility

All accessibility requirements from the root [`AGENTS.md`](../../AGENTS.md) apply. When using PDS Vue components:

- **Prefer PDS components** over custom implementations
- Pass ARIA attributes via the component's `:aria` prop when needed
- Avoid placing `aria-*` attributes directly on the component element
- Ensure keyboard navigation works with wrapped components

## Testing

Tests are located in the `tests/` directory. When modifying wrapper behavior:

- Ensure wrapped components maintain accessibility
- Verify ARIA attribute passthrough works correctly
- Test v-model bindings if applicable

## Build Dependencies

This package requires these to be built first:

1. `shared`, `tokens`, `assets`, `styles`, `utilities`, `component-meta`
2. `components`
3. `components-js`

Run `yarn build` from the root to build all dependencies in order.

