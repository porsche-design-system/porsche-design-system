# Design: dual-target MDX components

> **Status:** proposal. A first slice is implemented in `packages/docs-components`. Tracked in #4142, umbrella #4771.

## Summary

The Storefront's MDX is the source for both the HTML pages that people read and the Markdown that agents read: the
`pds-knowledge-{fw}` skills and, with #4142, a `.md` version of every Storefront page.

Today the two outputs come from different pipelines. Next compiles the MDX to React. The skill generator parses it into
an mdast tree without running it and serializes that tree to Markdown (`renderMdxToMarkdown`). Every JSX component the
generator does not know is dropped silently, and every `{expression}` is dropped with it. For example, the
getting-started pages lose their whole dependency list (`<PTag>…@{localPorscheDesignSystemMajorVersion}</PTag>`).

This design replaces the silent, lossy path with a **registry of dual-target components**. Each component MDX may use
has a React and a Markdown implementation. Both targets run the same MDX, and anything that is not registered fails the
build.

## Target architecture

The goal is **one source of truth** for everything PDS documents, rendered into every output: the Storefront's HTML, the
Storefront's Markdown for agents and the `pds-knowledge-{fw}` skills. Today the skill generator has its own pipeline
(`renderMdxToMarkdown`, `rewriteDocLinks`, hand-written sections in `SKILL.md`) and drifts from the Storefront. At the
end, it is one consumer of a shared core among others.

```
 Sources (written once)                Core (packages/docs-components)                 Outputs
 ───────────────────────               ───────────────────────────────                 ───────────────────────────
 MDX pages (Storefront routes,    ┌─▶  registry: React + Markdown per component  ─▶   Storefront HTML (Next, React)
 later package-owned docs)        │
 structured meta (componentMeta,  ├─▶  1. collect  → page manifest                     Web Markdown (dist/)
 tokens, Tailwind CSS, examples,  │    2. render   → mdast per page × framework   ─▶    <route>.md, <route>.<fw>.md,
 deprecations)                    │    3. resolve  → links per destination              llms.txt
                                  │    4. check    → every link targets a page    ─▶   Skill per framework
                                  └─▶  data components delegate to meta renderers       references/<route>.md,
                                                                                         SKILL.md (instructions + index)
```

- **Page manifest:** collected once from the MDX: route, title, description, section, kind (specific, independent,
  switchable) and frameworks. `llms.txt`, the index in `SKILL.md`, link resolution and link checking all read it.
- **Routes identify pages.** Authors keep writing Storefront routes (`/partials/introduction/`). Each destination
  resolves them after all pages are known, on the mdast tree instead of with a regex:

  | Destination | `/partials/introduction/` becomes                                                                                                                                                        |
  | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | Storefront  | unchanged; Next adds the deployment's base path                                                                                                                                          |
  | Web `.md`   | `/<base>/partials/introduction.md`; for a switchable target the variant of the framework being rendered, from an independent page its index; the HTML page if the target has no Markdown |
  | Skill       | a relative path (`../partials/introduction.md`) if the page is in the skill, otherwise the exact-version Markdown (`https://designsystem.porsche.com/v4.8.0/partials/introduction.md`)   |

  A link to a route that does not exist fails the build. This replaces the semantic `LINKTREE` from `FOLLOW_UP.md`.

- **Content lives once, in fragments; each output has its own layout.** Pages are already composed of fragments: a
  component's `*.meta.ts` holds its introduction, accessibility overview, tests and examples as MDX, and the Storefront
  arranges them into tabs. An output may arrange the same fragments differently when that serves its readers, because
  composed MDX renders like any other part of a page. Layouts never hold content of their own.
  - **Pages mirror the routes by default:** `references/developing/react/getting-started.md` in a skill,
    `developing/react/getting-started.md` on the web. A framework's skill contains the independent pages, its variants
    of the switchable ones and its own guides (React: React, Next.js, React Router).
  - **Components are one reference each in the skill** (`references/components/p-button/p-button.md`, with
    `accessibility.md` and the example files next to it), as today. An agent needs usage, API, accessibility and
    examples together, and one read instead of five saves tool calls; at about 11 KB (`p-button`) to 15 KB (`p-select`)
    the size is fine. The Storefront keeps its tabs, which serve navigation and live demos. The web Markdown may offer
    the same combined file (`components/button.md`, with its framework variants) next to the per-tab files; this is
    decided in the component step.
  - **The same applies to the styling solutions:** one reference each in the skill (`references/styles/tailwindcss.md`),
    several pages on the Storefront.
  - **Layouts iterate, they do not enumerate.** A component's meta lists its fragments, and every layout walks that
    list, so a fragment added for the Storefront cannot be forgotten in the skill.
  - **Links map routes to references.** `skillLinks` takes a route-to-reference mapping that defaults to
    `references/<route>.md`. All tabs of a component map to its combined reference plus the section's anchor
    (`/components/button/api/` → `components/p-button/p-button.md#api`), and a styling solution's pages to its one
    reference. This replaces the special case in `rewriteDocLinks` and the package route references, and the link check
    stays unchanged because the tab routes remain pages of the manifest.
- **`SKILL.md` and `llms.txt` share the manifest but not their shape.** `llms.txt` lists every page. `SKILL.md` is
  loaded whenever the skill is used, so it keeps its hand-written instructions (version safety, framework syntax) and
  links sections, not every page. Its "Coverage and fallbacks" shrinks to "everything else: the exact-version `.md`".
- **Data components** (`ComponentApi`, `TokensTable`, …) delegate to the existing meta-to-Markdown generators, moved
  into the core, so each table has one Markdown implementation.

## Plan

Each step is one reviewable pull request. The first builds the whole system end to end, but only for the getting-started
pages; every later step widens what it covers. Pages not migrated yet keep the current pipelines until their step.

1. **The whole system for getting started (this pull request):**
   - the registry, the Markdown runtime and renderer, and the framework model;
   - one set of MDX options (`@porsche-design-system/docs-components/mdx-options`) for Next and the Markdown hook;
   - the page manifest, link resolution per destination on the mdast tree, and a build error for links to unknown
     routes;
   - all getting-started pages migrated, each ending with a recommended step that links the Agent Skills with
     `npx pds-skill`;
   - Storefront Markdown and `llms.txt` (#4142);
   - the skill generator renders them into `references/<route>.md`, links them from `SKILL.md` through the manifest and
     falls back to exact-version Markdown; setup leaves "Coverage and fallbacks";
   - verified end to end: a getting-started `.md` URL pasted into a fresh agent session produces a working project.
2. **Authoring feedback:** a way to see a page's Markdown while writing it (a dev route or watch script, "View as
   Markdown"), and size budgets for `SKILL.md` and the references in CI. Small, and it pays off in every later step.
3. **Framework-aware components:** `FrameworkContext` in `docs-components`, filled by the Storefront's framework
   provider (the base for the global framework switch), and the first framework-aware components
   (`FrameworkNotification`, `FrameworkCodeBlock`, `FrameworkPackage`, …).
4. **Migrate the areas** one per pull request: Must Know, partials, patterns and templates, styles, tokens, … Each
   registers the components it needs. Styles keep one skill reference per styling solution, through a layout and the
   route-to-reference mapping.
5. **Data components:** move the meta-to-Markdown generators of the skill into the core and register `ComponentApi`,
   `TokensTable`, `StylesTable` and the like. Aligns #4520.
6. **Component pages:** migrate them last. The skill keeps one reference per component, rendered from the component's
   fragments by a skill layout that iterates over the fragments its meta lists, and `skillLinks` maps every tab route to
   that reference. Decide whether the web Markdown offers the combined file too. Then delete the old pipeline
   (`renderMdxToMarkdown`, `rewriteDocLinks`, `skill-mdx-loader.cjs`'s parse path). Every page is strict from then on.
7. **Discovery:** `Accept: text/markdown` served with `<route>.md` by a CloudFront Function,
   `<link rel="alternate" type="text/markdown">`, "Copy as Markdown", a root `/llms.txt` for the current major and
   `llms-full.txt` per framework.
8. **Agent evals:** tasks an agent has to solve with the Markdown or the skill alone ("set up PDS from this URL", "build
   this form"), run on changes to the core and the registry. The end-to-end check of step 1 is their first case.

**Separate track:** search across the documentation for agents, as an MCP or search endpoint over the same Markdown
(#4108). It complements the static files rather than replacing them.

## Architecture and approach

**Run the MDX for both targets.** The Markdown target compiles each MDX file with `@mdx-js/mdx` and runs it, with a
Markdown JSX runtime in place of React's. Expressions, imported values (such as the PDS version) and composed MDX (such
as `<buttonMeta.introduction />`) resolve exactly as they do in the Storefront, because they are the same code.

**Explicit imports from one registry, resolved by export conditions.** MDX files keep importing their components, but
only from `@porsche-design-system/docs-components`. The package's `exports` map has a `markdown` condition and a
`default` one. Next resolves `default`, the React implementations. The Markdown build runs Node with
`--conditions=markdown` and gets the Markdown implementations. Editor support and standard Node resolution stay intact.

**A private top-level workspace.** `packages/docs-components` is the authoring contract for every MDX file: Storefront
pages now, and package-owned docs such as the Tailwind CSS `docs/*.mdx` (#4520) later. The registered React components
move there from the Storefront. The React wrapper and Next are peer dependencies, which avoids a workspace cycle.

**mdast as the Markdown output.** Markdown renderers return mdast nodes. A page is serialized once, with the options the
skill already uses, so nesting and escaping are structural and the formatting is the same for every component.

```
                      ┌──────────── default condition ─────────────┐
page.mdx ── import ──▶│ @porsche-design-system/docs-components     │──▶ React ──▶ Storefront HTML
                      └──────────── markdown condition ────────────┘
                                         │
                                         ▼
          @mdx-js/mdx + Markdown JSX runtime ──▶ element tree ──▶ render(context) ──▶ mdast ──▶ Markdown
                                                                                              ├─▶ skill references
                                                                                              └─▶ Storefront .md
```

## Components

One folder per component, with both implementations side by side:

```
src/
├── components/
│   └── Notification/
│       ├── Notification.tsx           React implementation, NotificationProps and JSDoc for authors
│       └── Notification.markdown.ts   Markdown implementation and JSDoc with an example of its output
├── react.ts       every *.tsx            (`default` condition)
├── markdown.ts    every *.markdown.ts    (`markdown` condition)
├── parity.ts      compares the two entry points
└── renderer/      the engine: JSX runtime, render, Node hook
```

The two implementations have to be separate files. If one file held both, the Markdown build would load the React
implementation and its imports too. The Markdown file imports the props with `import type`, which TypeScript erases.

Hovering a component in MDX shows the JSDoc of the React implementation, because TypeScript resolves the `default`
condition. That JSDoc says what the component is for and, in one sentence, what it becomes in Markdown. The JSDoc of the
Markdown implementation documents the exact output, with an `@example` where there is output.

| Piece                                  | Responsibility                                                                                                                                                                                                                                                                                                                            |
| -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `components/<Name>/<Name>.tsx`         | The React implementation, used by the Storefront through the `default` condition, and its props type.                                                                                                                                                                                                                                     |
| `components/<Name>/<Name>.markdown.ts` | The Markdown implementation, created with `defineMarkdownComponent(name, renderer)`, which tags it as registered.                                                                                                                                                                                                                         |
| `renderer/jsx-runtime`                 | `jsx`, `jsxs`, `jsxDEV` and `Fragment`. Builds a lazy element tree, like React elements, and calls nothing.                                                                                                                                                                                                                               |
| `render(tree, context)`                | Walks the tree. HTML elements (what MDX compiles Markdown syntax to) become hast. A registered component's renderer gets its props and the context and returns mdast. Nested MDX content renders recursively. Anything else throws. `hast-util-to-mdast` turns the result into one mdast tree, which `mdast-util-to-markdown` serializes. |
| `register` (Node hook)                 | Compiles `.mdx` imports with `@mdx-js/mdx`, the Markdown JSX runtime and the same remark plugins as the Storefront (`remark-gfm`), and marks each `MDXContent` so composed MDX is recognized. Compiles in development mode, so every element carries its line in the MDX file for error messages.                                         |
| `collectPages`, `pageToMarkdown`       | Collect the page manifest, then write a page for a destination with `webLinks` or `skillLinks`. Shared by the skill generator and the Storefront `.md` build.                                                                                                                                                                             |

### Strictness

- **Components:** the Markdown runtime throws `Unregistered component "<name>"` for any function component that is
  neither registered nor compiled MDX. A storefront-only React component imported by MDX therefore fails the build with
  a message that names it.
- **HTML elements:** allowed are the elements MDX itself emits for Markdown syntax (headings, `p`, lists, `blockquote`,
  `pre`/`code`, `a`, `img`, `strong`/`em`/`del`, `br`, `hr`, tables) plus `div` and `span` as plain containers. Anything
  else, such as `input` or `button`, throws.
- **Raw PDS components** (`PTag`, `PButton`, `PLink`, …) are not allowed in MDX. Each use gets a semantic registry
  component, such as `DependencyList` instead of a row of `PTag`s.
- **Pairing:** every React export has a Markdown export with the same name and props type. A type-level check and a unit
  test enforce both.

### Markdown output per component

| Component                                                                           | Markdown                                                                                                                                                                   |
| ----------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `TableOfContents`                                                                   | Nothing; the headings already provide the structure.                                                                                                                       |
| `Notification`                                                                      | A blockquote with the heading in bold.                                                                                                                                     |
| `FrameworkNotification`, `FrameworkTabs`, `FrameworkCodeBlock`                      | Only the content for the framework being rendered.                                                                                                                         |
| `ContentTabs`                                                                       | Every tab in order, each under its own heading.                                                                                                                            |
| `ComponentStatus`                                                                   | `**Status:** …` only when the component is not stable.                                                                                                                     |
| `ComponentStory`, `ComponentExample`                                                | A fenced code block in the current framework, from `createFrameworkMarkup`.                                                                                                |
| `Configurator`                                                                      | The default story as a code block, followed by a link to the API page.                                                                                                     |
| `ExampleViewer`                                                                     | The description, then a link to each source file and the live page. The skill links its local `references/examples` copies, the web `.md` the files the deployment serves. |
| `WebsiteViewer`                                                                     | Links to the GitHub source and the live demo.                                                                                                                              |
| `BrowserSupport`                                                                    | A table.                                                                                                                                                                   |
| `PromptBox`                                                                         | The prompt as a code block.                                                                                                                                                |
| `StylesheetViewer`, `OpenBugTemplateInStackBlitz`                                   | A link.                                                                                                                                                                    |
| `PartialDocs`, `ElementInternalsComponents`, `ComponentMetaOverview`, `License`     | A table or list generated from the same data.                                                                                                                              |
| `ComponentApi`, `TokensTable`, `StylesTable`, `Scss*`, `Tailwind*`, `CssVariables*` | The skill's existing generators (`api.ts`, the package skill serializers), so each table has one Markdown implementation.                                                  |
| `DependencyList`                                                                    | A list of `name@version`.                                                                                                                                                  |
| `StorefrontOnly`                                                                    | Nothing. Its children render only in React.                                                                                                                                |
| `MarkdownOnly`                                                                      | Its children. Renders nothing in React. For instructions aimed at agents.                                                                                                  |

## Data and state

There is no global state. The Markdown runtime only builds a tree, and `render` passes an explicit context down to every
renderer:

```ts
type MarkdownContext = {
  framework: 'vanilla-js' | 'angular' | 'react' | 'vue';
  renderChildren: (children: unknown) => RootContent[];
};
```

Rendering depends only on the framework. Where the Markdown is read changes only where its links point, so rendering
keeps the Storefront's routes in every link, and `pageToMarkdown` resolves them for a destination afterwards, once every
page is known (see [Target architecture](#target-architecture)). The content is the same for the Storefront and the
skill, because both are read by agents. That's why there is one `MarkdownOnly`, not a `SkillOnly` and a `WebOnly`.

The page manifest is a list of `Page`s, collected once per build by `collectPages`: route, source file, `metadata`,
kind, frameworks and the rendered mdast tree per framework. `createSite` adds every route of the app, so links can be
checked against pages that have no Markdown yet.

## Frameworks

The Storefront's selected framework is client state (a context saved to localStorage, default `vanilla-js`), and a
global framework switch will extend it. Markdown is built ahead of time and cannot know a reader's choice, so it renders
every framework instead.

- **One vocabulary:** `shared`'s `Framework` (`vanilla-js`, `angular`, `react`, `vue`). The skill's `js` stays only the
  suffix of package and skill names (`frameworkSuffixMap`); `next` is a tab variant that resolves to `react`.
- **Same contract in both targets:** framework-aware components (`FrameworkNotification`, `FrameworkCodeBlock`,
  `FrameworkPackage`, `FrameworkSkill`, …) read the current framework. In React it comes from a `FrameworkContext` owned
  by `docs-components`, which the Storefront's provider fills from localStorage. In Markdown it comes from
  `context.framework`. The MDX does not change. Not built yet: no framework-aware component is registered so far.
- **Three kinds of pages:**

  | Kind                                                | Detected by                                   | Files                                                           | `llms.txt` entry                                   |
  | --------------------------------------------------- | --------------------------------------------- | --------------------------------------------------------------- | -------------------------------------------------- |
  | Independent (patterns, must-know)                   | renders identically for every framework       | `page.md`                                                       | a link to `page.md`                                |
  | Switchable (components, skills)                     | renders differently                           | `page.<fw>.md` per framework, and `page.md` as an index of them | a link to `page.md`, followed by the four variants |
  | Specific to one framework (`developing/react/*`, …) | `export const framework = 'react'` in the MDX | `page.md`                                                       | a link to `page.md`; the title names the framework |

  Each page is rendered for every framework (about 1.6 ms per extra render) and the results are compared, so only
  framework-specific pages declare anything. The plain `page.md` of a switchable page is an index of its variants, so an
  agent that guesses the URL from the HTML page never gets code for the wrong framework.

- **One `llms.txt`:** every page is listed once, grouped by section, as the llmstxt.org format expects. A switchable
  page's entry links its index and then its four variants on the same line, so an agent reaches the right variant
  without the detour through the index. Lists per framework would repeat every page up to four times and are not part of
  the convention, so agents would not look for them. A split per framework pays off only for a future `llms-full.txt`
  with the full content (#4771).
- **Discovery:** each HTML page links every Markdown variant with `<link rel="alternate" type="text/markdown">`. A later
  "Copy as Markdown" button picks the variant of the selected framework.

## Trade-offs and alternatives

| Decision             | Chosen                                  | Alternatives                                                                                                                                                                                                                                                                             |
| -------------------- | --------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Markdown output      | Run the MDX with a Markdown JSX runtime | **A:** parse without running and map literal props to Markdown, as today. Safe and needs no runtime, but can't resolve expressions, imports or composed MDX. **C:** React → HTML → Markdown with rehype-remark. One render path, but the conversion loses detail and is hard to control. |
| Providing components | Explicit imports with export conditions | **Provider only:** no imports in MDX, components passed through `mdx-components.tsx`. MDX's missing-reference error gives strictness for free, but there is no editor support and nothing documents where a component comes from.                                                        |
| Location             | `packages/docs-components`              | **Next to the skill generator:** less to move, but package-owned MDX would depend on the Storefront. **A subpath of `shared`:** first in the build order, but `shared` would then contain React UI and depend on the wrapper.                                                            |
| Renderer output      | mdast nodes                             | **Markdown strings:** simplest to write, but nested components and escaping need care in every renderer.                                                                                                                                                                                 |
| Target-specific text | `StorefrontOnly`, `MarkdownOnly`        | **`SkillOnly`, `WebOnly`:** a skill and a web `.md` are both read by agents, so splitting them is not worth a second dimension.                                                                                                                                                          |

## Risks and mitigations

| Risk                                                                                                          | Mitigation                                                                                                                                                                                                                                                 |
| ------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Every import of a page has to load in Node: the `@/` alias, `next/link`, stories that use wrapper components. | The Markdown build runs from the Storefront with `tsx`, which resolves its `tsconfig` paths. The wrapper stub from `skill-mdx-loader.cjs` stays until the stories are data only. Registered components never import Next in their Markdown implementation. |
| Running 880 pages × 4 frameworks makes the build slower.                                                      | Measured in the slice: about 45 ms to compile and render a page the first time, about 1.6 ms per further render. The whole Storefront stays well under a minute.                                                                                           |
| MDX compiles Markdown syntax to HTML elements, so the Markdown target converts hast back to mdast.            | The set of elements is small and known, and `hast-util-to-mdast` is the standard converter. Snapshot tests of real pages catch formatting changes.                                                                                                         |
| Registered React components live outside the Storefront, so Tailwind CSS no longer sees their classes.        | `globals.css` adds `@source` for `packages/docs-components`.                                                                                                                                                                                               |
| An unregistered component inside `StorefrontOnly` never reaches the Markdown runtime.                         | Intended: it's the escape hatch for content that only makes sense in a browser. Review keeps it rare.                                                                                                                                                      |

## Testing strategy

- **Unit:** the runtime and `render` (HTML elements, fragments, composed MDX, unregistered components and elements
  throw), and each Markdown renderer.
- **Snapshots:** every migrated page in the skill's tree snapshots; the link resolution for both destinations in the
  fixtures of `docs-components`.
- **Parity:** the React and Markdown entry points export the same names.
- **Storefront:** the existing e2e and VRT tests for migrated pages must not change, which shows the React output is the
  same.

## Rollout

See [Plan](#plan). Migration goes one area at a time. A migrated page imports components only from the registry and is
rendered by the new pipeline; pages that are not migrated yet keep the current pipelines until their step.

## This pull request

The whole system, for the getting-started pages only:

- `packages/docs-components` with the runtime, `render`, the Node hook, the page manifest and link resolution, and five
  components, one folder each: `TableOfContents`, `Notification`, `DependencyList`, `StorefrontOnly` and `MarkdownOnly`.
  `TableOfContents` and `Notification` moved from the Storefront, which re-exports them from their old paths.
- All seven getting-started pages migrated. Each imports only from the registry, declares its framework (Astro and
  Vanilla JS: `vanilla-js`; Next.js and React Router: `react`), lists its dependencies with `DependencyList` and ends
  with a recommended step that links the Agent Skills with `npx pds-skill` and names the `pds-knowledge-{fw}` skill. The
  step reads the same on the Storefront, in its Markdown and in the skill, so no Markdown-only component is needed.
- `src/utils/markdownPages.ts` in the Storefront decides which pages are written as Markdown, for both builds.
- `build:markdown` runs as the Storefront's `postbuild` and writes each page into the export next to its HTML
  (`dist/developing/react/getting-started.md`) and `llms.txt`. Links point to the Markdown of the same deployment
  (`/pr-4777/…`, `/v4.8.0/…`) or to the HTML of pages without Markdown. `next dev` does not serve them.
- `build:skills` renders the same pages into `references/developing/<framework>/getting-started.md` of the skills they
  apply to (React: React, Next.js, React Router; js: Vanilla JS, Astro), lists them in a `## Getting started` section of
  `SKILL.md`, and links pages outside the skill to the exact-version Storefront. The SSR section links the local Next.js
  and React Router guides, and setup leaves "Coverage and fallbacks".

What it showed:

- **Expressions and imports resolve.** The dependency lists, with the version from `package.json` through the `@/`
  alias, are in the Markdown. The previous skill pipeline dropped them.
- **Unregistered components fail with their position,** e.g. `page.mdx:22:3` for a `PTag`, which as a `forwardRef` with
  an anonymous render function has no name to report.
- **Links are checked.** Every link in the seven guides targets an existing route; a fixture shows the build error for
  one that does not.
- **The React output is unchanged:** the Storefront serves every guide with the same tags and table of contents.
- **Both loaders coexist.** With the hook and the `markdown` condition added, the skill build's output for the component
  docs, still parsed by `skill-mdx-loader.cjs`, stays byte for byte the same.
- **Parity is enforced by the typechecker:** `src/parity.ts` fails when a component exists for only one target or when
  the two implementations take different props.
- **Cost is low:** see the build-time risk above.
- **Known gap:** a link to a page the skill covers through a package reference (e.g. `/tailwindcss/introduction/` →
  `references/styles/tailwindcss.md`) still points to the Storefront. It resolves locally once that area is migrated.

## Known gaps

Compared with the alternatives (docs frameworks with an AI export such as Fumadocs or Mintlify, edge conversion such as
Cloudflare's Markdown for Agents, Markdown- or data-first sources, MCP retrieval services and hand-written skills), this
approach is the only one that combines strictness, framework variants and version-exact skills from one source. It still
falls short in these places:

| Gap                                                                                                                                                        | Addressed in                                                                                   |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| ~~Next and the Markdown hook configured MDX separately, so a plugin added to one would change only that output.~~                                          | step 1 (fixed)                                                                                 |
| No `Accept: text/markdown` and no alternate link; agents find the Markdown only through `llms.txt` or a guessed URL.                                       | step 7                                                                                         |
| No search across the documentation; with every page migrated, agents browse `llms.txt`.                                                                    | separate track                                                                                 |
| A pipeline of our own to maintain: JSX runtime, Node module hooks (not yet stable in Node), `tsx`, and two loaders until the component pages are migrated. | step 6 removes the old loader; keep the core small and tested, consider `module.registerHooks` |
| No Markdown preview while writing; errors appear at build time only.                                                                                       | step 2                                                                                         |
| Tests check structure, not whether an agent succeeds with the result.                                                                                      | step 8                                                                                         |
| No size budgets, so `SKILL.md` and references can grow unnoticed.                                                                                          | step 2                                                                                         |
| Every component MDX uses needs a Markdown renderer (about 55); the Markdown is only as good as each of them.                                               | steps 3 to 6                                                                                   |
| Heading anchors differ: the Storefront derives IDs with `kebabCase`, Markdown readers with their own slugs.                                                | step 4, by deriving the Storefront's IDs the same way                                          |
| Docs owned by other packages (the Tailwind CSS docs, #4520) would make `styles` depend on the registry, whose React side needs the wrapper.                | step 5                                                                                         |
| Next.js folds into React, so Next-specific content disappears from `.react.md`.                                                                            | a variant where a page needs it                                                                |

## Open questions

- Should the Markdown build compile pages in-process with `@mdx-js/mdx`'s `evaluate` instead of a Node hook? The hook
  keeps imports resolving like the Storefront, but it needs Node's module hooks.
- Should the import check (MDX imports only from the registry and data modules) be a separate lint step? The runtime
  error covers components already.
