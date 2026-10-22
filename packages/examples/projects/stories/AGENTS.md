# AGENTS.md — Examples: Stories

> This file provides context for AI coding assistants working in `packages/examples/projects/stories/`, the stories and
> accessibility examples of [`packages/examples`](../../AGENTS.md), where their ids are defined.

## Overview

The examples written as element trees for `@porsche-design-system/story-generator`, one folder per example, named by its
id below `src/`:

| Folder                                         | Files                                                                                                                                                                  |
| ---------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `components/<component>/default/`              | `story.ts`: the story the configurator starts from, with its slot stories and, for a component with a controlled mode, a controlled variant of both. Titled `Default`. |
| `components/<component>/<slug>/`               | `story.ts` exporting one story, `meta.ts` with its `title`, and its description, `example.mdx`.                                                                        |
| `components/<component>/accessibility/<slug>/` | `example.ts` exporting one `AccessibilityExample`, an anti-pattern and its recommendation; its `name` is its title.                                                    |

A story's module starts with `'use client'`, because the Storefront hands the story, functions included, to its client
components. That is why its title lives in a `meta.ts` of its own: the server reads it from the generated index, never
from the story. A page imports an example through `@porsche-design-system/examples/<id>`; the component's meta lists its
id.

**`npm run build`** (in `build:examples:projects`) imports every example and generates two entry points into
`generated/`, gitignored, in the shape every project of [`packages/examples`](../../AGENTS.md) exports. It fails on an
id that breaks the scheme, a missing title, an empty description, a module that exports more than its stories, or a file
that belongs to no example.

- `@porsche-design-system/examples-stories`: the examples as data – `id`, `kind`, `title`, `description` (MDX source),
  `components` and the `code` of every framework, from `getStoryMarkup` on the story's own state (`storyExamples`), and
  the snippets of both sides of every accessibility example (`accessibilityExamples`). It imports no story, so the
  skills build and the server read it before the wrappers are built.
- `@porsche-design-system/examples-stories/examples/<id>`: every example as a module of its own – its data and, for a
  story example, its stories (`{ story, slotStories?, controlledStory?, controlledSlotStories? }`) and its
  `Description`. A default story's exports are told apart by their value and by `Controlled` in their name
  (`popoverControlledSlotStories`). A page imports the examples it shows (through
  `@porsche-design-system/examples/<id>`), and so loads their stories only.

How a story module becomes an example – which export is which story, and the module generated for it – is in
[`lib/stories.ts`](lib/stories.ts); the id rules and the rest the builds share are in [`../../lib`](../../lib/).

A change to a story or a description reloads in `next dev`, because the example's module imports them; the data (the
titles, the code and the descriptions as the skills read them) and a new or removed example need that build again.

**Tests** (`tests/unit/specs/`) run without a build: `stories.spec.ts` covers `lib/stories.ts`, `examples.spec.ts` reads
`src/` as the build does – one example per folder, valid ids below their component, a default story per component, a
title for every example story, no empty description, and both sides of every accessibility example resolved for every
framework.

## Commands

```bash
npm run build      # generates generated/ from src/, then typechecks the data (tsconfig.data.json)
npm run typecheck  # the data, then the stories and the modules (tsconfig.json) and the build (tsconfig.scripts.json) –
                   # which import the wrappers' types, so build those first
npm run test:unit  # lib/stories.ts and the sources, without a build
```
