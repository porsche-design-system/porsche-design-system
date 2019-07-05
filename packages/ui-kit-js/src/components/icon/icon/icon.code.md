# Icon

## Introduction
Porsche UI Kit is using a SVG icon system to present an icon object visually.

## Icons

### Sizes

#### Small (default)
<Playground>
  <p-icon source="car-next" />
</Playground>

#### Medium
<Playground>
  <p-icon source="car-next" size="medium" />
</Playground>

#### large
<Playground>
  <p-icon source="car-next" size="large" />
</Playground>

---

### Color Variants
The default icon color inherits from its parent(s). But also predefined colors can be set. @see properties for possible color variants.

<Playground>
  <p-icon source="car-next" size="large" color="porsche-red" />
</Playground>

---

### Accessibility
With using SVG icons, there are options to give more accessibility to users using screen readers. Here are some good practices:

* If icons stand alone, adding descriptive text with an `aria-label` attribute is a good practice:
```
<p-icon aria-label="descriptive text, e.g: close the layer" />
```

