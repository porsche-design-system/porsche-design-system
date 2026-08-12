# Patterns (HTML)

Standalone HTML/CSS pattern demos. Shared chrome (head, header, footer) lives in `src/_partials/` and is inlined at
build time, so the generated pages are plain HTML with relative paths — no framework, no bundler runtime, no hashed
asset names.

## Commands

```bash
npm run start:patterns-html   # dev server on http://localhost:3006
npm run build:patterns-html   # writes ./dist

# or from within this package
npm start
npm run build
npm run preview               # build + serve ./dist on http://localhost:3007
```

## Structure

```text
src/
├── index.html          # overview page, links to all patterns
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

| Directive                                | Description                                                                                    |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `<!-- @props { "key": "value" } -->`     | File level values, inherited by every include in that file. Removed from the output.           |
| `<!-- @include _partials/header.html -->` | Inlines a partial. Accepts optional inline props that override the file level ones.            |
| `{{ key }}`                              | Raw substitution inside a partial. Can produce text content **or** an attribute value.         |

Rules:

- Include paths without a leading `./` resolve from `src/`; `./` and `../` resolve relative to the including file.
- Props are JSON, so keys and string values need double quotes. They may span multiple lines.
- Anything under `src/_partials/` is never emitted as a page.
- **URLs inside a partial are relative to the including page, not to the partial.** Pass a `basePath` prop
  (`"./"` at the root, `"../"` one level down) instead of hardcoding them.
- Every `src/**/*.html` becomes a page; all other files are copied verbatim.
- Unknown placeholders are replaced with an empty string and logged as a warning. Missing partials and circular
  includes fail the build.

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
nav item, visible `:focus-visible` outlines and a `forced-colors: active` block. Keep that baseline when adding
patterns — these demos are documentation, so they have to be correct by example.

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


