# MDX components

Every component MDX imports, grouped by how pages use them, one folder each. This is the migration list for the
dual-target registry of #4142 (`docs-components`): a folder moves there as a whole and gets a Markdown implementation
next to its React one, see
[`docs-components-design.md`](https://github.com/porsche-design-system/porsche-design-system/blob/issue/4142/docs/docs-components-design.md).

## Rules

- MDX imports a component from its folder: `import { Notification } from '@/components/mdx/content/Notification';`. Each
  folder has an `index.ts` that exports the component and nothing else.
- A folder holds the component and the modules only it uses, such as its client part. A module several components of a
  topic use sits next to their folders, e.g. `framework/FrameworkContent.tsx`. `elements/` holds what Markdown syntax
  renders to, which `mdx-components.tsx` takes from `elements/mdxComponents.tsx`. MDX imports neither.
- Inside this folder, imports are relative. An `@/…` import is a dependency on the Storefront, which the registry has to
  take along or replace. The tables below name them, and `STOREFRONT_DEPENDENCIES` in the spec lists the allowed ones.
- `tests/unit/specs/mdxComponents.spec.ts` checks the imports, the folders, this inventory and the Storefront
  dependencies. `tests/unit/specs/mdxPages.spec.ts` checks the pages: no unused imports, no PDS components, Markdown
  instead of HTML, tables of contents and notification heading levels.

## Inventory

The Markdown column is the output planned in the design. _Proposed_ marks components the design doesn't cover yet.

### `elements/` What Markdown syntax renders to

| Module              | Purpose                                                                      | Storefront dependencies          |
| ------------------- | ---------------------------------------------------------------------------- | -------------------------------- |
| `mdxComponents.tsx` | The mapping of Markdown syntax to React: headings, lists, tables, links, …   | `DocsHref`                       |
| `Typography.tsx`    | Headings `H1`–`H6` and paragraphs `P`, also for components that match prose. | `DocsLink`, `getHeadingAnchorId` |
| `CodeBlock.tsx`     | Highlighted, scrollable code, for code blocks and components.                | –                                |
| `InlineLink.tsx`    | A link within prose, for Markdown links and components.                      | `DocsLink`                       |

### `structure/` Page structure

| Component         | Purpose                                                           | Markdown                                                | Storefront dependencies          |
| ----------------- | ----------------------------------------------------------------- | ------------------------------------------------------- | -------------------------------- |
| `TableOfContents` | Links to the `##` sections of a page.                             | Nothing; the headings provide the structure.            | `DocsLink`, `getHeadingAnchorId` |
| `ComponentStatus` | Marks a deprecated or experimental component next to its heading. | `**Status:** …`, only when the component is not stable. | –                                |

### `content/` Building blocks for prose

| Component        | Purpose                                                                          | Markdown                                                                         | Storefront dependencies                       |
| ---------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | --------------------------------------------- |
| `Notification`   | A notice with a heading. `frameworks` shows it only for the frameworks it names. | A blockquote with the heading in bold; with `frameworks`, only in their outputs. | `useStorefrontFramework` (`FrameworkContent`) |
| `ContentCallout` | A highlighted aside, e.g. a shortcut above the regular instructions.             | _Proposed:_ a blockquote with the title in bold.                                 | –                                             |
| `ContentTabs`    | Alternative variants of the same step, e.g. installation methods.                | Every tab in order, each under its own heading.                                  | –                                             |
| `PromptBox`      | A prompt for an AI agent, with a copy button.                                    | The prompt as a code block.                                                      | –                                             |
| `Code`           | Inline code that doesn't wrap, or a value that isn't selectable.                 | _Proposed:_ inline code.                                                         | –                                             |
| `DependencyList` | The dependencies a guide is based on, e.g. `react@19`.                           | A list of `name@version`.                                                        | –                                             |
| `DownloadList`   | Files in `public/` to download.                                                  | _Proposed:_ a list of links to the files.                                        | –                                             |
| `Flag`           | A decorative flag in front of a heading, e.g. the script of a pangram.           | Nothing; the text names what it stands for.                                      | –                                             |

### `framework/` Content that follows the selected framework

Each component resolves its content for every framework on the server and renders the selected one through
`FrameworkContent`. A Markdown output is written for one framework and renders only its content.

| Component                  | Purpose                                                                                                       | Markdown                                        | Storefront dependencies                          |
| -------------------------- | ------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- | ------------------------------------------------ |
| `FrameworkTabs`            | Selects the framework for the whole Storefront.                                                               | Nothing.                                        | `useStorefrontFramework`, `FRAMEWORKS_WITH_NEXT` |
| `FrameworkCodeBlock`       | Code built per framework, e.g. an install command.                                                            | The code of the output's framework.             | `resolveFrameworkValues`, `normalizeCodeBlock`   |
| `FrameworkLink`            | A link whose route depends on the framework.                                                                  | _Proposed:_ the link of the output's framework. | `resolveFrameworkValues`, `DocsHref`, `DocsLink` |
| `FrameworkName`            | The selected framework's name or suffix; `FrameworkPackage` and `FrameworkSkill` its package and skill names. | _Proposed:_ the text of the output's framework. | `resolveFrameworkValues`                         |
| `FrameworkContent.tsx`     | Renders the content of the selected framework, resolved on the server.                                        | –                                               | `useStorefrontFramework`                         |
| `FrameworkCodePreview.tsx` | The framework tabs and the code they select.                                                                  | –                                               | `useStorefrontFramework`, `FrameworkWithNext`    |

### `playground/` Live demos with their code

| Component                        | Purpose                                                                                                                                                           | Markdown                                                               | Storefront dependencies                                                                                        |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `Configurator`                   | The playground of a component's default example (`example={…}`): controls for its props, slots and CSS variables, or the code and preview of a framework example. | The default story as a code block, followed by a link to the API page. | `useStorefrontColorScheme`, `useStorefrontFramework`, `getFlags`                                               |
| `ComponentStory`                 | A story with its code for every framework; `Example` renders a story example with it, the styles pages and the accessibility statement their own stories.         | A code block in the output's framework.                                | `useStorefrontColorScheme`, `useStorefrontFramework`                                                           |
| `ComponentExamplePlayground.tsx` | A framework example's code with its live preview, which `Example` renders.                                                                                        | A code block in the output's framework.                                | `useStorefrontColorScheme`, `useStorefrontFramework`, `splitVanillaJsCode`, `createStackblitzMarkupFromSample` |
| `Playground.tsx`                 | A live demo above its code.                                                                                                                                       | –                                                                      | –                                                                                                              |

### `examples/` Framed pages and accessibility code pairs

| Component                 | Purpose                                                                                                                                                                             | Markdown                                                                              | Storefront dependencies                                                                  |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `Example`                 | An example of `@porsche-design-system/examples`, imported by its id (`example={…}`): its title, description and preview, for a story, a framework example, a pattern or a template. | Its title, description and code, from the catalogue.                                  | `toDeployedExample`, `getExampleHeading`, `getBasePath`                                  |
| `WebsiteViewer`           | Frames a page, resizable, with its code and links to its source.                                                                                                                    | Links to the GitHub source and the live demo.                                         | `DocsLink`, `useResizeHandle`, `withMediaOrigin`, `localPorscheDesignSystemMajorVersion` |
| `A11yIntegrationExamples` | Pairs of an accessibility anti-pattern and its fix, per framework, by id from the catalogue.                                                                                        | _Proposed:_ the skill's existing generator (`knowledge/components/accessibility.ts`). | `useStorefrontFramework`                                                                 |

### `reference/` Generated from meta packages and published files

The tables render their entries through `MetaTable.tsx` and their descriptions through `InlineMarkdown.tsx`.

| Component                    | Purpose                                                            | Markdown                                                        | Storefront dependencies                                                 |
| ---------------------------- | ------------------------------------------------------------------ | --------------------------------------------------------------- | ----------------------------------------------------------------------- |
| `ComponentApi`               | Props, events, slots and CSS variables of a component.             | The skill's existing generator (`knowledge/components/api.ts`). | `getFlags`                                                              |
| `ComponentOverview`          | The props, events and slots of every component, side by side.      | A table generated from the same data.                           | `getFlags`                                                              |
| `ElementInternalsComponents` | The components that take part in forms through `ElementInternals`. | A list generated from the same data.                            | –                                                                       |
| `TokensTable`                | Design tokens.                                                     | The skill's existing generator (the package skill serializers). | –                                                                       |
| `StylesTable`                | The Emotion and vanilla-extract styles.                            | The skill's existing generator (the package skill serializers). | –                                                                       |
| `ScssVariablesTable`         | SCSS variables.                                                    | The skill's existing generator (the package skill serializers). | –                                                                       |
| `ScssMixinsTable`            | SCSS mixins.                                                       | The skill's existing generator (the package skill serializers). | –                                                                       |
| `TailwindVariablesTable`     | Tailwind CSS theme variables.                                      | The skill's existing generator (the package skill serializers). | –                                                                       |
| `TailwindUtilitiesTable`     | Tailwind CSS `@utility` classes.                                   | The skill's existing generator (the package skill serializers). | –                                                                       |
| `CssVariablesTable`          | The CSS variables of the stylesheets.                              | The skill's existing generator (the package skill serializers). | –                                                                       |
| `ColorSchemeClassesTable`    | The color scheme classes of the stylesheets.                       | The skill's existing generator (the package skill serializers). | –                                                                       |
| `PartialDocs`                | The usage and output of a partial, per framework.                  | A table or list generated from the same data.                   | `FrameworkWithNext`, the partials models and `getXPartialExample` utils |
| `StylesheetViewer`           | The formatted source of a published stylesheet.                    | A link.                                                         | –                                                                       |
| `MetaTable.tsx`              | A table with one row per meta entry.                               | –                                                               | –                                                                       |
| `InlineMarkdown.tsx`         | The bold, code and links of descriptions in the meta packages.     | –                                                               | –                                                                       |

### `widgets/` Used on one or two pages

Candidates for plain Markdown before they get a Markdown implementation of their own.

| Component                     | Purpose                                       | Markdown                         | Storefront dependencies |
| ----------------------------- | --------------------------------------------- | -------------------------------- | ----------------------- |
| `BrowserSupport`              | The browser versions a component needs.       | A table.                         | –                       |
| `SkillFacts`                  | What a skill may do, on every skill page.     | _Proposed:_ a table.             | –                       |
| `Pangram`                     | A pangram in a script, in three font weights. | _Proposed:_ the pangram as text. | –                       |
| `OpenBugTemplateInStackBlitz` | Opens a bug report template in StackBlitz.    | A link.                          | `ThemeSelect`           |
