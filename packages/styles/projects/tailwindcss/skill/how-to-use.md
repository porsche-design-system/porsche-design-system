## How to use

### Import

Install Tailwind CSS (see the [official guide](https://tailwindcss.com/docs/installation)),
then add the Porsche Design System theme import to your global CSS **immediately after** the
standard Tailwind import:

```css
@import 'tailwindcss';
@import '@porsche-design-system/components-{js|angular|react|vue}/tailwindcss';
```

### Color scheme (light / dark)

Colors are driven by the native CSS [`light-dark()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark)
function via the CSS [`color-scheme`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/color-scheme)
property — no proprietary switching logic. The Tailwind `.scheme-*` utilities are extended
with a polyfill for browsers without `light-dark()` support. Apply one of these classes to
the document or any container; the selected context cascades to all child elements:

- `.scheme-light` — forces light mode.
- `.scheme-dark` — forces dark mode.
- `.scheme-light-dark` — dynamically follows the system/OS setting.

The same class themes **both** the PDS components and the custom UI you build with these utilities —
one `light-dark()` palette drives both layers. There is no separate component theming API and no
`theme` prop on `PorscheDesignSystemProvider` or on components; the `.scheme-*` class is the whole
switch.

```html
<html class="scheme-dark">
  <body>
    <!-- rendered in dark mode -->
    <div class="bg-frosted text-primary"></div>
  </body>
</html>
```
