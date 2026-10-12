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

## Plan

1. **MDX component registry and strict renderer** (this design).
2. **Normalize the getting-started MDX:** replace dynamic content with registered components, and end each guide with
   the handoff to `npx pds-skill` and `pds-knowledge-{fw}`.
3. **Setup in the knowledge skill:** generate `references/getting-started/*.md` per framework (React: Vite, Next.js,
   React Router; js: Vanilla JS, Astro), link it from `SKILL.md`, and remove setup from its "Coverage and fallbacks"
   section.
4. **Storefront Markdown and `llms.txt`** (#4142).
5. **End-to-end check:** paste a getting-started `.md` URL into a fresh agent session and confirm that it produces a
   working project.
6. **Migrate the remaining pages** one area at a time, following `packages/storefront/projects/skills/FOLLOW_UP.md`, and
   align #4520 with the same registry.

Steps 3 and 4 are independent once step 2 is done.

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
| `renderMdxFileToMarkdown`              | Imports a page and renders it for a context. Shared by the skill generator and the Storefront `.md` build.                                                                                                                                                                                                                                |

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
  framework: 'js' | 'angular' | 'react' | 'vue';
  destination: 'skill' | 'web';
  resolveLink: (href: string) => string;
};
```

- `framework` selects framework-specific content and code.
- `destination` only changes where links and example files point: relative `references/…` paths in a skill, absolute
  Storefront URLs in a web `.md`. The content is the same for both, because both are read by agents. That's why there is
  one `MarkdownOnly`, not a `SkillOnly` and a `WebOnly`.
- `resolveLink` turns the Storefront's root-relative links (`/stylesheets/introduction/`) into the destination's form.
  It is the hook for the shared link tree from `FOLLOW_UP.md`.

## Frameworks

The Storefront's selected framework is client state (a context saved to localStorage, default `vanilla-js`), and a
global framework switch will extend it. Markdown is built ahead of time and cannot know a reader's choice, so it renders
every framework instead.

- **One vocabulary:** `shared`'s `Framework` (`vanilla-js`, `angular`, `react`, `vue`). The skill's `js` stays only the
  suffix of package and skill names (`frameworkSuffixMap`); `next` is a tab variant that resolves to `react`.
- **Same contract in both targets:** framework-aware components (`FrameworkNotification`, `FrameworkCodeBlock`,
  `FrameworkPackage`, `FrameworkSkill`, …) read the current framework. In React it comes from a `FrameworkContext` owned
  by `docs-components`, which the Storefront's provider fills from localStorage. In Markdown it comes from
  `context.framework`. The MDX does not change.
- **Three kinds of pages:**

  | Kind                                                | Detected by                                   | Files                                                           | Listed in                |
  | --------------------------------------------------- | --------------------------------------------- | --------------------------------------------------------------- | ------------------------ |
  | Independent (patterns, must-know)                   | renders identically for every framework       | `page.md`                                                       | every `llms-<fw>.txt`    |
  | Switchable (components, skills)                     | renders differently                           | `page.<fw>.md` per framework, and `page.md` as an index of them | its variant in each list |
  | Specific to one framework (`developing/react/*`, …) | `export const framework = 'react'` in the MDX | `page.md`                                                       | only `llms-react.txt`    |

  Each page is rendered for every framework (about 1.6 ms per extra render) and the results are compared, so only
  framework-specific pages declare anything. The plain `page.md` of a switchable page is an index of its variants, so an
  agent that guesses the URL from the HTML page never gets code for the wrong framework.

- **Per-framework lists:** `llms-<fw>.txt` lists the independent pages, that framework's variants and its guides
  (`llms-react.txt` includes Next.js and React Router). `llms.txt` introduces the Porsche Design System and links the
  four lists.
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
- **Snapshots:** every migrated page rendered for each framework and destination.
- **Parity:** the React and Markdown entry points export the same names.
- **Storefront:** the existing e2e and VRT tests for migrated pages must not change, which shows the React output is the
  same.

## Rollout

Migration goes one area at a time. A migrated page imports components only from the registry and is rendered by the new
pipeline. Pages that are not migrated yet keep the current pipeline (`renderMdxToMarkdown` in the skill generator). That
pipeline is deleted once the component pages are migrated.

1. **First slice (this pull request):** see [First slice](#first-slice).
2. All getting-started pages (plan step 2), then wire them into the skill (step 3) and the Storefront `.md` (step 4).
3. The remaining areas, ending with the component pages, which retires the old pipeline.

## First slice

The smallest version that shows the approach end to end:

- `packages/docs-components` with the runtime, `render`, the Node hook and five components, one folder each:
  `TableOfContents`, `Notification`, `DependencyList`, `StorefrontOnly` and `MarkdownOnly`. `TableOfContents` and
  `Notification` moved from the Storefront, which now re-exports them from their old paths.
- `developing/react/getting-started` migrated: it imports only from the registry, and `DependencyList` replaces the row
  of `PTag`s.
- `build:markdown` runs as the Storefront's `postbuild` and writes each migrated page into the export next to its HTML
  (`dist/developing/react/getting-started.md`), plus an `llms.txt` that lists them. Links get the deployment's base path
  (`/pr-4777/…`, `/v4.8.0/…`). Only the pages listed in `scripts/buildMarkdown.ts` are rendered, with their framework;
  `next dev` does not serve them. This is the minimal start of plan step 4; the skill (step 3) is not wired yet.

What it showed:

- **Expressions and imports resolve.** The dependency list with `@porsche-design-system/components-react@4` is in the
  Markdown. The current skill pipeline drops it, and the version comes from `package.json` through the `@/` alias, as in
  the Storefront.
- **Unregistered components fail with their position.** Rendering the unmigrated React Router page stops at its `PTag`
  with `page.mdx:22:3`. `PTag` is a `forwardRef` with an anonymous render function, so there is no name to report. The
  line from the development runtime is more useful anyway.
- **Re-exports are a migration bridge.** An unmigrated page that imports `@/components/common/TableOfContents` gets the
  registry's implementation in both targets, because the old path re-exports it. A page only fails on components that
  are not registered yet.
- **The React output is unchanged:** the Storefront serves the migrated page with the same four tags and table of
  contents.
- **Parity is enforced by the typechecker:** `src/parity.ts` fails when a component exists for only one target or when
  the two implementations take different props.
- **Cost is low:** see the build-time risk above.

## Open questions

- Should the Markdown build compile pages in-process with `@mdx-js/mdx`'s `evaluate` instead of a Node hook? The hook
  keeps imports resolving like the Storefront, but it needs Node's module hooks.
- Should the import check (MDX imports only from the registry and data modules) be a separate lint step? The runtime
  error covers components already.
