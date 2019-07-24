# Typography

## Introduction
Text component can be categorized into 2 different use cases:

1. Predefined headlines with automated responsive sizing to fit into all major breakpoints
2. Generic text sizes which are fixed and do not respond to different viewports

## Headlines

### Type variants
There are multiple predefined styling variants available and additionally the correct semantic tag (h1-h6) can be set.

<Playground>
  <p-headline type="large-title" tag="h1">The quick brown fox jumps over the lazy dog</p-headline>
  <p-headline type="headline-1" tag="h1">Lorem ipsum dolor sit amet</p-headline>
  <p-headline type="headline-2" tag="h2">Lorem ipsum dolor sit amet</p-headline>
  <p-headline type="headline-3" tag="h3">Lorem ipsum dolor sit amet</p-headline>
  <p-headline type="headline-4" tag="h4">Lorem ipsum dolor sit amet</p-headline>
  <p-headline type="headline-5" tag="h5">Lorem ipsum dolor sit amet</p-headline>
  <p-headline type="headline-6" tag="h6">Lorem ipsum dolor sit amet</p-headline>
</Playground>

---

### Color variants
The default headline color is Porsche black. But also predefined or inherited colors can be set. @see properties for possible color variants.

<Playground>
  <p-headline color="porsche-black">Porsche Black</p-headline>
  <p-headline color="porsche-light" style="background: black;">Porsche Light</p-headline>
  <p-headline color="inherit" style="color: deeppink;">Inherited custom color</p-headline>
</Playground>

---

### Ellipsis mode
This will force any text to never wrap into a new line and in case it's to long for a single line then dots (…) at the end are used to visual it.

<Playground>
  <p-headline ellipsis="true">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.</p-headline>
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