# patterns-html vs. patterns-nunjucks

Two packages, same three demo pages, same Tailwind setup, same build contract. The only variable is the template layer.
This document records what the swap actually costs and buys.

Measured on 2026-08-12 with `nunjucks@3.2.4`.

## Generated output

`dist/` is **structurally identical**. After building both packages, the only differing lines are prose that was
deliberately reworded ("partials" → "layout and macros"), plus one extra CSS rule (see below):

```bash
npm run build:patterns-html && npm run build:patterns-nunjucks
diff -r packages/patterns-html/dist packages/patterns-nunjucks/dist
```

Both produce plain HTML with relative paths, no hashed asset names, no framework runtime, and identical indentation —
the latter only because the layout pipes macro output through `| trim | indent(4)`, which the in-house engine did
implicitly.

The one structural difference is a `.block { display: block }` rule that Tailwind emits for `patterns-nunjucks` only:
`{% block content %}` and `{% endblock %}` look like the `block` utility to Tailwind's class scanner. Template keywords
sharing names with utilities (`block`, `filter`, `set`) is a small but permanent tax of a `{% … %}` syntax. Both
packages now use `@import "tailwindcss" source(none)` with explicit `@source` entries, which removed the larger class of
false positives that came from scanning the package README.

## Cost

|                          | `patterns-html`                      | `patterns-nunjucks`                                                 |
| ------------------------ | ------------------------------------ | ------------------------------------------------------------------- |
| Runtime dependencies     | none                                 | `nunjucks` + 3 transitive (`a-sync-waterfall`, `asap`, `commander`) |
| Installed size           | 0                                    | ~2.1 MB                                                             |
| Licenses to review (ORT) | none                                 | BSD-2-Clause, 3× MIT                                                |
| Engine code to maintain  | 352 lines (`plugins/htmlInclude.ts`) | 102 lines (`plugins/nunjucks.ts`)                                   |
| Build script             | 51 lines                             | 58 lines                                                            |
| Unit tests               | 168 lines / 29 tests                 | 216 lines / 41 tests                                                |

The engine shrinks by ~250 lines, but those lines are replaced by a dependency that syncpack, the lockfile, Dependabot
and the monthly ORT scan all have to carry.

## What Nunjucks adds

| Capability                | In-house engine                     | Nunjucks                                               |
| ------------------------- | ----------------------------------- | ------------------------------------------------------ |
| Template inheritance      | ✗ (chrome re-included per page)     | `{% extends %}` + `{% block %}`                        |
| Parameterised partials    | props object, unchecked             | macros with named/default parameters                   |
| `elif`                    | ✗ (nest inside `@else`)             | `{% elif %}`                                           |
| Loop `else` branch        | ✗                                   | `{% for %}…{% else %}`                                 |
| Filters                   | ✗                                   | `default`, `indent`, `trim`, `safe`, `length`, …       |
| Auto-escaping             | ✗ (raw substitution)                | on by default, `                                       | safe` to opt out |
| Undefined values          | warning, renders empty string       | `throwOnUndefined` fails the build                     |
| Expressions in conditions | `key`, `!key`, `a == b`, `a != b`   | full expression language                               |
| Whitespace control        | automatic                           | `trimBlocks` / `lstripBlocks` + explicit `{%-` / `-%}` |
| Error messages            | file path + directive, hand-written | template name, line and column                         |

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
6. **Template keywords leak into the Tailwind scan.** `{% block %}` makes Tailwind emit a `.block` utility that no page
   uses.

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
`nunjucks-precompile` CLI and shipped as plain JS functions for the slim build.

**This does not change the setup here.** Rendering stays at build time: the demos must remain framework-free, plain HTML
that works with JavaScript disabled, and the full build compiles templates via `new Function(source)`
(`src/environment.js:527`), which a strict CSP without `script-src 'unsafe-eval'` blocks. Browser rendering only becomes
relevant if a pattern ever needs client-side templating — and then the precompiled + slim combination is the option to
reach for.

## Recommendation

- **Keep `patterns-html`** while the demos stay at "chrome + a few pages". The engine is written, tested and free of
  governance overhead, and the missing features have not been missed.
- **Switch to `patterns-nunjucks`** as soon as a second layout, escaping of author-supplied content, or any filter-like
  logic shows up in a review. The migration is mechanical (this package is the proof), and the dependency footprint is
  small enough to justify at that point.
- **Skip Eleventy** unless the package also needs collections, pagination or Markdown — it replaces the build script and
  the dev server too, which is a much larger surface than swapping the engine.

## Reproducing the comparison

```bash
npm run build:patterns-html
npm run build:patterns-nunjucks
diff -r packages/patterns-html/dist packages/patterns-nunjucks/dist

npm run test:unit:patterns-html
npm run test:unit:patterns-nunjucks

npm run start:patterns-html      # http://localhost:3006
npm run start:patterns-nunjucks  # http://localhost:3008
```
