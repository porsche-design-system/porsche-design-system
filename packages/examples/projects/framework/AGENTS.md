# AGENTS.md — Examples: Framework

> This file provides context for AI coding assistants working in `packages/examples/projects/framework/`, the
> hand-written framework examples of [`packages/examples`](../../AGENTS.md), where their ids are defined.

## Overview

An example that needs logic a story cannot express is written by hand, once per framework, in the example app of every
wrapper (`components-js/src/examples`, `components-angular/src/app/examples`, `components-react/src/examples`,
`components-vue/src/examples`), which compiles it and runs its e2e tests. This project turns them into examples:

- **One `meta.ts` per example,** in the folder of its id: `src/components/select/set-value/meta.ts`, with its
  description next to it, `example.mdx` (`@porsche-design-system/examples-framework/<id>/example.mdx`). The meta holds
  the example's `title` (its heading, `Default` for a component's default example), the `components` it shows and its
  `source`, the kebab-case base name of its files (`'select-example-dynamic'` → `select-example-dynamic.html`,
  `select-example-dynamic.component.ts`, `SelectExampleDynamic.tsx`, `SelectExampleDynamic.vue`), or the four file names
  where they deviate from that (AG Grid).
- **`npm run build`** (in `build:examples:projects`) reads the sources and generates three entry points into
  `generated/`, gitignored:
  - `@porsche-design-system/examples-framework`: the examples as data – id, components and the code of every framework,
    as the code tabs, StackBlitz and the skills show it. By name (`selectExampleDynamic`), the code samples the
    Storefront hands its client components, and by id in the shape every project of `packages/examples` exports
    (`frameworkExamples`: `id`, `kind`, `title`, `description` as MDX source, `components`, `code`), which the catalogue
    of `@porsche-design-system/examples` merges. It imports no wrapper, so the skills build loads it before the wrappers
    are built.
  - `@porsche-design-system/examples-framework/examples/<id>`: every example as a module of its own – its data, its live
    React preview (`Preview`), a client component, and its `example.mdx` (`Description`). A page imports the examples it
    shows (through `@porsche-design-system/examples/<id>`), and so loads their previews only.
  - `@porsche-design-system/examples-framework/previews`: the previews by id (`frameworkExamplePreviews`), without the
    `standalone` ones (AG Grid), which the Storefront read until it imported its examples by id (#4789, removed in step
    7.4), and every preview by its own entry.

  The example modules and the previews are typechecked only by the package's `typecheck`, after the wrappers.

- A change to a source in a wrapper app or to a `meta.ts` needs that build again; `next dev` then reloads it.

## Commands

```bash
npm run build      # generates generated/ from src/**/meta.ts and the example apps, then typechecks the data
npm run typecheck  # the data, then the previews – which import the wrappers, so build those first
npm run test:unit  # ids, sources and the transformations, without a build
```
