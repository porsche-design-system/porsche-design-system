# Patterns (Nunjucks)

Nunjucks twin of [`patterns-html`](../patterns-html). Same pages, same Tailwind setup, same build contract — the only
difference is the template layer: [Nunjucks](https://mozilla.github.io/nunjucks/) instead of the in-house
`@include`/`@if`/`@each` engine. It exists so the two approaches can be compared side by side; see
[`COMPARISON.md`](COMPARISON.md) for the result.

## Commands

```bash
npm run start:patterns-nunjucks   # dev server on http://localhost:3008
npm run build:patterns-nunjucks   # writes ./dist
npm run test:unit:patterns-nunjucks

# or from within this package
npm start
npm run build                     # renders templates, then compiles Tailwind (build:css)
npm run test:unit
npm run preview                   # build + serve ./dist on http://localhost:3009
```

Both packages can run at the same time — `patterns-html` uses ports 3006/3007, this one 3008/3009 and `patterns-jsx`
3010/3011.

## Structure

```text
src/
├── index.html          # overview page
├── _data.json          # shared data (navigation, …) available to every page
├── _layouts/
│   └── base.njk        # page shell: head, header, main, footer
├── _partials/          # macros, never emitted as pages
│   ├── head.njk
│   ├── header.njk
│   └── footer.njk
├── assets/
│   └── patterns.css    # Tailwind entry: theme, global element defaults
├── landing-page/
│   └── index.html
└── contact-page/
    ├── index.html
    └── main.js
```

Pages keep the `.html` extension so Vite treats them as MPA entries; layouts and macros use `.njk`.

## Authoring

A page declares its values and fills the layout's blocks:

```njk
{% extends "_layouts/base.njk" %}
{% set basePath = "../" %}
{% set title = "Landing page" %}
{% set description = "…" %}
{% set currentPage = "landing" %}
{% set showSearch = true %}
{% set mainClass = "flex flex-col gap-12" %}

{% block content %}
      <h1>…</h1>
{% endblock %}
```

| Variable      | Purpose                                                                     |
| ------------- | --------------------------------------------------------------------------- |
| `basePath`    | `"./"` at the root, `"../"` one level down. Never hardcode URLs in a macro. |
| `title`       | `<title>` and meta description feed off this.                               |
| `description` | Meta description.                                                           |
| `currentPage` | Matched against `item.id` to set `aria-current="page"`.                     |
| `showSearch`  | Optional; renders the header search form.                                   |
| `mainClass`   | Optional; classes on the page's `<main>`.                                   |
| `pageScript`  | Optional; renders `<script src="…" defer>` before `</body>`.                |
| `navItems`    | Comes from `_data.json`; a page may replace it wholesale.                   |

Rules:

- `src/_data.json` is the base scope of every page; `{% set %}` at page level overrides it (values are replaced, never
  merged).
- Partials are **macros**, so every value they need is an explicit parameter — the equivalent of the twin's
  `@include … { … }` props, but checked by the engine.
- `| trim | indent(4)` in the layout re-indents inlined macro output, which the in-house engine did automatically.
- Files and folders starting with `_` are inputs only and are never emitted.
- Every `src/**/*.html` becomes a page; all other files are copied verbatim.

Environment options (set once in [`plugins/nunjucks.ts`](plugins/nunjucks.ts)):

| Option                        | Effect                                                               |
| ----------------------------- | -------------------------------------------------------------------- |
| `autoescape`                  | Values are HTML-escaped; opt out per value with `                    | safe`. |
| `throwOnUndefined`            | `{{ tilte }}` fails the build instead of rendering an empty string.  |
| `trimBlocks` / `lstripBlocks` | A `{% … %}` tag on its own line leaves no blank line behind.         |
| `noCache`                     | The dev server picks up edited layouts and macros without a restart. |

## Styling

Identical to the twin: Tailwind CSS v4, configured CSS-first in [`src/assets/patterns.css`](src/assets/patterns.css),
compiled by `@tailwindcss/vite` in dev and by the Tailwind CLI into `dist/assets/patterns.css` in the build. The only
difference is an extra `@source "../**/*.njk"` so Tailwind also scans layouts and macros.

## How it works

[`plugins/nunjucks.ts`](plugins/nunjucks.ts) exports a configured environment factory, a pure `renderTemplate()` string
transform and a thin Vite plugin. The dev server uses the plugin (with a watcher that full-reloads when anything
underscore-prefixed changes), [`scripts/build.ts`](scripts/build.ts) uses the same function and copies everything else
untouched. One implementation, so dev and build can't drift apart.

## Accessibility baseline

Every page ships a skip link, `header`/`main`/`footer` landmarks, labelled `nav` elements, `aria-current` on the active
nav item, visible `:focus-visible` outlines and a `forced-colors: active` block. Keep that baseline when adding patterns
— these demos are documentation, so they have to be correct by example.
