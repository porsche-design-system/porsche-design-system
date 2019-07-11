# Spacing

## Introduction
Global CSS utility classes, variables and mixins (for responsive spacings) to add margins (positive and negative) and paddings to elements.

## Static spacings

### Spacings visualized

<Playground :childElementLayout="{spacing: 'inline'}">
  <div class="example-spacing-visual">
    <div class="p-spacing-pt-4 p-spacing-pr-4" />
  </div>
  <div class="example-spacing-visual">
    <div class="p-spacing-pt-8 p-spacing-pr-8" />
  </div>
  <div class="example-spacing-visual">
    <div class="p-spacing-pt-16 p-spacing-pr-16" />
  </div>
  <div class="example-spacing-visual">
    <div class="p-spacing-pt-24 p-spacing-pr-24" />
  </div>
  <div class="example-spacing-visual">
    <div class="p-spacing-pt-32 p-spacing-pr-32" />
  </div>
  <div class="example-spacing-visual">
    <div class="p-spacing-pt-40 p-spacing-pr-40" />
  </div>
  <div class="example-spacing-visual">
    <div class="p-spacing-pt-48 p-spacing-pr-48" />
  </div>
  <div class="example-spacing-visual">
    <div class="p-spacing-pt-56 p-spacing-pr-56" />
  </div>
  <div class="example-spacing-visual">
    <div class="p-spacing-pt-64 p-spacing-pr-64" />
  </div>
  <div class="example-spacing-visual">
    <div class="p-spacing-pt-72 p-spacing-pr-72" />
  </div>
  <div class="example-spacing-visual">
    <div class="p-spacing-pt-80 p-spacing-pr-80" />
  </div>
</Playground>

### Static margin spacings

#### All directions

<Playground>
  <div class="example-spacing">
    <div class="p-spacing-m-40" />
  </div>
</Playground>

#### Top

<Playground>
  <div class="example-spacing">
    <div class="p-spacing-mt-40" />
  </div>
</Playground>

#### Right

<Playground>
  <div class="example-spacing">
    <div class="p-spacing-mr-40" />
  </div>
</Playground>

#### Bottom

<Playground>
  <div class="example-spacing">
    <div class="p-spacing-mb-40" />
  </div>
</Playground>

#### Left

<Playground>
  <div class="example-spacing">
    <div class="p-spacing-ml-40" />
  </div>
</Playground>

---

### Static negative margin spacings

#### All directions

<Playground>
  <div class="example-spacing negative">
    <div class="p-spacing-m-n-40" />
  </div>
</Playground>

#### Top

<Playground>
  <div class="example-spacing negative">
    <div class="p-spacing-m-nt-40" />
  </div>
</Playground>

#### Right

<Playground>
  <div class="example-spacing negative">
    <div class="p-spacing-m-nr-40" />
  </div>
</Playground>

#### Bottom

<Playground>
  <div class="example-spacing negative">
    <div class="p-spacing-m-nb-40" />
  </div>
</Playground>

#### Left

<Playground>
  <div class="example-spacing negative">
    <div class="p-spacing-m-nl-40" />
  </div>
</Playground>

---

### Static padding spacings

#### All directions

<Playground>
  <div class="example-spacing">
    <div class="p-spacing-p-40"/>
  </div>
</Playground>

#### Top

<Playground>
  <div class="example-spacing">
    <div class="p-spacing-pt-40"/>
  </div>
</Playground>

#### Right

<Playground>
<div class="example-spacing">
  <div class="p-spacing-pr-40"/>
</div>
</Playground>

#### Bottom

<Playground>
  <div class="example-spacing">
    <div class="p-spacing-pb-40"/>
  </div>
</Playground>

#### Left

<Playground>
  <div class="example-spacing">
    <div class="p-spacing-pl-40"/>
  </div>
</Playground>

--- 

### Usage
Static spacings can be used as `padding` or `margin` by a CSS utility class on the element itself or as variable inside SCSS.

**Given values are:**

`0 | 4 | 8 | 16 | 24 | 32 | 40 | 48 | 56 | 64 | 72 | 80`

**Possible class names for margin spacings (where {v} is the spacing value):**
* `p-spacing-m-{v}` => margin (all 4 directions)
* `p-spacing-mt-{v}` => margin-top
* `p-spacing-mr-{v}` => margin-right
* `p-spacing-mb-{v}` => margin-bottom
* `p-spacing-ml-{v}` => margin-left
* `p-spacing-m-n-{v}` => negative margin (all 4 directions)
* `p-spacing-m-nt-{v}` => negative margin-top
* `p-spacing-m-nr-{v}` => negative margin-right
* `p-spacing-m-nb-{v}` => negative margin-bottom
* `p-spacing-m-nl-{v}` => negative margin-left
* `p-spacing-mt-auto` => margin-top "auto"
* `p-spacing-mr-auto` => margin-right "auto"
* `p-spacing-mb-auto` => margin-bottom "auto"
* `p-spacing-ml-auto` => margin-left "auto"

**Possible class names for padding spacings (where {v} is the spacing value):**
* `p-spacing-p-{v}` => padding (all 4 directions)
* `p-spacing-pt-{v}` => padding-top
* `p-spacing-pr-{v}` => padding-right
* `p-spacing-pb-{v}` => padding-bottom
* `p-spacing-pl-{v}` => padding-left

**Possible variable for usage inside SCSS (where {v} is the spacing value):**
* `$p-spacing-{v};`

---

## Responsive spacings
Responsive spacings adapt their spacing value automatically with predefined sizes regarding to major breakpoints. On smaller viewports they decrease, on bigger screens they increase.

### Spacings visualized

<Playground :childElementLayout="{spacing: 'inline'}">
  <div class="example-spacing-visual">
    <div class="p-spacing-pt-a p-spacing-pr-a" />
  </div>
  <div class="example-spacing-visual">
    <div class="p-spacing-pt-b p-spacing-pr-b" />
  </div>
  <div class="example-spacing-visual">
    <div class="p-spacing-pt-c p-spacing-pr-c" />
  </div>
  <div class="example-spacing-visual">
    <div class="p-spacing-pt-d p-spacing-pr-d" />
  </div>
  <div class="example-spacing-visual">
    <div class="p-spacing-pt-e p-spacing-pr-e" />
  </div>
  <div class="example-spacing-visual">
    <div class="p-spacing-pt-f p-spacing-pr-f" />
  </div>
  <div class="example-spacing-visual">
    <div class="p-spacing-pt-g p-spacing-pr-g" />
  </div>
</Playground>

### Responsive margin spacings

#### All directions

<Playground>
  <div class="example-spacing">
    <div class="p-spacing-m-d" />
  </div>
</Playground>

#### Top

<Playground>
  <div class="example-spacing">
    <div class="p-spacing-mt-d" />
  </div>
</Playground>

#### Right

<Playground>
  <div class="example-spacing">
    <div class="p-spacing-mr-d" />
  </div>
</Playground>

#### Bottom

<Playground>
  <div class="example-spacing">
    <div class="p-spacing-mb-d" />
  </div>
</Playground>

#### Left

<Playground>
  <div class="example-spacing">
    <div class="p-spacing-ml-d" />
  </div>
</Playground>

---

### Responsive negative margin spacings

#### All directions

<Playground>
  <div class="example-spacing negative-responsive">
    <div class="p-spacing-m-n-d" />
  </div>
</Playground>

#### Top

<Playground>
  <div class="example-spacing negative-responsive">
    <div class="p-spacing-m-nt-d" />
  </div>
</Playground>

#### Right

<Playground>
  <div class="example-spacing negative-responsive">
    <div class="p-spacing-m-nr-d" />
  </div>
</Playground>

#### Bottom

<Playground>
  <div class="example-spacing negative-responsive">
    <div class="p-spacing-m-nb-d" />
  </div>
</Playground>

#### Left

<Playground>
  <div class="example-spacing negative-responsive">
    <div class="p-spacing-m-nl-d" />
  </div>
</Playground>

---

### Responsive padding spacings

#### All directions

<Playground>
  <div class="example-spacing">
    <div class="p-spacing-p-d"/>
  </div>
</Playground>

#### Top

<Playground>
  <div class="example-spacing">
    <div class="p-spacing-pt-d"/>
  </div>
</Playground>

#### Right

<Playground>
  <div class="example-spacing">
    <div class="p-spacing-pr-d"/>
  </div>
</Playground>

#### Bottom

<Playground>
  <div class="example-spacing">
    <div class="p-spacing-pb-d"/>
  </div>
</Playground>

#### Left

<Playground>
  <div class="example-spacing">
    <div class="p-spacing-pl-d"/>
  </div>
</Playground>

--- 

### Usage
Responsive spacings can be used to achieve different spacings on predefined major viewport sizes, e.g. to equalize overall whitespace between elements. They can be used as a CSS utility class on the element itself or as a mixin directly in SCSS.

**Given values are:**

`"a" | "b" | "c" | "d" | "e" | "f" | "g"`

**Possible class names (where {v} is the spacing value):**
* `p-spacing-m-{v}` => margin (all 4 directions)
* `p-spacing-mt-{v}` => margin-top
* `p-spacing-mr-{v}` => margin-right
* `p-spacing-mb-{v}` => margin-bottom
* `p-spacing-ml-{v}` => margin-left
* `p-spacing-m-n-{v}` => negative margin (all 4 directions)
* `p-spacing-m-nt-{v}` => negative margin-top
* `p-spacing-m-nr-{v}` => negative margin-right
* `p-spacing-m-nb-{v}` => negative margin-bottom
* `p-spacing-m-nl-{v}` => negative margin-left
* `p-spacing-p-{v}` => padding (all 4 directions)
* `p-spacing-pt-{v}` => padding-top
* `p-spacing-pr-{v}` => padding-right
* `p-spacing-pb-{v}` => padding-bottom
* `p-spacing-pl-{v}` => padding-left

**Possible mixin for usage inside SCSS (where {v} is the spacing value):**
* `@include p-spacing-{v}({type}, {direction:optional}, {sign:optional})`

**Examples of responsive spacing mixin (with positive and negative value):**
The responsive spacing mixin needs up to 3 parameters passed for defining type, direction and sign.

* `@include p-spacing-a('padding')` => positive spacing "a" with padding in all directions
* `@include p-spacing-b('margin', 'top')` => positive spacing "b" with margin-top direction
* `@include p-spacing-b('margin', 'top', '-')` => negative spacing "b" with margin-top direction

--- 

## Responsive zero spacings defined by breakpoints
In some cases spacings need to be set to zero to delete unwanted spacings for a specific breakpoint (e.g. by changing major layout from desktop to mobile).
To achive highest flexibility, breakpoint behaviour can set **from** a `min` breakpoint value and also **to** a `max` breakpoint value. This means that zero spacings can be defined from breakpoint `xxs` to the max value given in the class name and also from the min value in the class name to breakpoint `xxl` (@see `min` and `max` identifiers in the class name).

**Example**:  
`p-spacing-m-0-max-s` => zero value (of margin) is set until breakpoint `s` is reached, the the other value takes care of your spacing on wider viewports.  
`p-spacing-m-0-min-s` => zero value (of margin) is set after breakpoint `s` is reached, the the other value takes care of your spacing on smaller viewports.

### Zero margin spacings defined by breakpoints for static spacings

#### Reset margin-top until breakpoint "s"

<Playground>
  <div class="example-spacing">
    <div class="p-spacing-mt-0-max-s p-spacing-mt-40" />
  </div>
</Playground>

#### Reset margin-top from breakpoint "s"

<Playground>
  <div class="example-spacing">
    <div class="p-spacing-mt-0-min-s p-spacing-mt-40" />
  </div>
</Playground>

### Zero padding spacings defined by breakpoints for static spacings

#### Reset padding-top to max breakpoint "s"

<Playground>
  <div class="example-spacing">
    <div class="p-spacing-pt-0-max-s p-spacing-pt-40" />
  </div>
</Playground>

#### Reset padding-top from min breakpoint "s"

<Playground>
  <div class="example-spacing">
    <div class="p-spacing-pt-0-min-s p-spacing-pt-40" />
  </div>
</Playground>

### Zero padding spacings defined by breakpoints for responsive spacings

#### Reset margin-top to max breakpoint "s"

<Playground>
  <div class="example-spacing">
    <div class="p-spacing-mt-0-max-s p-spacing-mt-d" />
  </div>
</Playground>

#### Reset margin-top from min breakpoint "s"

<Playground>
  <div class="example-spacing">
    <div class="p-spacing-mt-0-min-s p-spacing-mt-d" />
  </div>
</Playground>

#### Reset padding-top to max breakpoint "s"

<Playground>
  <div class="example-spacing">
    <div class="p-spacing-pt-0-max-s p-spacing-pt-d" />
  </div>
</Playground>

#### Reset padding-top from min breakpoint "s"

<Playground>
  <div class="example-spacing">
    <div class="p-spacing-pt-0-min-s p-spacing-pt-d" />
  </div>
</Playground>