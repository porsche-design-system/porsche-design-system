# Icon

## Introduction
Porsche UI Kit is using a SVG icon system to present an icon object visually. Each icon is hosted on the Porsche UI Kit CDN to be served and cached as fast as possible. To reference an icon just use the `source` property with the icon name **without** prefix `icon_` and the file extension `.svg`.

For more information and a complete overview of all available Porsche icons, head over to Porsche Icons (comin soon).

## Icons

### Sizes

#### Small - 24px/24px (default)
<Playground>
  <p-icon source="car-next" />
</Playground>

#### Medium - 36px/36px
<Playground>
  <p-icon source="car-next" size="medium" />
</Playground>

#### large - 48px/48px
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

### Custom icon
The whole Porsche icon set is hosted on the Porsche UI Kit CDN. If there is a need to show a custom icon which doesn't exist yet, you can define a custom path (absolute or relative) to your SVG icon in the `source` property. Be sure that the custom icon serves the specific needs like size and viewbox which are described in the [design documentation](#/components/icon/icon#design).

<Playground>
  <p-icon :source="require(`@/assets/icon-custom-kaixin.svg`)" size="large" aria-label="Icon for social media platform Kaixin" />
</Playground>

---

### Lazy loaded icon
Icons can be lazy loaded which means, that they are only loaded (fetched) if they get visible in the viewport.

<Playground>
  <p-icon source="info" size="large" lazy="true" />
</Playground>

---

### Accessibility
With using SVG icons, there are options to give more accessibility to users using screen readers. Here are some good practices:

* If icons stand alone, adding descriptive text with an `aria-label` attribute is a good practice:
```
<p-icon aria-label="descriptive text, e.g: close the layer" />
```
