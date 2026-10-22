# AGENTS.md — Examples: Framework

> This file provides context for AI coding assistants working in `packages/examples/projects/framework/`, the
> hand-written framework examples of [`packages/examples`](../../AGENTS.md), where their ids are defined.

## Overview

An example that needs logic a story cannot express is written by hand, once per framework, in the example app of every
wrapper (`components-js/src/examples`, `components-angular/src/app/examples`, `components-react/src/examples`,
`components-vue/src/examples`), which compiles it and runs its e2e tests. This project turns them into examples:

- **One `meta.ts` per example,** in the folder of its id: `src/components/select/set-value/meta.ts`, with its
  description next to it, `example.mdx`, which the example's module imports. The meta holds the example's `title` (its
  heading, `Default` for a component's default example), the `components` it shows and its `source`, the kebab-case base
  name of its files (`'select-example-dynamic'` → `select-example-dynamic.html`, `select-example-dynamic.component.ts`,
  `SelectExampleDynamic.tsx`, `SelectExampleDynamic.vue`), or the four file names where they deviate from that (AG
  Grid).
- **`npm run build`** (in `build:examples:projects`) reads the sources and generates two entry points into `generated/`,
  gitignored:
  - `@porsche-design-system/examples-framework`: the examples as data, by id, in the shape every project of
    `packages/examples` exports (`frameworkExamples`: `id`, `kind`, `title`, `description` as MDX source, `components`,
    and the `code` of every framework, as the code tabs, StackBlitz and the skills show it), which the catalogue of
    `@porsche-design-system/examples` merges. It imports no wrapper, so the skills build loads it before the wrappers
    are built.
  - `@porsche-design-system/examples-framework/examples/<id>`: every example as a module of its own – its data, its live
    React preview (`Preview`), a client component, and its `example.mdx` (`Description`). A page imports the examples it
    shows (through `@porsche-design-system/examples/<id>`), and so loads their previews only.

  The previews themselves (`generated/previews/`, named by their React source) are internal to the example modules. They
  import `react`, the React wrapper and, for AG Grid, `ag-grid-react` and `ag-grid-community` – peer dependencies, as
  the app that renders them has to provide exactly one of each. The example modules and the previews are typechecked
  only by the package's `typecheck`, after the wrappers.

- A change to a source in a wrapper app or to a `meta.ts` needs that build again; `next dev` then reloads it.
- The build fails on an id that breaks the rules of [`../../lib/ids.ts`](../../lib/ids.ts), an empty description or a
  file below `src/` that belongs to no example; what it shares with the stories' build is in [`../../lib`](../../lib/).

## Commands

```bash
npm run build      # generates generated/ from src/**/meta.ts and the example apps, then typechecks the data (tsconfig.data.json)
npm run typecheck  # the data, then the previews and modules (tsconfig.json) – which import the wrappers, so build those
                   # first – and the build (tsconfig.scripts.json)
npm run test:unit  # the sources and the transformations, without a build
```
