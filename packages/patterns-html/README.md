# Patterns (HTML)

Standalone HTML/CSS pattern demos. Shared chrome (head, header, footer) lives in `src/_partials/` and is inlined at
build time, so the generated pages are plain HTML with relative paths — no framework, no bundler runtime, no hashed
asset names.

## Commands

```bash
npm run start:patterns-html   # dev server on http://localhost:3006
npm run build:patterns-html   # writes ./dist
npm run test:unit:patterns-html

# or from within this package
npm start
npm run build
npm run test:unit
npm run preview               # build + serve ./dist on http://localhost:3007
```

## Structure

```text
src/
├── index.html          # overview page, links to all patterns
├── _data.json          # shared data (navigation, …) available to every page
├── _partials/          # shared building blocks, never emitted as pages
│   ├── head.html
│   ├── header.html
│   └── footer.html
├── assets/
│   └── patterns.css    # shared base, header and footer styles
├── landing-page/       # one folder per pattern
│   ├── index.html
│   └── styles.css
└── contact-page/
    ├── index.html
    ├── styles.css
    └── main.js
```

## Authoring

| Directive                                                  | Description                                                                                                             |
| ---------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `<!-- @props { "key": "value" } -->`                       | File level values, inherited by every include in that file. Removed from the output.                                    |
| `<!-- @include _partials/header.html -->`                  | Inlines a partial. Accepts optional inline props that override the file level ones.                                     |
| `<!-- @if expr -->` … `<!-- @else -->` … `<!-- @endif -->` | Conditional block. `expr` is `key`, `!key`, `a == b` or `a != b`, where each side is a dotted path or a JSON literal.   |
| `<!-- @each item in items -->` … `<!-- @endeach -->`       | Repeats its body for every entry of an array. Exposes `item` and `loop` (`index`, `number`, `first`, `last`, `length`). |
| `{{ key }}` / `{{ item.label }}`                           | Raw substitution. Can produce text content **or** an attribute value.                                                   |

Data:

- `src/_data.json` is loaded as the base scope of every page — put shared lists such as the main navigation there.
- Scope precedence is `_data.json` → file level `@props` → inline include props. Each step is a **shallow merge**, so
  redefining a key replaces its value completely (arrays are replaced, never merged or appended).
- Any JSON value works as a prop, including arrays of objects, so a page can render a different `@each` list than the
  shared one. [`src/landing-page/index.html`](src/landing-page/index.html) does exactly that for `navItems`.
- Files and folders starting with `_` are inputs only and are never emitted.

Rules:

- Include paths without a leading `./` resolve from `src/`; `./` and `../` resolve relative to the including file.
- Props are JSON, so keys and string values need double quotes. They may span multiple lines.
- **URLs inside a partial are relative to the including page, not to the partial.** Pass a `basePath` prop (`"./"` at
  the root, `"../"` one level down) instead of hardcoding them.
- Every `src/**/*.html` becomes a page; all other files are copied verbatim.
- Unknown placeholders are replaced with an empty string and logged as a warning. Missing partials, circular includes,
  unclosed blocks and non-array `@each` targets fail the build.

Limits (deliberate — see _Design notes_):

- Use real JSON booleans (`true`/`false`) in conditions; the string `"false"` is truthy. Empty arrays are falsy.
- `loop` is reserved inside `@each`.
- Blocks may nest freely, but a block cannot span an include boundary (no opening `@if` in a page and `@endif` in a
  partial).
- There is no `@elseif`; nest an `@if` inside `@else`.
- Whitespace and the line break directly around a directive are stripped, which keeps the generated markup tidy but also
  removes a space if you put a directive inline after content.

## Design notes

The engine is a small in-house one (`plugins/htmlInclude.ts`): a block parser producing a node tree, plus a minimal
expression evaluator. A tree is required because `@if` and `@each` nest, which flat regex replacement cannot express.

It stays in-house because the package is private and adding a template engine dependency triggers the monorepo's
dependency governance (syncpack, ORT license scanning). **If a feature request needs more than the above — filters,
arithmetic, macros, template inheritance — migrate to [Eleventy](https://www.11ty.dev/) instead of extending this.**
Eleventy's `addPassthroughCopy` preserves the same clean, unhashed output that motivated this setup. The unit tests in
`tests/unit/` describe the full contract and make such a migration verifiable.

## Tooling notes

- `src/_partials/**` is excluded from Biome in [`biome.json`](../../biome.json): partials are templates, so `{{ … }}`
  placeholders are not parseable HTML.
- The Biome formatter is disabled for `src/**/*.html` (the linter stays on) so hand-authored markup is not rewritten.

## Adding a pattern

1. Create `src/<pattern-name>/index.html` (plus `styles.css` / `main.js` as needed).
2. Add `<!-- @props … -->` with `basePath`, `title`, `description` and the nav state.
3. Include `_partials/head.html`, `_partials/header.html` and `_partials/footer.html`.
4. Link the pattern from `src/index.html`.

## Accessibility baseline

Every page ships a skip link, `header`/`main`/`footer` landmarks, labelled `nav` elements, `aria-current` on the active
nav item, visible `:focus-visible` outlines and a `forced-colors: active` block. Keep that baseline when adding patterns
— these demos are documentation, so they have to be correct by example.

## Using Porsche Design System components

The demos are deliberately framework free. To use real PDS web components, add a `transformIndexHtml` plugin that
injects the CDN partials (`getComponentChunkLinks()`, `getFontLinks()`, `getLoaderScript()`), the same way
[`packages/components-js/vite.config.js`](../components-js/vite.config.js) does. The include plugin composes with it —
just keep `order: 'pre'` on the include plugin so partials are expanded first.

## How it works

[`plugins/htmlInclude.ts`](plugins/htmlInclude.ts) exports a pure `expandIncludes()` string transform plus a thin Vite
plugin wrapper. The dev server uses the plugin (with a watcher that full-reloads on partial changes),
[`scripts/build.ts`](scripts/build.ts) uses the same function and copies everything else untouched. One implementation,
so dev and build can't drift apart.
