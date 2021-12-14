# Scss

<TableOfContents></TableOfContents>

## Media Query
Predefined breakpoints can easily be used as in the following examples.

Available breakpoints:  
`xxs | xs | s | m | l | xl | xxl`

#### Example predefined breakpoint
```scss
@import '~@porsche-design-system/utilities/scss';

div {
  color: inherit;
  
  // from predefined breakpoint xs to m apply color aqua
  @include p-media-query('xs', 'm') {
    color: aqua;
  }

  // from predefined breakpoint m apply color deeppink
  @include p-media-query('m') {
    color: deeppink;
  }
}
```

---

#### Example custom breakpoint
```scss
@import '~@porsche-design-system/utilities/scss';

div {
  color: inherit;
  
  // from 480px to 760px viewport width apply color aqua
  @include p-media-query(480px, 760px) {
    color: aqua;
  }

  // from 760px viewport width apply color deeppink
  @include p-media-query(760px) {
    color: deeppink;
  }
}
```

---

## Typography

**Note:** For font-styling it's recommended to use the [`<p-headline>`](components/typography/headline)/[`<p-text>`](components/typography/text) components.

### Text

Given values are:  
`x-small | small | medium | large | x-large`

Possible text mixin for usage with SCSS (where {v} is the value):
```
@include p-text-{v};
```

#### Example
```scss
@import '~@porsche-design-system/utilities/scss';

h1 {
  @include p-text-small;
}
```

#### Result
```css
p {
  font-family: "Porsche Next", "Arial Narrow", Arial, 'Heiti SC', SimHei, sans-serif;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.5;
}
```

### Headline

Given values are:  
`title-large | headline-1 | headline-2 | headline-3 | headline-4 | headline-5`

Possible headline mixin for usage with SCSS (where {v} is the value):
```
@include p-{v};
```

#### Example
```scss
@import '~@porsche-design-system/utilities/scss';

h1 {
  @include p-headline-1;
}
```

#### Result
```css
h1 {
  font-family: "Porsche Next", "Arial Narrow", Arial, 'Heiti SC', SimHei, sans-serif;
  font-weight: 600;
  font-size: 1.75rem;
  line-height: 1.4285714286;
}

@media (min-width: 760px) and (max-width: 999px) {
  h1 {
    font-size: 2.25rem;
    line-height: 1.2222222222;
  }
}

@media (min-width: 1000px) and (max-width: 1299px) {
  h1 {
    font-size: 2.75rem;
    line-height: 1.1818181818;
  }
}

@media (min-width: 1300px) and (max-width: 1759px) {
  h1 {
    font-size: 3.25rem;
    line-height: 1.2307692308;
  }
}

@media (min-width: 1760px) {
  h1 {
    font-size: 3.75rem;
    line-height: 1.2;
  }
}
```

---

## State

### Focus

The `:focus` state helps the user to navigate through all interactive elements via tab key and is required by accessibility guidelines and law. 
The provided SCSS mixin ensures focus is shown by keyboard navigation only.

Given parameters are: 
* `$color`: Can be overwritten when default (`currentColor`) is not sufficient, e.g. a custom button with background-color and white text on a page with white surface.  
* `$offset`: Can be overwritten when default offset is not sufficient.  
* `$pseudo`: Needed whenever the invisible clickable and focusable area of an element shall be increased relative to a wrapping element.

#### Example

```scss
@import '~@porsche-design-system/utilities/scss';

a {
  @include p-focus;
}

.some-wrapper {
  // to control the focusable area of the nested button a proper position needs to be defined
  position: relative;
  padding: 1rem;

  button {
    // use '::before' or '::after' if the focusable area needs to be enlarged relative to a wrapping element
    @include p-focus($p-color-state-focus, 1px, '::before');
  }
}
```

#### Result

```css
a { 
  outline: transparent solid 1px;
  outline-offset: 2px;
}
a::-moz-focus-inner { border: 0; }
a:focus { outline-color: currentColor; }
a:focus:not(:focus-visible) { outline-color: transparent; }

.some-wrapper {
  position: relative;
  padding: 1rem;
}
.some-wrapper button::-moz-focus-inner { border:0; }
.some-wrapper button::before { 
  content: "";
  outline: transparent solid 1px;
  outline-offset: 1px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.some-wrapper button:focus::before { outline-color: currentColor; }
.some-wrapper button:focus:not(:focus-visible)::before { outline-color: transparent; }
```
