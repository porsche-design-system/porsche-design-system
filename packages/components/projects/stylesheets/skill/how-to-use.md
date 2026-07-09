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
property — no proprietary switching logic. By default, color tokens use the light color scheme. To
enable the dark color scheme or automatic switching, add one of the `.scheme-*` classes to the
`<html>` element or any ancestor; the selected scheme cascades to all child elements:

- `.scheme-light` — enforces the light color scheme.
- `.scheme-dark` — enforces the dark color scheme.
- `.scheme-light-dark` — automatically switches based on the user's system preference.

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

The `color-scheme.css` stylesheet additionally ships a polyfill for browsers without `light-dark()`
support. If [browser support](https://caniuse.com/mdn-css_types_color_light-dark) is already
sufficient for your project, you can skip the polyfill and use the native `color-scheme` property and
`light-dark()` function directly (e.g. `html { color-scheme: light dark; }`).
