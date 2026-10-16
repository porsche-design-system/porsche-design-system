# MDX components

Every component MDX imports, one folder each. This is the migration list for the dual-target registry of #4142
(`docs-components`): a folder moves there as a whole and gets a Markdown implementation next to its React one, see
[`docs-components-design.md`](https://github.com/porsche-design-system/porsche-design-system/blob/issue/4142/docs/docs-components-design.md).

## Rules

- MDX imports components only from here, each from its own file:
  `import { Notification } from '@/components/mdx/Notification/Notification';`. There is no index module.
- A folder holds a component and the helpers only it uses, such as its client part. Helpers of several components are in
  `shared/`, which MDX doesn't import; `mdx-components.tsx` maps Markdown to `shared/` (headings, paragraphs, code
  blocks and links).
- Inside this folder, imports are relative. An `@/…` import is a dependency on the Storefront, which the registry has to
  take along or replace; the tables below list them.
- `tests/unit/specs/mdxComponents.spec.ts` checks that MDX imports components only from here, and that every folder is
  listed below and used by MDX. `DocsLink` is the one exception until **Normalize MDX pages** (#4780) turns its uses
  into Markdown links.

## Inventory

The Markdown column is the output planned in the design. _Proposed_ marks components the design doesn't cover yet.

### Page structure

| Component         | Purpose                                                           | Markdown                                                | Storefront dependencies          |
| ----------------- | ----------------------------------------------------------------- | ------------------------------------------------------- | -------------------------------- |
| `TableOfContents` | Links to the `##` sections of a page.                             | Nothing; the headings provide the structure.            | `DocsLink`, `getHeadingAnchorId` |
| `ComponentStatus` | Marks a deprecated or experimental component next to its heading. | `**Status:** …`, only when the component is not stable. | –                                |

### Notices

| Component        | Purpose                                                                          | Markdown                                                                         | Storefront dependencies                       |
| ---------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | --------------------------------------------- |
| `Notification`   | A notice with a heading. `frameworks` shows it only for the frameworks it names. | A blockquote with the heading in bold; with `frameworks`, only in their outputs. | `useStorefrontFramework` (`FrameworkContent`) |
| `ContentCallout` | A highlighted aside, e.g. a shortcut above the regular instructions.             | _Proposed:_ a blockquote with the title in bold.                                 | –                                             |

### Framework-aware

Each resolves its content for every framework on the server and renders the selected one through
`shared/FrameworkContent`. A Markdown output is written for one framework and renders only its content.

| Component                                                    | Purpose                                                                    | Markdown                                        | Storefront dependencies                          |
| ------------------------------------------------------------ | -------------------------------------------------------------------------- | ----------------------------------------------- | ------------------------------------------------ |
| `FrameworkTabs`                                              | Selects the framework for the whole Storefront.                            | Nothing.                                        | `useStorefrontFramework`, `FRAMEWORKS_WITH_NEXT` |
| `FrameworkCodeBlock`                                         | Code built per framework, e.g. an install command.                         | The code of the output's framework.             | `resolveFrameworkValues`, `normalizeCodeBlock`   |
| `FrameworkLink`                                              | A link whose route depends on the framework.                               | _Proposed:_ the link of the output's framework. | `resolveFrameworkValues`, `DocsHref`, `DocsLink` |
| `StorefrontFramework` (`FrameworkPackage`, `FrameworkSkill`) | The selected framework's name or suffix, package and skill names, as text. | _Proposed:_ the text of the output's framework. | `resolveFrameworkValues`                         |

### Stories and examples

| Component                     | Purpose                                                                             | Markdown                                                                              | Storefront dependencies                                                                                                           |
| ----------------------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `Configurator`                | The playground of a component with controls for its props, slots and CSS variables. | The default story as a code block, followed by a link to the API page.                | `useStorefrontColorScheme`, `useStorefrontFramework`, `getFlags`                                                                  |
| `ComponentStory`              | A story with its code for every framework.                                          | A code block in the output's framework.                                               | `useStorefrontColorScheme`, `useStorefrontFramework`, `BackgroundColor`                                                           |
| `ComponentExample`            | A hand-written code sample from `shared/examples` with its live demo.               | A code block in the output's framework.                                               | `useStorefrontColorScheme`, `useStorefrontFramework`, `BackgroundColor`, `splitVanillaJsCode`, `createStackblitzMarkupFromSample` |
| `A11yIntegrationExamples`     | Pairs of an accessibility anti-pattern and its fix, per framework.                  | _Proposed:_ the skill's existing generator (`knowledge/components/accessibility.ts`). | `useStorefrontFramework`, `resolveFrameworkValues`                                                                                |
| `ExampleViewer`               | A pattern or template of `@porsche-design-system/examples`, with its description.   | The description, then a link to each source file and the live page.                   | `getExample`, `getBasePath`                                                                                                       |
| `WebsiteViewer`               | Frames a page, resizable, with its code and links to its source.                    | Links to the GitHub source and the live demo.                                         | `DocsLink`, `useResizeHandle`, `withMediaOrigin`, `localPorscheDesignSystemMajorVersion`                                          |
| `PartialDocs`                 | The usage and output of a partial, per framework.                                   | A table or list generated from the same data.                                         | `FrameworkWithNext`, the partials models and `getXPartialExample` utils                                                           |
| `StylesheetViewer`            | The formatted source of a published stylesheet.                                     | A link.                                                                               | –                                                                                                                                 |
| `OpenBugTemplateInStackBlitz` | Opens a bug report template in StackBlitz.                                          | A link.                                                                               | `ThemeSelect`                                                                                                                     |

### Data tables

They render meta packages through `shared/MetaTable`, and their descriptions through `shared/InlineMarkdown`.

| Component                    | Purpose                                                            | Markdown                                                        | Storefront dependencies |
| ---------------------------- | ------------------------------------------------------------------ | --------------------------------------------------------------- | ----------------------- |
| `ComponentApi`               | Props, events, slots and CSS variables of a component.             | The skill's existing generator (`knowledge/components/api.ts`). | `getFlags`              |
| `ComponentMetaOverview`      | The props, events and slots of every component, side by side.      | A table generated from the same data.                           | `getFlags`              |
| `ElementInternalsComponents` | The components that take part in forms through `ElementInternals`. | A list generated from the same data.                            | –                       |
| `TokensTable`                | Design tokens.                                                     | The skill's existing generator (the package skill serializers). | –                       |
| `StylesTable`                | The Emotion and vanilla-extract styles.                            | The skill's existing generator (the package skill serializers). | –                       |
| `ScssVariablesTable`         | SCSS variables.                                                    | The skill's existing generator (the package skill serializers). | –                       |
| `ScssMixinsTable`            | SCSS mixins.                                                       | The skill's existing generator (the package skill serializers). | –                       |
| `TailwindVariablesTable`     | Tailwind CSS theme variables.                                      | The skill's existing generator (the package skill serializers). | –                       |
| `TailwindUtilitiesTable`     | Tailwind CSS `@utility` classes.                                   | The skill's existing generator (the package skill serializers). | –                       |
| `CssVariablesTable`          | The CSS variables of the stylesheets.                              | The skill's existing generator (the package skill serializers). | –                       |
| `ColorSchemeClassesTable`    | The color scheme classes of the stylesheets.                       | The skill's existing generator (the package skill serializers). | –                       |
| `BrowserSupport`             | The browser versions a component needs.                            | A table.                                                        | –                       |
| `SkillFacts`                 | What a skill may do, on every skill page.                          | _Proposed:_ a table.                                            | –                       |

### Content

| Component     | Purpose                                                           | Markdown                                        | Storefront dependencies |
| ------------- | ----------------------------------------------------------------- | ----------------------------------------------- | ----------------------- |
| `ContentTabs` | Alternative variants of the same step, e.g. installation methods. | Every tab in order, each under its own heading. | –                       |
| `PromptBox`   | A prompt for an AI agent, with a copy button.                     | The prompt as a code block.                     | –                       |
| `Code`        | Inline code that doesn't wrap, or a value that isn't selectable.  | _Proposed:_ inline code.                        | –                       |
| `Pangram`     | A pangram in a script, in three font weights.                     | _Proposed:_ the pangram as text.                | –                       |

### Shared

Not imported by MDX.

| Module                 | Purpose                                                                       | Storefront dependencies                       |
| ---------------------- | ----------------------------------------------------------------------------- | --------------------------------------------- |
| `CodeBlock`            | Highlighted, scrollable code; also the code blocks of Markdown.               | –                                             |
| `MdxTypography`        | The headings and paragraphs of Markdown, for components that match its prose. | `DocsLink`, `getHeadingAnchorId`              |
| `InlineLink`           | A link within prose; also the links of Markdown.                              | `DocsLink`                                    |
| `InlineMarkdown`       | The bold, code and links of descriptions in the meta packages.                | –                                             |
| `MetaTable`            | A table with one row per meta entry.                                          | –                                             |
| `FrameworkContent`     | Renders the content of the selected framework, resolved on the server.        | `useStorefrontFramework`                      |
| `FrameworkCodePreview` | The framework tabs and the code they select.                                  | `useStorefrontFramework`, `FrameworkWithNext` |
| `Playground`           | A live demo above its code.                                                   | `BackgroundColor`                             |
