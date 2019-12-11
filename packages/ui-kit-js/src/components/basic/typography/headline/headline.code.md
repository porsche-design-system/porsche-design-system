# Headline

**Headline component** for predefined headlines with automated responsive sizing to fit into all major breakpoints.

## Variant
There are multiple predefined styling variants available. Additionally the correct semantic tag (h1 - h6) can be set.

<Playground :themeable="true">
  <template v-slot="{theme}">
    <p-headline :theme="theme" variant="large-title" tag="h1">The quick brown fox jumps over the lazy dog</p-headline>
    <p-headline :theme="theme" variant="headline-1" tag="h1">The quick brown fox jumps over the lazy dog</p-headline>
    <p-headline :theme="theme" variant="headline-2" tag="h2">The quick brown fox jumps over the lazy dog</p-headline>
    <p-headline :theme="theme" variant="headline-3" tag="h3">The quick brown fox jumps over the lazy dog</p-headline>
    <p-headline :theme="theme" variant="headline-4" tag="h4">The quick brown fox jumps over the lazy dog</p-headline>
    <p-headline :theme="theme" variant="headline-5" tag="h5">The quick brown fox jumps over the lazy dog</p-headline>
    <p-headline :theme="theme" variant="headline-6" tag="h6">The quick brown fox jumps over the lazy dog</p-headline>
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
    <p-headline :theme="theme" variant="headline-3" :color="color" :style="isInheritColor">The quick brown fox jumps over the lazy dog</p-headline>
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
    <p-headline :theme="theme" variant="headline-3" :align="align">The quick brown fox jumps over the lazy dog</p-headline>
  </template>
</Playground>

---

## Ellipsis mode
This will force any text to never wrap into a new line and in case it's too long for a single line then dots (…) at the end are used to visualize it.

<Playground :themeable="true">
  <template v-slot="{theme}">
  <p-headline :theme="theme" variant="headline-3" ellipsis="true">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.</p-headline>
  </template>
</Playground>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  
  @Component
  export default class PlaygroundTypography extends Vue {
    public color: string = 'default';
    public align: string = 'center';
    
    public get isInheritColor() {
      return this.color === 'inherit' ? 'color: deeppink' : undefined;
    }
  }
</script>