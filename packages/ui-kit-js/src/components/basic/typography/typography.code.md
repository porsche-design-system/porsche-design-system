# Typography

## Introduction
Text component can be categorized into 2 different use cases:

1. Predefined headlines with automated responsive sizing to fit into all major breakpoints
2. Generic text sizes which are fixed and do not respond to different viewports

## Headlines

### Large-title

<Playground :themeable="true">
  <template v-slot="slotProps">
    <p-headline type="large-title" level="1" :theme="slotProps.theme">Lorem ipsum dolor sit amet</p-headline>
  </template>
</Playground>

### Headline 1

<Playground :themeable="true">
  <template v-slot="slotProps">
    <p-headline type="headline-1" level="1" :theme="slotProps.theme">Lorem ipsum dolor sit amet</p-headline>
  </template>
</Playground>

### Headline 2

<Playground :themeable="true">
  <template v-slot="slotProps">
    <p-headline type="headline-2" level="2" :theme="slotProps.theme">Lorem ipsum dolor sit amet</p-headline>
  </template>
</Playground>

### Headline 3

<Playground :themeable="true">
  <template v-slot="slotProps">
    <p-headline type="headline-3" level="3" :theme="slotProps.theme">Lorem ipsum dolor sit amet</p-headline>
  </template>
</Playground>

### Headline 4

<Playground :themeable="true">
  <template v-slot="slotProps">
    <p-headline type="headline-4" level="4" :theme="slotProps.theme">Lorem ipsum dolor sit amet</p-headline>
  </template>
</Playground>

### Headline 5

<Playground :themeable="true">
  <template v-slot="slotProps">
    <p-headline type="headline-5" level="5" :theme="slotProps.theme">Lorem ipsum dolor sit amet</p-headline>
  </template>
</Playground>

### Headline 6

<Playground :themeable="true">
  <template v-slot="slotProps">
    <p-headline type="headline-6" level="6" :theme="slotProps.theme">Lorem ipsum dolor sit amet</p-headline>
  </template>
</Playground>

---

## Text

### Font weights SASS variables
```
$p-font-weight-thin: 200;
$p-font-weight-regular: 400;
$p-font-weight-bold: 600;
```
---

## Copy text

### Copy

<Playground>
  <p-text type="copy">Lorem ipsum dolor sit amet <strong>strong text</strong> et <b>bold text</b></p-text>
</Playground>

### Small

<Playground>
  <p-text type="small">Lorem ipsum dolor sit amet <strong>strong text</strong> et <b>bold text</b></p-text>
</Playground>

---

## Generic text

### Size 12
<Playground>
  <p-text type="12">Lorem ipsum dolor sit amet <strong>strong text</strong> et <b>bold text</b></p-text>
</Playground>

### Size 16
<Playground>
  <p-text type="16">Lorem ipsum dolor sit amet <strong>strong text</strong> et <b>bold text</b></p-text>
</Playground>

### Size 18
<Playground>
  <p-text type="18">Lorem ipsum dolor sit amet <strong>strong text</strong> et <b>bold text</b></p-text>
</Playground>

### Size 20
<Playground>
  <p-text type="20">Lorem ipsum dolor sit amet <strong>strong text</strong> et <b>bold text</b></p-text>
</Playground>

### Size 24
<Playground>
  <p-text type="24">Lorem ipsum dolor sit amet <strong>strong text</strong> et <b>bold text</b></p-text>
</Playground>

### Size 28
<Playground>
  <p-text type="28">Lorem ipsum dolor sit amet <strong>strong text</strong> et <b>bold text</b></p-text>
</Playground>

### Size 30
<Playground>
  <p-text type="30">Lorem ipsum dolor sit amet <strong>strong text</strong> et <b>bold text</b></p-text>
</Playground>

### Size 32
<Playground>
  <p-text type="32">Lorem ipsum dolor sit amet <strong>strong text</strong> et <b>bold text</b></p-text>
</Playground>

### Size 36
<Playground>
  <p-text type="36">Lorem ipsum dolor sit amet <strong>strong text</strong> et <b>bold text</b></p-text>
</Playground>

### Size 42
<Playground>
  <p-text type="42">Lorem ipsum dolor sit amet <strong>strong text</strong> et <b>bold text</b></p-text>
</Playground>

### Size 44
<Playground>
  <p-text type="44">Lorem ipsum dolor sit amet <strong>strong text</strong> et <b>bold text</b></p-text>
</Playground>

### Size 48
<Playground>
  <p-text type="48">Lorem ipsum dolor sit amet <strong>strong text</strong> et <b>bold text</b></p-text>
</Playground>

### Size 52
<Playground>
  <p-text type="52">Lorem ipsum dolor sit amet <strong>strong text</strong> et <b>bold text</b></p-text>
</Playground>

### Size 60
<Playground>
  <p-text type="60">Lorem ipsum dolor sit amet <strong>strong text</strong> et <b>bold text</b></p-text>
</Playground>

### Size 62
<Playground>
  <p-text type="62">Lorem ipsum dolor sit amet <strong>strong text</strong> et <b>bold text</b></p-text>
</Playground>

### Size 72
<Playground>
  <p-text type="72">Lorem ipsum dolor sit amet <strong>strong text</strong> et <b>bold text</b></p-text>
</Playground>

### Size 84
<Playground>
  <p-text type="84">Lorem ipsum dolor sit amet <strong>strong text</strong> et <b>bold text</b></p-text>
</Playground>

---

## Generic text in thin variant

### Size 60 thin
<Playground>
  <p-text type="60-thin">Lorem ipsum dolor sit amet</p-text>
</Playground>

### Size 62 thin
<Playground>
  <p-text type="62-thin">Lorem ipsum dolor sit amet</p-text>
</Playground>

### Size 72 thin
<Playground>
  <p-text type="72-thin">Lorem ipsum dolor sit amet</p-text>
</Playground>

### Size 84 thin
<Playground>
  <p-text type="84-thin">Lorem ipsum dolor sit amet</p-text>
</Playground>

---

### Color variants
The default text color is Porsche black. But also predefined or inherited colors can be set. @see properties for possible color variants.

<Playground>
  <p-text type="20" color="porsche-red">Lorem ipsum dolor sit amet <strong>strong text</strong> et <b>bold text</b></p-text>
</Playground>

---

### Text with a link

<Playground>
  <p-text type="20">Lorem ipsum dolor sit amet <a href="#">linked text</a> et <b>bold text</b></p-text>
</Playground>