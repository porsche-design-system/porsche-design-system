# Typography

## Text

**Text component** for predefined copy text sizes which are either fixed or can respond to different viewports.

## Default

The text component is the most flexible way to display text strings on your page.  
Rendering defaults to variant `small` and font weight `regular`.  
The default semantic HTML element is `p`.

<Playground :themeable="true">
  <template v-slot="{theme}">
    <p-text :theme="theme">The quick brown fox jumps over the lazy dog</p-text>
  </template>
</Playground>

--- 

## Size

There are predefined default text sizes for the text component which should cover most use cases. 
If a specific text size is needed, the size can be set to `inherit` to specify the text size from outside.

**Hint:** Be aware of that the line-height will be calculated based on the Porsche type-scaling formula automatically. This is the case for predefined text sizes as well as for `inherit` mode.

<Playground :themeable="true">
  <template #configurator>
    <select @change="size = $event.target.value">
      <option disabled>Select a size</option>
      <option>x-small</option>
      <option>small</option>
      <option selected>medium</option>
      <option>large</option>
      <option>x-large</option>
      <option>inherit</option>
    </select>
  </template>
  <template v-slot="{theme}">
    <p-text :theme="theme" :size="size" :style="isInheritSize">The quick brown fox jumps over the lazy dog</p-text>
  </template>
</Playground>

### Responsive

The settings above can also be used on different major breakpoints `xs`, `s`, `m`, `l`, `xl`.

<Playground :themeable="true">
  <template v-slot="{theme}">
    <p-text :theme="theme" size="{ base: 'small', l: 'medium' }">The quick brown fox jumps over the lazy dog</p-text>
  </template>
</Playground>

--- 

## Color
Predefined colors associated with its theme are available but also inherit mode can be used to define a custom color.

<Playground :themeable="true">
  <template #configurator>
    <select @change="color = $event.target.value">
      <option disabled>Select a color</option>
      <option value="brand">Brand</option>
      <option value="default" selected>Default</option>
      <option value="neutral-contrast-high">Neutral Contrast High</option>
      <option value="neutral-contrast-medium">Neutral Contrast Medium</option>
      <option value="neutral-contrast-low">Neutral Contrast Low</option>
      <option value="notification-success">Notification Success</option>
      <option value="notification-warning">Notification Warning</option>
      <option value="notification-error">Notification Error</option>
      <option value="inherit">Inherit</option>
    </select>
  </template>
  <template v-slot="{theme}">
    <p-text :theme="theme" :color="color" :style="isInheritColor">The quick brown fox jumps over the lazy dog</p-text>
  </template>
</Playground>

--- 

## Weight

There are predefined default text weights for copy text. Be aware of using the `thin` variant only with larger text sizes.

<Playground :themeable="true">
  <template #configurator>
    <select @change="weight = $event.target.value">
      <option disabled>Select a weight</option>
      <option value="thin" selected>Thin</option>
      <option value="regular">Regular</option>
      <option value="bold">Bold</option>
    </select>
  </template>
  <template v-slot="{theme}">
    <p-text :theme="theme" size="medium" :weight="weight">The quick brown fox jumps over the lazy dog</p-text>
  </template>
</Playground>

---

## Alignment

<Playground :themeable="true">
  <template #configurator>
    <select @change="align = $event.target.value">
      <option disabled>Select an alignment</option>
      <option value="left">Left</option>
      <option value="center" selected>Center</option>
      <option value="right">Right</option>
    </select>
  </template>
  <template v-slot="{theme}">
    <p-text :theme="theme" :align="align">The quick brown fox jumps over the lazy dog</p-text>
  </template>
</Playground>

---

## Ellipsis mode
This will force any text to never wrap into a new line and in case it's to long for a single line then dots (…) at the end are used to visualize it.

<Playground :themeable="true">
  <template v-slot="{theme}">
    <p-text :theme="theme" ellipsis="true">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.</p-text>
  </template>
</Playground>

---

## Text with a link and bold text as children

<Playground :themeable="true">
  <template v-slot="{theme}">
    <p-text :theme="theme">Lorem ipsum dolor sit amet <a href="#">linked text</a> et, <b>bold text</b> & <strong>strong text</strong></p-text>
  </template>
</Playground>


<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  
  @Component
  export default class PlaygroundTypography extends Vue {
    public size: string = 'medium';
    public weight: string = 'thin';
    public color: string = 'default';
    public align: string = 'center';
    
    public get isInheritSize() {
      return this.size === 'inherit' ? 'font-size: 48px;' : undefined;
    }
    
    public get isInheritColor() {
      return this.color === 'inherit' ? 'color: deeppink' : undefined;
    }
  }
</script>