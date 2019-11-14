# Typography

The text component can be categorized into two different use cases:

1. Predefined headlines with automated responsive sizing to fit into all major breakpoints.
2. Predefined body text sizes which are either fixed or can respond to different viewports.

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

<Playground>
    <p-text>The quick brown fox jumps over the lazy dog</p-text>
</Playground>

--- 

### Variants

There are predefined default text variants for the text component which should cover most use cases. If a specific text size is needed, the variant can be set to `inherit` to specify the text size from outside.

<Playground>
  <template #configurator>
    <select @change="variant = $event.target.value">
      <option disabled>Select a style variant</option>
      <option>x-small</option>
      <option>small</option>
      <option selected>medium</option>
      <option>large</option>
      <option>x-large</option>
      <option>inherit</option>
    </select>
  </template>
  <p-text :variant="variant" :style="isInherit">The quick brown fox jumps over the lazy dog</p-text>
</Playground>

#### Responsive

The settings above can also be used on different major breakpoints `xs`, `s`, `m`, `l`, `xl`.

<Playground>
  <p-text variant="{ base: 'small', l: 'medium' }">The quick brown fox jumps over the lazy dog</p-text>
</Playground>

--- 

### Weight

There are predefined default text weights for body text. Be aware of using the `thin` variant only with larger text sizes.

<Playground>
  <template #configurator>
    <select @change="weight = $event.target.value">
      <option disabled>Select a weight</option>
      <option>regular</option>
      <option selected>thin</option>
      <option>bold</option>
    </select>
  </template>
  <p-text variant="medium" :weight="weight">The quick brown fox jumps over the lazy dog</p-text>
</Playground>

---

### Color variants
The default text color is Porsche Black. But also predefined or inherited colors can be set.

<Playground>
  <p-text color="porsche-black">Porsche Black</p-text>
  <p-text color="porsche-light" style="background: black;">Porsche Light</p-text>
  <p-text color="inherit" style="color: deeppink;">Inherited custom color</p-text>
</Playground>

--- 

### Alignment variants

<Playground>
  <p-text align="left">Left</p-text>
  <p-text align="center">Center</p-text>
  <p-text align="right">Right</p-text>
</Playground>

---

### Ellipsis mode
This will force any text to never wrap into a new line and in case it's to long for a single line then dots (…) at the end are used to visualize it.

<Playground>
  <p-text ellipsis="true">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.</p-text>
</Playground>

---

### Text with a link and bold text as children

<Playground>
  <p-text>Lorem ipsum dolor sit amet <a href="#">linked text</a> et, <b>bold text</b> & <strong>strong text</strong></p-text>
</Playground>


<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  
  @Component
  export default class PlaygroundTypography extends Vue {
    public variant: string = 'medium';
    public weight: string = 'thin';
    
    public get isInherit() {
      return this.variant === 'inherit' ? 'font-size: 48px' : undefined;
    }
  }
</script>
