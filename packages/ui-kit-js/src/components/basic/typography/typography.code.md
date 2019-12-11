# Typography

Typography components are categorized into two different use cases:

1. **Headline component** for predefined headlines with automated responsive sizing to fit into all major breakpoints.
2. **Text component** for predefined copy text sizes which are either fixed or can respond to different viewports.

## Headlines

### Style variants
There are multiple predefined styling variants available. Additionally the correct semantic tag (h1 - h6) can be set.

<Playground>
  <p-headline variant="large-title" tag="h1">The quick brown fox jumps over the lazy dog</p-headline>
  <p-headline variant="headline-1" tag="h1">The quick brown fox jumps over the lazy dog</p-headline>
  <p-headline variant="headline-2" tag="h2">The quick brown fox jumps over the lazy dog</p-headline>
  <p-headline variant="headline-3" tag="h3">The quick brown fox jumps over the lazy dog</p-headline>
  <p-headline variant="headline-4" tag="h4">The quick brown fox jumps over the lazy dog</p-headline>
  <p-headline variant="headline-5" tag="h5">The quick brown fox jumps over the lazy dog</p-headline>
  <p-headline variant="headline-6" tag="h6">The quick brown fox jumps over the lazy dog</p-headline>
</Playground>

---

### Color variants
The default headline color is Porsche Black. But also predefined or inherited colors can be set.

<Playground>
  <p-headline color="porsche-black">Porsche Black</p-headline>
  <p-headline color="porsche-light" style="background: black;">Porsche Light</p-headline>
  <p-headline color="inherit" style="color: deeppink;">Inherited custom color</p-headline>
</Playground>

---

### Alignment variants

<Playground>
  <p-headline align="left">Left</p-headline>
  <p-headline align="center">Center</p-headline>
  <p-headline align="right">Right</p-headline>
</Playground>

---

### Ellipsis mode
This will force any text to never wrap into a new line and in case it's too long for a single line then dots (…) at the end are used to visualize it.

<Playground>
  <p-headline ellipsis="true">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.</p-headline>
</Playground>

---

## Text

The text component is the most flexible way to display text strings on your page.  
Rendering defaults to variant `small` and font weight `regular`.  
The default semantic HTML element is `p`.

<Playground :themeable="true">
  <template v-slot="{theme}">
    <p-text :theme="theme">The quick brown fox jumps over the lazy dog</p-text>
  </template>
</Playground>

--- 

### Size

There are predefined default text sizes for the text component which should cover most use cases. If a specific text size is needed, the size can be set to `inherit` to specify the text size from outside.

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

#### Responsive

The settings above can also be used on different major breakpoints `xs`, `s`, `m`, `l`, `xl`.

<Playground :themeable="true">
  <template v-slot="{theme}">
    <p-text :theme="theme" size="{ base: 'small', l: 'medium' }">The quick brown fox jumps over the lazy dog</p-text>
  </template>
</Playground>

--- 

### Color
The default text color is Porsche Black. But also predefined or inherited colors can be set.

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
    <p-text :theme="theme" :color="color" :style="isInheritColor">The quick brown fox jumps over the lazy dog</p-text>
  </template>
</Playground>

--- 

### Weight

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

### Alignment

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

### Ellipsis mode
This will force any text to never wrap into a new line and in case it's to long for a single line then dots (…) at the end are used to visualize it.

<Playground :themeable="true">
  <template v-slot="{theme}">
    <p-text :theme="theme" ellipsis="true">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.</p-text>
  </template>
</Playground>

---

### Text with a link and bold text as children

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
      return this.size === 'inherit' ? 'font-size: 48px' : undefined;
    }
    
    public get isInheritColor() {
      return this.color === 'inherit' ? 'color: deeppink' : undefined;
    }
  }
</script>
