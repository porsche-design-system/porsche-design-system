# AGENTS.md — Examples: Framework

> This file provides context for AI coding assistants working in `packages/examples/projects/framework/`, the
> hand-written framework examples of [`packages/examples`](../../AGENTS.md), where their ids are defined.

## Overview

An example that needs logic a story cannot express is written by hand, once per framework, in the example app of every
wrapper (`components-js/src/examples`, `components-angular/src/app/examples`, `components-react/src/examples`,
`components-vue/src/examples`), which compiles it and runs its e2e tests. This project turns them into examples:

- **One `meta.ts` per example,** in the folder of its id: `src/components/select/set-value/meta.ts`, with its
  description next to it, `example.mdx` (`@porsche-design-system/examples-framework/<id>/example.mdx`). The meta lists
  the `components` the example shows and its `source`, the kebab-case base name of its files (`'select-example-dynamic'`
  → `select-example-dynamic.html`, `select-example-dynamic.component.ts`, `SelectExampleDynamic.tsx`,
  `SelectExampleDynamic.vue`), or the four file names where they deviate from that (AG Grid).
- **`npm run build`** (in `build:examples:projects`) reads the sources and generates two entry points into `generated/`,
  gitignored:
  - `@porsche-design-system/examples-framework`: the examples as data – id, components and the code of every framework,
    as the code tabs, StackBlitz and the skills show it – by id (`frameworkExamples`) and by name
    (`selectExampleDynamic`). It imports no wrapper, so the skills build loads it before the wrappers are built.
  - `@porsche-design-system/examples-framework/previews`: the live React preview of every example by id
    (`frameworkExamplePreviews`), a client component each, for the server components of the Storefront to render. Every
    page whose server graph imports the map loads all of its previews, so an example with a large dependency is
    `standalone` in its meta (AG Grid): it is left out of the map, and its page imports the preview by its own entry,
    `…/previews/<Name>`. Typechecked only by the package's `typecheck`, after the wrappers.
- A change to a source in a wrapper app or to a `meta.ts` needs that build again; `next dev` then reloads it.

## Commands

```bash
npm run build      # generates generated/ from src/**/meta.ts and the example apps, then typechecks the data
npm run typecheck  # the data, then the previews – which import the wrappers, so build those first
npm run test:unit  # ids, sources and the transformations, without a build
```
