# Porsche Design System - Components Vue

Porsche Design System is a component library designed to help developers create the best experience for software or
services distributed by Dr. Ing. h.c. F. Porsche AG. Visit the [Porsche Design System](https://designsystem.porsche.com)
to learn more.

## Using the Porsche Design System

### Installation

Run the following command using [npm](https://npmjs.com):

```bash
npm install @porsche-design-system/components-vue
```

If you prefer [Yarn](https://yarnpkg.com), use the following command instead:

```bash
yarn add @porsche-design-system/components-vue
```

### Usage

After adding the `@porsche-design-system/components-vue` package to your project, you've to extend your standard vue
setup by the `PorscheDesignSystemProvider` by adding it to your `App.vue` file.

```tsx
// App.vue
<script setup lang="ts">
  import { RouterLink, RouterView } from 'vue-router';
  import { PorscheDesignSystemProvider, PLinkPure } from '@porsche-design-system/components-vue';
</script>

<template>
  <PorscheDesignSystemProvider>
    <header>
      <nav>
        <PLinkPure>
          <RouterLink to="/">Home</RouterLink>
        </PLinkPure>
        <PLinkPure>
          <RouterLink to="/somePage">Some Page</RouterLink>
        </PLinkPure>
      </nav>
    </header>

    <div id="app">
      <RouterView />
    </div>
  </PorscheDesignSystemProvider>
</template>
```

### Plugin

You can also use the `PorscheDesignSystemPlugin` to extend your vue setup.

```ts
// main.ts
import { createApp } from 'vue';
import { createPorscheDesignSystem } from '@porsche-design-system/components-vue';

const app = createApp(App);
app.use(createPorscheDesignSystem({ prefix: 'my-prefix' }));
app.mount('#app');
```

### Composable

The `usePorscheDesignSystemPlugin` composable provides access to the `PorscheDesignSystemPlugin` context.

```ts
import { usePorscheDesignSystemPlugin } from '@porsche-design-system/components-vue';

const { isPorscheDesignSystemLoaded, componentsReady } = usePorscheDesignSystemPlugin();
```

## Methodology

Our goal is to provide easy-to-use and well-documented components so that developers don’t need to worry about the
implementation but can focus on easily creating qualitative and consistent digital Porsche experiences. We ensure that
our components are made for everyone and meet latest quality standards of usability, accessibility, performance and
compatibility. In some points the components are built restrictive to define consistent standards for diverse Porsche
applications but ensure enough flexibility to meet different context requirements.

## License

- See **Custom License** within npm package
