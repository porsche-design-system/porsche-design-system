# Icon

Along with other Porsche basic elements - such as colors, typography and the Porsche marque - icons are core components
of the Porsche design. The clear graphic symbols allow quick orientation and are internationally recognized. The Porsche
Design System is using an **SVG icon system (integrated by `<img/>`)** to visually present an icon object. Each icon is
hosted on the Porsche Design System CDN to be served and cached as fast as possible.

<TableOfContents></TableOfContents>

## Name

For more information and a complete overview of all available Porsche icons, head over to Porsche Icons
([Porsche Icons](https://icons.porsche.com)).  
To reference an icon just use the `name` property with a predefined icon id.

<Notification heading="Important note" state="error">
  With the previous major version v2 it was possible to accidentally define an icon name with camel case syntax. 
  This isn't possible anymore, typings have been adapted properly. Please use param case syntax instead.
</Notification>

<Playground :markup="name" :config="config"></Playground>

### <A11yIcon></A11yIcon> Accessibility hints

With the use of SVG icons, there are options to enhance accessibility to users using screen readers. Here are some good
practices:

- Always provide a textual description through **ARIA** with the `aria` property to expose a more descriptive experience
  to screen reader users.
- If icons are purely decorative or are used in combination with text, hide the icon for screen readers:

```html
<p-icon name="arrow" aria-hidden="true" />
```

---

## Size

There are default sizes for the icon component being in sync with text component which should cover most use cases. If a
specific size is needed, the size can be set to `inherit` in order to specify the size from outside.

<Playground :markup="sizeMarkup" :config="config">
  <SelectOptions v-model="size" :values="sizes" name="size"></SelectOptions>
</Playground>
    
---

## Color

Predefined colors associated with its theme are available. Furthermore, inherit mode can be used to define a custom
color.

<Notification heading="Important note" state="success">
  The inherit mode works slightly different in v3 compared to the previous major release. A CSS filter (use some Online Calculator "hex to css filter") is required to
apply custom coloring to take advantage of using an SVG embedded in an image tag for better loading performance.
</Notification>

<Notification heading="Deprecation hint" state="warning">
  Following colors have been deprecated and will be removed with the next major release:
"brand", "default", "neutral-contrast-high", "neutral-contrast-medium", "neutral-contrast-low" and "notification-neutral".
</Notification>

<Playground :markup="colorMarkup" :config="config">
  <SelectOptions v-model="color" :values="colors" name="color"></SelectOptions>
</Playground>

---

## Custom icon

The whole Porsche icon set is hosted on the Porsche Design System CDN. If there is need to show a custom icon which
doesn't exist yet, you can define a custom path (absolute or relative) to your SVG icon in the `source` property. Be
sure that the custom icon serves the specific needs like size and viewbox which are described in the
[usage documentation](components/icon/usage).

<Playground :markup="custom" :config="config"></Playground>

---

## Lazy loaded icon

<Notification heading="Deprecation hint" state="warning">
  Since the component is using the native 'loading="lazy"' attribute by default, this property is deprecated and has no effect anymore. Therefor, it will be removed with the next major release.
</Notification>

<Playground :markup="lazy" :config="config"></Playground>

---

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { capitalCase } from 'change-case';
import { ICONS_MANIFEST } from '@porsche-design-system/icons';
import { TEXT_SIZES } from '../text/text-size';
import { TEXT_COLORS_DEPRECATED } from '../text/text-color'; 
import { ICON_COLORS } from './icon-utils';

@Component
export default class Code extends Vue {
  config = { themeable: true };

  get name() {
    return Object.keys(ICONS_MANIFEST).map(x => `<p-icon name="${x}" aria="{ 'aria-label': '${capitalCase(x)} icon' }"></p-icon>`).join('\n');
  }

  size = 'large';
  sizes = TEXT_SIZES;
  get sizeMarkup() {
    const style = this.size === 'inherit' ? ' style="width: 96px; height: 96px;"' : '';
    return `<p-icon size="${this.size}" name="highway" aria="{ 'aria-label': 'Highway icon' }"${style}></p-icon>`
  }

  color = 'primary';
  colors = ICON_COLORS.map(item => TEXT_COLORS_DEPRECATED.includes(item) ? item + ' (deprecated)' : item);
  get colorMarkup() {
    const style = this.color === 'inherit' ? ' style="filter: invert(24%) sepia(70%) saturate(5969%) hue-rotate(316deg) brightness(102%) contrast(102%)"' : '';
    return `<p-icon name="highway" color="${this.color}" aria="{ 'aria-label': 'Highway icon' }"${style}></p-icon>`
  }

  custom =
`<p-icon source="${require('../../assets/icon-custom-kaixin.svg')}" aria="{ 'aria-label': 'Icon for social media platform Kaixin' }"></p-icon>`;

  lazy =
`<p-icon name="information" lazy="true" aria="{ 'aria-label': 'Information icon' }" />`;
}
</script>
