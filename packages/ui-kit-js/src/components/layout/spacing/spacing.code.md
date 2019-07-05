# Spacing

## Introduction
Global CSS utility classes to add margins (positive and negative) and paddings to elements.

## Static spacings

### Spacings visualized

<Playground :childElementLayout="{spacing: 'inline'}">
  <div class="example-spacing-visual">
    <div class="p-spacing-pt--4 p-spacing-pr--4" />
  </div>
  <div class="example-spacing-visual">
    <div class="p-spacing-pt--8 p-spacing-pr--8" />
  </div>
  <div class="example-spacing-visual">
    <div class="p-spacing-pt--16 p-spacing-pr--16" />
  </div>
  <div class="example-spacing-visual">
    <div class="p-spacing-pt--24 p-spacing-pr--24" />
  </div>
  <div class="example-spacing-visual">
    <div class="p-spacing-pt--32 p-spacing-pr--32" />
  </div>
  <div class="example-spacing-visual">
    <div class="p-spacing-pt--40 p-spacing-pr--40" />
  </div>
  <div class="example-spacing-visual">
    <div class="p-spacing-pt--48 p-spacing-pr--48" />
  </div>
  <div class="example-spacing-visual">
    <div class="p-spacing-pt--56 p-spacing-pr--56" />
  </div>
  <div class="example-spacing-visual">
    <div class="p-spacing-pt--64 p-spacing-pr--64" />
  </div>
  <div class="example-spacing-visual">
    <div class="p-spacing-pt--72 p-spacing-pr--72" />
  </div>
  <div class="example-spacing-visual">
    <div class="p-spacing-pt--80 p-spacing-pr--80" />
  </div>
</Playground>

### Static margin spacings

#### All directions

<Playground>
  <div class="example-spacing">
    <div class="p-spacing-m--40" />
  </div>
</Playground>

#### Top

<Playground>
  <div class="example-spacing">
    <div class="p-spacing-mt--40" />
  </div>
</Playground>

#### Right

<Playground>
  <div class="example-spacing">
    <div class="p-spacing-mr--40" />
  </div>
</Playground>

#### Bottom

<Playground>
  <div class="example-spacing">
    <div class="p-spacing-mb--40" />
  </div>
</Playground>

#### Left

<Playground>
  <div class="example-spacing">
    <div class="p-spacing-ml--40" />
  </div>
</Playground>

---

### Static negative margin spacings

#### All directions

<Playground>
  <div class="example-spacing negative">
    <div class="p-spacing-m-n--40" />
  </div>
</Playground>

#### Top

<Playground>
  <div class="example-spacing negative">
    <div class="p-spacing-m-nt--40" />
  </div>
</Playground>

#### Right

<Playground>
  <div class="example-spacing negative">
    <div class="p-spacing-m-nr--40" />
  </div>
</Playground>

#### Bottom

<Playground>
  <div class="example-spacing negative">
    <div class="p-spacing-m-nb--40" />
  </div>
</Playground>

#### Left

<Playground>
  <div class="example-spacing negative">
    <div class="p-spacing-m-nl--40" />
  </div>
</Playground>

---

### Static padding spacings

#### All directions

<Playground>
  <div class="example-spacing">
    <div class="p-spacing-p--40"/>
  </div>
</Playground>

#### Top

<Playground>
  <div class="example-spacing">
    <div class="p-spacing-pt--40"/>
  </div>
</Playground>

#### Right

<Playground>
<div class="example-spacing">
  <div class="p-spacing-pr--40"/>
</div>
</Playground>

#### Bottom

<Playground>
  <div class="example-spacing">
    <div class="p-spacing-pb--40"/>
  </div>
</Playground>

#### Left

<Playground>
  <div class="example-spacing">
    <div class="p-spacing-pl--40"/>
  </div>
</Playground>

#### Usage
Static spacings can be used as `padding` or `margin` by a CSS utility class.

**Given values are:**

`4 | 8 | 16 | 24 | 32 | 40 | 48 | 56 | 64 | 72 | 80`

**Possible class names (where {v} is the spacing value):**
* `p-spacing-m--{v}` => margin (all 4 directions)
* `p-spacing-mt--{v}` => margin-top
* `p-spacing-mr--{v}` => margin-right
* `p-spacing-mb--{v}` => margin-bottom
* `p-spacing-ml--{v}` => margin-left
* `p-spacing-m-n--{v}` => negative margin (all 4 directions)
* `p-spacing-m-nt--{v}` => negative margin-top
* `p-spacing-m-nr--{v}` => negative margin-right
* `p-spacing-m-nb--{v}` => negative margin-bottom
* `p-spacing-m-nl--{v}` => negative margin-left
* `p-spacing-p--{v}` => padding (all 4 directions)
* `p-spacing-pt--{v}` => padding-top
* `p-spacing-pr--{v}` => padding-right
* `p-spacing-pb--{v}` => padding-bottom
* `p-spacing-pl--{v}` => padding-left

---

## Responsive spacings
Responsive spacings adapt their spacing value automatically with predefined sizes regarding to major breakpoints. On smaller viewports they decrease, on bigger screens they increase.

### Spacings visualized

<Playground :childElementLayout="{spacing: 'inline'}">
  <div class="example-spacing-visual">
    <div class="p-spacing-pt--a p-spacing-pr--a" />
  </div>
  <div class="example-spacing-visual">
    <div class="p-spacing-pt--b p-spacing-pr--b" />
  </div>
  <div class="example-spacing-visual">
    <div class="p-spacing-pt--c p-spacing-pr--c" />
  </div>
  <div class="example-spacing-visual">
    <div class="p-spacing-pt--d p-spacing-pr--d" />
  </div>
  <div class="example-spacing-visual">
    <div class="p-spacing-pt--e p-spacing-pr--e" />
  </div>
  <div class="example-spacing-visual">
    <div class="p-spacing-pt--f p-spacing-pr--f" />
  </div>
  <div class="example-spacing-visual">
    <div class="p-spacing-pt--g p-spacing-pr--g" />
  </div>
</Playground>

### Responsive margin spacings

#### All directions

<Playground>
  <div class="example-spacing">
    <div class="p-spacing-m--d" />
  </div>
</Playground>

#### Top

<Playground>
  <div class="example-spacing">
    <div class="p-spacing-mt--d" />
  </div>
</Playground>

#### Right

<Playground>
  <div class="example-spacing">
    <div class="p-spacing-mr--d" />
  </div>
</Playground>

#### Bottom

<Playground>
  <div class="example-spacing">
    <div class="p-spacing-mb--d" />
  </div>
</Playground>

#### Left

<Playground>
  <div class="example-spacing">
    <div class="p-spacing-ml--d" />
  </div>
</Playground>

---

### Responsive negative margin spacings

#### All directions

<Playground>
  <div class="example-spacing negative-responsive">
    <div class="p-spacing-m-n--d" />
  </div>
</Playground>

#### Top

<Playground>
  <div class="example-spacing negative-responsive">
    <div class="p-spacing-m-nt--d" />
  </div>
</Playground>

#### Right

<Playground>
  <div class="example-spacing negative-responsive">
    <div class="p-spacing-m-nr--d" />
  </div>
</Playground>

#### Bottom

<Playground>
  <div class="example-spacing negative-responsive">
    <div class="p-spacing-m-nb--d" />
  </div>
</Playground>

#### Left

<Playground>
  <div class="example-spacing negative-responsive">
    <div class="p-spacing-m-nl--d" />
  </div>
</Playground>

---

### Responsive padding spacings

#### All directions

<Playground>
  <div class="example-spacing">
    <div class="p-spacing-p--d"/>
  </div>
</Playground>

#### Top

<Playground>
  <div class="example-spacing">
    <div class="p-spacing-pt--d"/>
  </div>
</Playground>

#### Right

<Playground>
  <div class="example-spacing">
    <div class="p-spacing-pr--d"/>
  </div>
</Playground>

#### Bottom

<Playground>
  <div class="example-spacing">
    <div class="p-spacing-pb--d"/>
  </div>
</Playground>

#### Left

<Playground>
  <div class="example-spacing">
    <div class="p-spacing-pl--d"/>
  </div>
</Playground>

#### Usage
Responsive spacings can be used to achieve different spacings on predefined major viewport sizes, e.g. to equalize overall whitespace between elements.

**Given values are:**

`"a" | "b" | "c" | "d" | "e" | "f" | "g"`

**Possible class names (where {v} is the spacing value):**
* `p-spacing-m--{v}` => margin (all 4 directions)
* `p-spacing-mt--{v}` => margin-top
* `p-spacing-mr--{v}` => margin-right
* `p-spacing-mb--{v}` => margin-bottom
* `p-spacing-ml--{v}` => margin-left
* `p-spacing-m-n--{v}` => negative margin (all 4 directions)
* `p-spacing-m-nt--{v}` => negative margin-top
* `p-spacing-m-nr--{v}` => negative margin-right
* `p-spacing-m-nb--{v}` => negative margin-bottom
* `p-spacing-m-nl--{v}` => negative margin-left
* `p-spacing-p--{v}` => padding (all 4 directions)
* `p-spacing-pt--{v}` => padding-top
* `p-spacing-pr--{v}` => padding-right
* `p-spacing-pb--{v}` => padding-bottom
* `p-spacing-pl--{v}` => padding-left