# Typography

The text component can be categorized into two different use cases:

1. Predefined headlines with automated responsive sizing to fit into all major breakpoints.
2. Generic text sizes which are fixed and do not respond to different viewports.

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

## Copy text

### Style variants
There are multiple predefined styling variants available. Additionally the correct semantic tag can be set.

<Playground>
  <p-text variant="copy">The quick brown fox jumps over the lazy dog</p-text>
  <p-text variant="small">The quick brown fox jumps over the lazy dog</p-text>
</Playground>

---

## Generic text

In some cases, e.g. for highlighting or graphical reasons, it might be necessary to use additional styling variants.

<Playground>
  <template #configurator>
    <select @change="variant = $event.target.value">
      <option disabled>Select a style variant</option>
      <option>18</option>
      <option>20</option>
      <option>20-thin</option>
      <option>24</option>
      <option>24-thin</option>
      <option>28</option>
      <option>28-thin</option>
      <option>30</option>
      <option>30-thin</option>
      <option>32</option>
      <option>32-thin</option>
      <option>36</option>
      <option>36-thin</option>
      <option>42</option>
      <option>42-thin</option>
      <option>44</option>
      <option>44-thin</option>
      <option>48</option>
      <option>48-thin</option>
      <option>52</option>
      <option>52-thin</option>
      <option>60</option>
      <option selected>60-thin</option>
      <option>62</option>
      <option>62-thin</option>
      <option>72</option>
      <option>72-thin</option>
      <option>84</option>
      <option>84-thin</option>
    </select>
  </template>
  <p-text :variant="variant">The quick brown fox jumps over the lazy dog</p-text>
</Playground>

---

### Color variants
The default text color is Porsche Black. But also predefined or inherited colors can be set.

<Playground>
  <p-text color="porsche-black">Porsche Black</p-text>
  <p-text color="porsche-light" style="background: black; display: block;">Porsche Light</p-text>
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

### Text with a link and bold text

<Playground>
  <p-text>Lorem ipsum dolor sit amet <a href="#">linked text</a> et, <b>bold text</b> & <strong>strong text</strong></p-text>
</Playground>


<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  
  @Component
  export default class PlaygroundTypography extends Vue {
    public variant: string = '60-thin';
  }
</script>