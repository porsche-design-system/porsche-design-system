# Headline

**Headline component** for predefined headlines with automated responsive sizing to fit into all major breakpoints.

## Variant
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

## Color
The default headline color is Porsche Black. But also predefined or inherited colors can be set.

<Playground>
  <p-headline color="porsche-black">Porsche Black</p-headline>
  <p-headline color="porsche-light" style="background: black;">Porsche Light</p-headline>
  <p-headline color="inherit" style="color: deeppink;">Inherited custom color</p-headline>
</Playground>

---

## Alignment

<Playground>
  <p-headline align="left">Left</p-headline>
  <p-headline align="center">Center</p-headline>
  <p-headline align="right">Right</p-headline>
</Playground>

---

## Ellipsis mode
This will force any text to never wrap into a new line and in case it's too long for a single line then dots (…) at the end are used to visualize it.

<Playground>
  <p-headline ellipsis="true">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.</p-headline>
</Playground>