## How to use

### Import

When you import the main package CSS file, all global styles are included (CSS variables, color
scheme, font face and normalize):

```css
/* Replace {js|angular|react|vue} with your framework, e.g. components-react */
@import '@porsche-design-system/components-{js|angular|react|vue}/index.css';
```

The explicit `/index.css` path resolves in every framework package. The `js`, React and Vue packages
additionally expose an extensionless shorthand via a `style` export condition, so with those you can
also write `@import '@porsche-design-system/components-react'` (bare, no `/index.css`). The Angular
package does **not** expose that condition — always use the explicit `/index.css` path there.

If you only need specific styles, import each stylesheet separately for more granular control. Note
that `variables.css` and `font-face.css` are **required** — components will not render correctly
without them:

```css
@import '@porsche-design-system/components-{js|angular|react|vue}/variables.css';
@import '@porsche-design-system/components-{js|angular|react|vue}/font-face.css';
@import '@porsche-design-system/components-{js|angular|react|vue}/normalize.css';
@import '@porsche-design-system/components-{js|angular|react|vue}/color-scheme.css';
```

### CSS variables

Consume the exposed custom properties with `var(…)` in your own styles. Color variables resolve to
the correct value for the active color scheme automatically:

```css
.my-component {
  background-color: var(--p-color-canvas);
  color: var(--p-color-primary);
  border-radius: var(--p-radius-md);
}
```

### Color scheme (light / dark)

Colors are driven by the native CSS [`light-dark()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark)
function via the CSS [`color-scheme`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/color-scheme)
property — no proprietary switching logic. By default, the global styles set
`:root { color-scheme: only light; }`: color tokens use the light color scheme, and browsers with an
automatic dark mode (e.g. Chrome on Android, Samsung Internet, Android WebViews) are prevented from
recoloring the page. To enable the dark color scheme or automatic switching, add one of the
`.scheme-*` classes to the `<html>` element or any ancestor; the selected scheme cascades to all
child elements:

- `.scheme-light-dark` — automatically switches based on the user's system preference. This is the
  recommended way to support dark mode.
- `.scheme-only-light` — forces the light color scheme and prevents the browser from overriding it.
- `.scheme-only-dark` — forces the dark color scheme and prevents the browser from overriding it.
- `.scheme-light` — uses the light color scheme, but still allows the browser's automatic dark mode
  to recolor it. Prefer `.scheme-only-light`.
- `.scheme-dark` — enforces the dark color scheme.

Browser automatic dark mode recolors the page algorithmically, but not reliably images such as icons,
which can end up with insufficient contrast. Never use `color-scheme: light` (or `.scheme-light`) to force a
light scheme; use `.scheme-only-light` instead. In apps that embed web content in a WebView, pass the
app theme on to the web content (e.g. by setting `.scheme-only-light` or `.scheme-only-dark` on
`<html>`).

This one class themes **both** PDS components and your own custom markup — everything resolves colors
through the same `light-dark()` palette, so there is no separate component-level theming API and no
`theme` prop on `PorscheDesignSystemProvider` or on any component. Switching theme means setting the
`.scheme-*` class, nothing else.

```html
<html class="scheme-dark">
  <body>
    <!-- rendered in dark mode -->
    <div class="my-component"></div>
  </body>
</html>
```

For fixed light or dark sections within a page, apply `.scheme-only-light` or `.scheme-only-dark` to each page island.
Before creating custom color aliases or hardcoded values, inspect the existing `.scheme-*` utilities. **Never redefine
PDS-owned variables such as `--p-color-*` to force a local scheme.**

```css
/* Anti-pattern: don't overwrite the PDS palette. */
.campaign-section {
  --p-color-canvas: #0e0e12;
  --p-color-primary: #fff;
}
```

```html
<!-- Recommended: the page follows the system while these islands stay fixed. -->
<html class="scheme-light-dark">
  <body>
    <main>
      <section class="campaign-section scheme-only-dark">Dark campaign content</section>
      <section class="campaign-section scheme-only-light">Light campaign content</section>
    </main>
  </body>
</html>
```

```css
.campaign-section {
  background-color: var(--p-color-canvas);
  color: var(--p-color-primary);
}
```

The `color-scheme.css` stylesheet additionally ships a polyfill for browsers without `light-dark()`
support. If [browser support](https://caniuse.com/mdn-css_types_color_light-dark) is already
sufficient for your project, you can skip the polyfill and use the native `color-scheme` property and
`light-dark()` function directly (e.g. `html { color-scheme: light dark; }` or
`html { color-scheme: only light; }`).
