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
from the story. The Storefront meta files import the stories and descriptions by path
(`@porsche-design-system/examples-stories/components/select/slots/story`, `…/example.mdx`).

**`npm run build`** (in `build:examples:projects`) imports every example and generates two entry points into
`generated/`, gitignored, in the shape every project of [`packages/examples`](../../AGENTS.md) exports. It fails on an
id that breaks the scheme, a missing title, a module that exports more than its stories, or a file that belongs to no
example.

- `@porsche-design-system/examples-stories`: the examples as data – `id`, `kind`, `title`, `description` (MDX source),
  `components` and the `code` of every framework, from `getStoryMarkup` on the story's own state (`storyExamples`), and
  the snippets of both sides of every accessibility example (`accessibilityExamples`). It imports no story, so the
  skills build and the server read it before the wrappers are built.
- `@porsche-design-system/examples-stories/runtime`: what renders every story example by id,
  `{ story, slotStories?, controlledStory?, controlledSlotStories?, Description? }`. A default story's exports are told
  apart by their value and by `Controlled` in their name (`popoverControlledSlotStories`).

A change to a story, a `meta.ts` or a description needs that build again for the generated entry points; the Storefront
pages that import the stories directly reload without it.

## Commands

```bash
npm run build      # generates generated/ from src/, then typechecks the data
npm run typecheck  # the data, then the stories and the generator – which import the wrappers' types, so build those first
```
