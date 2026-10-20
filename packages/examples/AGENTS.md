# AGENTS.md — Examples

> This file provides context for AI coding assistants working in `packages/examples/`. See the root
> [`AGENTS.md`](../../AGENTS.md) for project-wide guidance.

## Overview

`packages/examples` is the one home of every PDS example (#4789). Each kind of example, and the tooling they share, is a
project of its own below `projects/`: an npm workspace with its own dependencies, build, typecheck and tests. The
package itself holds no code yet; its scripts build and typecheck the projects in the order the root build needs.

| Project                                                 | Package                                         | What it holds                                                                                                                                                                                                             |
| ------------------------------------------------------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`projects/pages`](projects/pages/)                     | `@porsche-design-system/examples-pages`         | The patterns and templates: pages written in TSX, rendered to static HTML, one Vite project each. See its [`AGENTS.md`](projects/pages/AGENTS.md).                                                                        |
| [`projects/framework`](projects/framework/)             | `@porsche-design-system/examples-framework`     | The hand-written framework examples: the code of every framework as data, and their live React previews (`/previews`). See its [`AGENTS.md`](projects/framework/AGENTS.md).                                               |
| [`projects/stories`](projects/stories/)                 | `@porsche-design-system/examples-stories`       | The stories: every component's default story (`components/<component>/default/story.ts`), which the configurator starts from, and the examples written as stories, each with its description (`story.ts`, `example.mdx`). |
| [`projects/accessibility`](projects/accessibility/)     | `@porsche-design-system/examples-accessibility` | The accessibility examples, an anti-pattern and its recommendation each (`components/<component>/accessibility/<slug>/example.ts`).                                                                                       |
| [`projects/story-generator`](projects/story-generator/) | `@porsche-design-system/story-generator`        | The story types, the markup of a story for every framework (`getStoryMarkup`, `wrapCode`) and its live React rendering (`StoryPreview`, the `/react` subpath).                                                            |

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

## Build

The root build runs the two steps at different points, because the skills need the examples before the wrappers are
built, and the previews need the wrappers:

- **`build:examples:projects`**, before `build:skills`: generates the framework examples and renders the pages into
  their projects. Nothing it runs or typechecks may need a built wrapper.
- **`build:examples:site`**, after the wrappers: typechecks the framework previews, the stories, the accessibility
  examples and the story generator, which import the React wrapper's types, then builds the pages' projects into the
  self-contained pages the Storefront copies (`projects/pages/dist-site/`).

The stories, the accessibility and framework examples and the story generator export their TypeScript and MDX source,
not a build: the Storefront compiles them (`transpilePackages` in [`next.config.ts`](../storefront/next.config.ts), and
`@source` in its `globals.css` for their Tailwind classes), so `next dev` reloads a change to them like one to its own
files. The pages export a bundle, `dist/examples.js`, which `build:examples:projects` writes.

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
npm run test:unit:examples-framework
npm run test:unit:story-generator
```

A project has no root `typecheck` entry of its own: `typecheck:examples` fans out to every project, and
`typecheck:examples:tests` calls their test scopes (see [`docs/typecheck.md`](../../docs/typecheck.md)).
