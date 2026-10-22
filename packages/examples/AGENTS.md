# AGENTS.md — Examples

> This file provides context for AI coding assistants working in `packages/examples/`. See the root
> [`AGENTS.md`](../../AGENTS.md) for project-wide guidance.

## Overview

`packages/examples` is the one home of every PDS example (#4789). Each kind of example is a project of its own below
`projects/`: an npm workspace with its own dependencies, build, typecheck and tests. The package itself,
`@porsche-design-system/examples`, is the one interface to all of them (see _Interface_), and its scripts build and
typecheck the projects in the order the root build needs.

| Project                                     | Package                                     | What it holds                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ------------------------------------------- | ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`projects/pages`](projects/pages/)         | `@porsche-design-system/examples-pages`     | The patterns and templates: pages written in TSX, rendered to static HTML, one Vite project each. See its [`AGENTS.md`](projects/pages/AGENTS.md).                                                                                                                                                                                                                                                                                                                      |
| [`projects/framework`](projects/framework/) | `@porsche-design-system/examples-framework` | The hand-written framework examples: the code of every framework as data, and their live React previews and descriptions. See its [`AGENTS.md`](projects/framework/AGENTS.md).                                                                                                                                                                                                                                                                                          |
| [`projects/stories`](projects/stories/)     | `@porsche-design-system/examples-stories`   | The stories: every component's default story (`components/<component>/default/story.ts`), which the configurator starts from, the examples written as stories, each with its description (`story.ts`, `example.mdx`), and the accessibility examples, an anti-pattern and its recommendation each (`components/<component>/accessibility/<slug>/example.ts`). An example story's title is in a `meta.ts` next to it. See its [`AGENTS.md`](projects/stories/AGENTS.md). |

**Every example has an id** that never changes once something references it: lowercase kebab-case segments joined by
`/`, the folder of the example below its project's `src/`. It names neither the kind of the example nor a framework, so
an example keeps its id when its format changes:

| Example                                    | Id                                            | For instance                                                               |
| ------------------------------------------ | --------------------------------------------- | -------------------------------------------------------------------------- |
| An example of a component                  | `components/<tag without p->/<slug>`          | `components/select/async-filter`                                           |
| The default example the configurator shows | `components/<component>/default`              | `components/toast/default`                                                 |
| An accessibility example                   | `components/<component>/accessibility/<slug>` | `components/button/accessibility/icon-only-button-without-accessible-name` |
| A pattern or a template                    | its path, as `ExamplePath` names it           | `patterns/header/overlay`                                                  |
| An example of something else               | `<Storefront route>/<slug>`                   | `ag-grid/theme/compact`                                                    |

`default` is only ever the last segment, and `accessibility` only appears in the ids of the accessibility examples.
[`tests/unit/specs/ids.spec.ts`](tests/unit/specs/ids.spec.ts) checks the ids of all projects together: unique, well
formed, reserved segments respected.

## Interface

`@porsche-design-system/examples` exposes every example in one shape, whatever its project, in two ways:

| Entry point                            | What it holds                                                                                                                                                   | Who loads it                                                        |
| -------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| `@porsche-design-system/examples`      | The catalogue: every example by id as data, an `Example` of its kind                                                                                            | Anything – Node scripts, the server – before the wrappers are built |
| `@porsche-design-system/examples/<id>` | One example as a module: its data and what renders it – a story example's stories, a framework example's `Preview`, the `Description` (`example.mdx`) of either | A page that shows it; it needs the MDX loader and Next              |

Every project generates both in the same shape for every kind: its examples as data (`storyExamples`,
`accessibilityExamples`, `frameworkExamples`, `pageExamples`) and one module per example (`generated/examples/<id>.ts`).
The root only merges the data ([`src/`](src/)), and its `build:projects` re-exports every example's module by its id
([`scripts/build.ts`](scripts/build.ts) into `generated/`). [`src/types.ts`](src/types.ts) defines what every project
exports:

- **`Example`**, a union by `kind` (`story`, `framework`, `accessibility`, `pattern`, `template`) over what every
  example has: `id`, `title` (its heading, in the Storefront and in the skills), `description` (MDX source; plain text
  for a page) and `components`. Stories and framework examples add their `code` for every framework, pages their project
  `files` and `url`, accessibility examples the snippets of `antiPattern` and `recommended`.
- **`ExampleId`**, the union of the ids of every project.
- **`examples`**, the catalogue: every example by id. Data only, so it loads before the wrappers are built; large, so
  import it on the server. A project can't import these types, so it declares its own with the same fields; assigning
  its examples to `Examples` fails the typecheck when they drift apart.
- **An example's module** is what a page imports to show it:
  `import form from '@porsche-design-system/examples/components/button/form'`, then `<Example example={form} />`. Its
  stories and previews are `'use client'`, and a Next page loads every client module its server code can reach – also
  through a dynamic `import()` – so one module per example, imported by the page, is what keeps a page to the examples
  it shows.

The catalogue takes a story's code from `getStoryMarkup` on its own state, in the light color scheme, as the skills do.
A default story is titled `Default`; an example story's title comes from its `meta.ts`, a framework example's from its
own, a page's from its `meta` export and an accessibility example's from its `name`.

## Build

The root build runs the two steps at different points, because the skills need the examples before the wrappers are
built, and the previews need the wrappers:

- **`build:examples:projects`**, before `build:skills`: generates the indexes and the example modules of the framework
  examples and of the stories, renders the pages into their projects, makes every example importable by its id and
  typechecks the catalogue. Nothing it runs or typechecks may need a built wrapper.
- **`build:examples:site`**, after the wrappers: typechecks the framework previews, the stories (the accessibility
  examples included) and the example modules of this package, which import the React wrapper's types, then builds the
  pages' projects into the self-contained pages the Storefront copies (`projects/pages/dist-site/`).

The stories and the framework examples export their TypeScript and MDX source, and what their build generated
(`generated/`), not a bundle: the Storefront compiles them (`transpilePackages` in
[`next.config.ts`](../storefront/next.config.ts), and `@source` in its `globals.css` for their Tailwind classes), so
`next dev` reloads a change to them like one to its own files. This package exports its source too. The pages export a
bundle, `dist/examples.js`, which `build:examples:projects` writes.

**Descriptions are MDX** (`example.mdx`), next to the example they describe, and the Storefront compiles them like its
own pages. They import nothing from the Storefront; the one component they use, `Notification`, comes from the
Storefront's `mdx-components.tsx`. The Storefront's MDX tests (`links.spec.ts`, `mdxPages.spec.ts`) cover them. A
story's module starts with `'use client'`, because the Storefront hands the story, functions included, to its client
components.

## Commands

```bash
npm run build:examples            # build:examples:projects, then build:examples:site
npm run build:examples:projects   # needs no built wrapper – what build:skills reads
npm run build:examples:site       # needs the built wrappers
npm run typecheck:examples        # every project
npm run typecheck:examples:tests  # the test scopes of every project
npm run clean:examples:build

npm run start:examples            # the pages' dev server – see projects/pages/AGENTS.md for their tests
npm run test:unit:examples-catalogue  # the ids of all projects
npm run test:unit:examples-framework
```

A project has no root `typecheck` entry of its own: `typecheck:examples` fans out to every project, and
`typecheck:examples:tests` calls their test scopes (see [`docs/typecheck.md`](../../docs/typecheck.md)).
