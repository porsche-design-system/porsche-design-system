# Icon

The Porsche UI Kit is using a **SVG icon system** to visually present an icon object. Each icon is hosted on the Porsche UI Kit CDN to be served and cached as fast as possible. To reference an icon just use the `icon` property with a predefined icon id.

For more information and a complete overview of all available Porsche icons, head over to Porsche Icons ([Porsche Icons](https://icons.porsche.com)).

## Size

There are default sizes for the icon component which should cover most use cases. If a specific size is needed, the size can be set to `inherit` in order to specify the size from outside.

<Playground :themeable="true">
  <template #configurator>
    <select @change="size = $event.target.value">
      <option disabled>Select a size</option>
      <option selected>small</option>
      <option>medium</option>
      <option>large</option>
      <option>inherit</option>
    </select>
  </template>
  <template v-slot="{theme}">
    <p-icon :theme="theme" :size="size" name="highway" aria-label="Highway icon" :style="isInheritSize" />
  </template>
</Playground>
    
---

## Color
Predefined colors associated with its theme are available. Furthermore, inherit mode can be used to define a custom color.

<Playground :themeable="true">
  <template #configurator>
    <select @change="color = $event.target.value">
      <option disabled>Select a color</option>
      <option value="brand">Brand</option>
      <option value="default" selected>Default</option>
      <option value="neutral-1">Neutral 1</option>
      <option value="neutral-2">Neutral 2</option>
      <option value="neutral-3">Neutral 3</option>
      <option value="notification-success">Notification Success</option>
      <option value="notification-warning">Notification Warning</option>
      <option value="notification-error">Notification Error</option>
      <option value="inherit">Inherit</option>
    </select>
  </template>
  <template v-slot="{theme}">
    <p-icon :theme="theme" name="highway" size="large" :color="color" :style="isInheritColor" aria-label="Highway icon" />
  </template>
</Playground>

---

## Custom icon
The whole Porsche icon set is hosted on the Porsche UI Kit CDN. If there is need to show a custom icon which doesn't exist yet, you can define a custom path (absolute or relative) to your SVG icon in the `source` property. Be sure that the custom icon serves the specific needs like size and viewbox which are described in the [design documentation](#/web/components/icon/icon#design).

<Playground :themeable="true">
  <template v-slot="{theme}">
    <p-icon :theme="theme" :source="require(`@/assets/web/icon-custom-kaixin.svg`)" size="large" aria-label="Icon for social media platform Kaixin" />
  </template>
</Playground>

---

## Lazy loaded icon
Icons can be lazy loaded, which means that they are being loaded (fetched) when they get visible in the viewport.

<Playground :themeable="true">
  <template v-slot="{theme}">
    <p-icon :theme="theme" name="info" size="large" lazy="true" aria-label="Information icon" />
  </template>
</Playground>

---

## Accessibility
With the use of SVG icons, there are options to give more accessibility to users using screen readers. Here are some good practices:

* If icons stand alone, adding descriptive text with an `aria-label` attribute is a good practice:
```
<p-icon aria-label="descriptive text, e.g: close the layer" />
```

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  
  @Component
  export default class PlaygroundTypography extends Vue {
    public size: string = 'small';
    public color: string = 'default';
    
    public get isInheritSize() {
      return this.size === 'inherit' ? 'width: 48px' : undefined;
    }
    
    public get isInheritColor() {
      return this.color === 'inherit' ? 'color: deeppink' : undefined;
    }
  }
</script>