# patterns-html vs. patterns-nunjucks vs. patterns-jsx

Three packages, same three demo pages, same Tailwind setup, same build contract. The only variable is the template
layer. This document records what each swap actually costs and buys.

Measured on 2026-08-12 with `nunjucks@3.2.4`, `preact@10.29.8` and `preact-render-to-string@6.7.0`.

| Package                             | Template layer                                         | Ports     |
| ----------------------------------- | ------------------------------------------------------ | --------- |
| [`patterns-html`](../patterns-html) | In-house `@include` / `@if` / `@each` engine           | 3006/3007 |
| [`patterns-nunjucks`](.)            | [Nunjucks](https://mozilla.github.io/nunjucks/)        | 3008/3009 |
| [`patterns-jsx`](../patterns-jsx)   | TSX components rendered with `preact-render-to-string` | 3010/3011 |

## Generated output

`dist/` is **structurally identical** in all three. Build them and compare:

```bash
npm run build:patterns-html && npm run build:patterns-nunjucks && npm run build:patterns-jsx
diff -r packages/patterns-html/dist packages/patterns-nunjucks/dist
diff -r packages/patterns-html/dist packages/patterns-jsx/dist
```

All three produce plain HTML with relative paths, no hashed asset names and no framework runtime. `assets/patterns.css`
and `contact-page/main.js` are byte-identical across all three.

Remaining HTML differences, beyond deliberately reworded prose ("partials" → "layout and macros" / "partial
components"):

- **Nunjucks** — identical indentation, but only because the layout pipes macro output through `| trim | indent(4)`,
  which the in-house engine did implicitly.
- **JSX** — no blank lines between sections (a renderer cannot preserve source blank lines), and inline elements are
  broken across lines by the formatter rather than glued with `>text</a`. JSX drops the whitespace between elements that
  sit on separate lines, so the build formats with `htmlWhitespaceSensitivity: 'ignore'`; inline whitespace in the
  output is therefore decided by the formatter, not by the source.

Template keywords and prose leaking into the Tailwind scan is a permanent tax on both non-native options: `{% block %}`
in Nunjucks, and any code comment in JSX (a doc comment mentioning "`{% block content %}`" or "relative to the page"
emits `.block` / `.relative` until it is reworded). All three packages use `@import "tailwindcss" source(none)` with
explicit `@source` entries, which removed the larger class of false positives that came from scanning the package
README. What survives that has to be excluded candidate by candidate — `patterns-nunjucks` carries an
`@source not inline("block")` for its own `{% block %}` tags — so the tax is payable, but only once per keyword and only
after someone notices the stray rule.

## Cost

|                          | `patterns-html`                      | `patterns-nunjucks`                                                 | `patterns-jsx`                                    |
| ------------------------ | ------------------------------------ | ------------------------------------------------------------------- | ------------------------------------------------- |
| Runtime dependencies     | none                                 | `nunjucks` + 3 transitive (`a-sync-waterfall`, `asap`, `commander`) | `preact`, `preact-render-to-string`, 0 transitive |
| Installed size           | 0                                    | ~2.1 MB                                                             | ~2.8 MB (plus `prettier`, already in the repo)    |
| Licenses to review (ORT) | none                                 | BSD-2-Clause, 3× MIT                                                | 2× MIT                                            |
| Engine code to maintain  | 352 lines (`plugins/htmlInclude.ts`) | 102 lines (`plugins/nunjucks.ts`)                                   | 109 lines (`plugins/jsx.ts`)                      |
| Build script             | 51 lines                             | 58 lines                                                            | 62 lines                                          |
| Unit tests               | 168 lines / 29 tests                 | 216 lines / 41 tests                                                | 279 lines / 49 tests                              |

Both alternatives replace ~250 lines of parser with a dependency that syncpack, the lockfile, Dependabot and the monthly
ORT scan all have to carry. JSX has the smaller dependency graph of the two (no transitive packages) but the largest
test suite, because there is more surface worth pinning down: pages are code, not markup.

## Capabilities

| Capability             | In-house engine                   | Nunjucks                                               | JSX / TSX                                             |
| ---------------------- | --------------------------------- | ------------------------------------------------------ | ----------------------------------------------------- |
| Template inheritance   | ✗ (chrome re-included per page)   | `{% extends %}` + `{% block %}`                        | `children` on a layout component                      |
| Parameterised partials | props object, unchecked           | macros with named/default parameters                   | component props, **type-checked**                     |
| Typo in a value        | warning, renders empty string     | build error (`throwOnUndefined`)                       | **compile error**, flagged in the editor              |
| Conditions             | `key`, `!key`, `a == b`, `a != b` | full expression language                               | plain TypeScript                                      |
| Loops                  | `@each` + `loop` helper           | `{% for %}` + `loop` + `{% else %}`                    | `Array.prototype.map()`                               |
| Filters / formatting   | ✗                                 | `default`, `indent`, `trim`, `safe`, `length`, …       | plain functions                                       |
| Auto-escaping          | ✗ (raw substitution)              | on by default, opt out with `safe`                     | on by default, opt out with `dangerouslySetInnerHTML` |
| Shared data            | `_data.json`, ambient scope       | `_data.json`, ambient scope                            | `_data.ts`, **imported explicitly**                   |
| Whitespace control     | automatic                         | `trimBlocks` / `lstripBlocks` + explicit `{%-` / `-%}` | none — the formatter decides (see above)              |
| Error messages         | file path + directive             | template name, line and column                         | TypeScript diagnostics + real stack traces            |
| Editor support         | none (HTML comments)              | none out of the box                                    | full: completion, rename, go-to-definition            |
| Biome coverage         | linter only, `_partials` excluded | **fully excluded** (pages and `.njk`)                  | **lints and formats everything**                      |

## What Nunjucks costs beyond the dependency

1. **Pages stop being valid HTML for tooling.** `{% set navItems = [{ "id": … }] %}` breaks Biome's HTML parser, so
   `packages/patterns-nunjucks/src/**/*.html` is excluded from Biome entirely. In the twin only `_partials` are excluded
   and pages keep linting.
2. **No dependency tracking for the dev server.** The in-house engine returns the set of partials a page pulled in;
   Nunjucks does not, so the watcher falls back to "reload on any change below an underscore-prefixed path".
3. **Indentation is manual.** Macro output lands flush-left unless `| indent(n)` is applied in the layout.
4. **The scope model is looser.** `{% set %}` at page level, macro arguments and `_data.json` all feed the same context;
   the twin's three-step shallow merge (`_data.json` → `@props` → include props) is more explicit.
5. **More engine than the demos need.** Filters, expressions, `import`, `call`, async support and a template cache are
   all reachable from a pattern file, so "keep the demos boring" becomes a review rule rather than a property of the
   tool.
6. **Template keywords leak into the Tailwind scan.** `{% block %}` made Tailwind emit a `.block` utility that no page
   uses; keeping the compiled CSS identical to the twin's takes an explicit `@source not inline("block")` in this
   package's `patterns.css`.

## What the in-house engine costs

1. **No inheritance**, so every page repeats the head/header/footer includes and the `<html>`/`<body>` scaffold.
2. **No escaping**, so any future data-driven content is an XSS footgun by default.
3. **352 lines of parser and evaluator** that a newcomer has to read before touching a template — including hand-written
   error handling, cycle detection and a depth limit.
4. **Every new feature is a PR here**, and each one moves the package further towards a template engine that already
   exists.

## Running in the browser

Nunjucks ships browser builds, which the in-house engine does not (it reads partials from disk with `node:fs`). Numbers
below are from the installed `nunjucks@3.2.4`:

| Build                          | min+gzip | Can compile `{% … %}` at runtime | Needs `unsafe-eval` |
| ------------------------------ | -------- | -------------------------------- | ------------------- |
| `browser/nunjucks.min.js`      | 26 KB    | yes                              | yes                 |
| `browser/nunjucks-slim.min.js` | 12 KB    | no — precompiled templates only  | no                  |

Templates can be fetched at runtime through the bundled `WebLoader`, or precompiled at build time with the
`nunjucks-precompile` CLI and shipped as plain JS functions for the slim build. Preact runs in the browser by
definition, but `preact-render-to-string` is used in `patterns-jsx` as a build-time renderer only.

**This does not change the setup here.** Rendering stays at build time in all three packages: the demos must remain
framework-free, plain HTML that works with JavaScript disabled, and the full Nunjucks build compiles templates via
`new Function(source)` (`src/environment.js:527`), which a strict CSP without `script-src 'unsafe-eval'` blocks. Browser
rendering only becomes relevant if a pattern ever needs client-side templating — and then the precompiled + slim
combination is the option to reach for.

## Recommendation, as it stood before the decision

- **Keep `patterns-html`** while the demos stay at "chrome + a few pages" and the priority is a package with zero
  dependencies whose output whitespace is authored by hand. The engine is written, tested and free of governance
  overhead, and the missing features have not been missed.
- **Switch to `patterns-jsx`** if the priority is authoring safety and tooling: it is the only option where the props
  contract is checked, the pages lint and format like the rest of the repository, and there is no template syntax to
  document. Pair it with the scope rules in [`AGENTS.md`](AGENTS.md#scope-discipline-important).
- **Switch to `patterns-nunjucks`** if the demos should stay markup-first — authored by people who write HTML, not
  TypeScript — and template inheritance plus escaping of author-supplied content are the only missing pieces. The
  migration is mechanical, and the dependency footprint is small enough to justify at that point.
- **Skip Eleventy** unless the package also needs collections, pagination or Markdown — it replaces the build script and
  the dev server too, which is a much larger surface than swapping the engine.

Authoring safety was chosen over both zero dependencies and markup-first authoring. The Eleventy note still stands.

## Re-checking the evidence

The two deleted packages are reachable in git history:

```bash
git log --oneline -- packages/patterns-html packages/patterns-nunjucks
git show <commit>:packages/patterns-nunjucks/plugins/nunjucks.ts
```

The surviving package builds and tests as usual:

```bash
npm run build:patterns-jsx
npm run test:unit:patterns-jsx
npm run start:patterns-jsx  # http://localhost:3010
```
