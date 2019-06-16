# Icon

## Introduction
Porsche UI Kit is using a SVG icon system to present an icon object visually.

## Icons

### Sizes

#### Small (default)
<Playground :themeable="false">
  <template v-slot="slotProps">
    <p-icon source="car-next" />
  </template>
</Playground>

#### Medium
<Playground :themeable="false">
  <template v-slot="slotProps">
    <p-icon source="car-next" size="medium" />
  </template>
</Playground>

#### large
<Playground :themeable="false">
  <template v-slot="slotProps">
    <p-icon source="car-next" size="large" />
  </template>
</Playground>

---

### Color Variants
The default icon color inherits from its parent(s). But also predefined colors can be set. @see properties for possible color variants.

<Playground :themeable="false">
  <template v-slot="slotProps">
    <p-icon source="car-next" size="large" color="porsche-red" />
  </template>
</Playground>

---

### Accessibility
With using SVG icons, there are options to give more accessibility to users using screen readers. Here are some good practices:

* If icons stand alone, adding descriptive text with an `aria-label` attribute is a good practice:
```
<p-icon aria-label="descriptive text, e.g: close the layer" />
```

