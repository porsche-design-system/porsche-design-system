# Icon

Along with other Porsche basic elements - such as colors, typography and the Porsche marque - icons are core components of the Porsche design. 
The clear graphic symbols allow quick orientation and are internationally recognized.
The Porsche Design System is using a **SVG icon system** to visually present an icon object. 
Each icon is hosted on the Porsche Design System CDN to be served and cached as fast as possible.

<TableOfContents></TableOfContents>

## Name

For more information and a complete overview of all available Porsche icons, head over to Porsche Icons ([Porsche Icons](https://icons.porsche.com)).  
To reference an icon just use the `name` property with a predefined icon id.

<Playground :markup="name" :config="config"></Playground>

### <p-icon name="accessibility" size="medium" color="notification-neutral" aria-hidden="true"></p-icon> Accessibility hints
With the use of SVG icons, there are options to enhance accessibility to users using screen readers. Here are some good practices:
* Always provide a textual description through **ARIA** with the `aria` property to expose a more descriptive experience to screen reader users.
* If icons are purely decorative or are used in combination with text, hide the icon for screen readers:
```html
<p-icon name="arrow" aria-hidden="true" />
```
    
---

## Size

There are default sizes for the icon component which should cover most use cases. If a specific size is needed, the size can be set to `inherit` in order to specify the size from outside.

<Playground :markup="sizeMarkup" :config="config">
  <select v-model="size">
    <option disabled>Select a size</option>
    <option>small</option>
    <option>medium</option>
    <option>large</option>
    <option>inherit</option>
  </select>
</Playground>
    
---

## Color
Predefined colors associated with its theme are available. Furthermore, inherit mode can be used to define a custom color.

<Playground :markup="colorMarkup" :config="config">
  <select v-model="color">
    <option disabled>Select a color</option>
    <option value="brand">Brand</option>
    <option value="default">Default</option>
    <option value="neutral-contrast-high">Neutral Contrast High</option>
    <option value="neutral-contrast-medium">Neutral Contrast Medium</option>
    <option value="neutral-contrast-low">Neutral Contrast Low</option>
    <option value="notification-success">Notification Success</option>
    <option value="notification-warning">Notification Warning</option>
    <option value="notification-error">Notification Error</option>
    <option value="notification-neutral">Notification Neutral</option>
    <option value="inherit">Inherit</option>
  </select>
</Playground>

---

## Custom icon
The whole Porsche icon set is hosted on the Porsche Design System CDN. If there is need to show a custom icon which doesn't exist yet, you can define a custom path (absolute or relative) to your SVG icon in the `source` property. Be sure that the custom icon serves the specific needs like size and viewbox which are described in the [design documentation](components/icon/design).

<Playground :markup="custom" :config="config"></Playground>

---

## Lazy loaded icon
Icons can be lazy loaded, which means that they are being loaded (fetched) when they get visible in the viewport.

<Playground :markup="lazy" :config="config"></Playground>

---

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { capitalCase } from 'change-case';
  import { ICONS_MANIFEST } from '@porsche-design-system/assets';
  
  @Component
  export default class Code extends Vue {
    config = { themeable: true };

    size = 'large';
    color = 'brand';
    
    get name() {
      return Object.keys(ICONS_MANIFEST).map(x => `<p-icon name="${x}" aria="{ 'aria-label': '${capitalCase(x)} icon' }"></p-icon>`).join('\n');
    }
    
    get sizeMarkup() {
      const style = this.size === 'inherit' ? ' style="width: 96px; height: 96px;"' : '';
      return `<p-icon size="${this.size}" name="highway" aria="{ 'aria-label': 'Highway icon' }"${style}></p-icon>`
    }
    
    get colorMarkup() {
      const style = this.color === 'inherit' ? ' style="color: deeppink"' : '';
      return `<p-icon name="highway" color="${this.color}" aria="{ 'aria-label': 'Highway icon' }"${style}></p-icon>`
    }
    
    custom =
`<p-icon source="${require('./assets/icon-custom-kaixin.svg')}" aria="{ 'aria-label': 'Icon for social media platform Kaixin' }"></p-icon>`;

    lazy =
`<p-icon name="information" lazy="true" aria="{ 'aria-label': 'Information icon' }" />`;
  }
</script>