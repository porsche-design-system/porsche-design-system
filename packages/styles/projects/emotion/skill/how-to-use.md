## How to use

### Import

Install Emotion (see the [official guide](https://emotion.sh/docs/install)), then import the documented
tokens and utilities from the Porsche Design System Emotion entry:

```ts
import { colorPrimary, spacingFluidMd } from '@porsche-design-system/components-{js|angular|react|vue}/emotion';
import styled from '@emotion/styled';

const Card = styled.div({
  color: colorPrimary,
  padding: spacingFluidMd,
});
```

Tokens are plain values you assign to CSS properties; utilities are style objects or functions you
spread/call inside your styles (e.g. `css(getFocusVisibleStyle())`, `<Global styles={colorSchemeStyles} />`).

### Color scheme (light / dark)

Colors are driven by the native CSS [`light-dark()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark)
function via the CSS [`color-scheme`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/color-scheme)
property — no proprietary switching logic. Include the global `colorSchemeStyles` **once** in your
global styles to generate the `.scheme-*` utility classes and add a polyfill for browsers without
`light-dark()` support:

```tsx
import { colorSchemeStyles } from '@porsche-design-system/components-{js|angular|react|vue}/emotion';
import { Global } from '@emotion/react';

// global setup
<Global styles={colorSchemeStyles} />;
```

Then use the light-dark color tokens in your component styles; they resolve to the correct value for
the active theme automatically. Apply one of the `.scheme-*` classes to the document or any container
and the selected context cascades to all child elements:

- `.scheme-light` — forces light mode.
- `.scheme-dark` — forces dark mode.
- `.scheme-light-dark` — dynamically follows the system/OS setting.

The same class themes **both** the PDS components and your own Emotion-styled markup — one
`light-dark()` palette drives both layers. There is no separate component theming API and no `theme`
prop on `PorscheDesignSystemProvider` or on components; the `.scheme-*` class is the whole switch.

```tsx
<div className="scheme-dark">{/* rendered in dark mode */}</div>
```

### Tokens and utilities

Every documented token is a named value export (e.g. `colorPrimary`, `radiusMd`); every documented
utility is a style object or a function returning one (e.g. `getMediaQueryMin`, `proseHeadingMdStyle`,
`gridNarrow`). Use the reference below to discover what is available.

### Deprecated aliases

The package still ships legacy exports as deprecated aliases so existing code keeps working. They are
intentionally **not** listed here — prefer the documented tokens and utilities below for new code.