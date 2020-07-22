# Scss

## Media Query
Predefined breakpoints can easily be used as in the following examples.

Available breakpoints:  
`xxs | xs | s | m | l | xl | xxl`

#### Example predefined breakpoint
```
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
```
div {
  color: inherit;
  
  // from 480px to 760px viewport width apply color aqua
  @include p-media-query('480px', '760px') {
    color: aqua;
  }

  // from 760px viewport width apply color deeppink
  @include p-media-query('760px') {
    color: deeppink;
  }
}
```

---

## Typography

**Note:** For font-styling it's recommended to use the [`<p-headline>`](#/components/typography#headline)/[`<p-text>`](#/components/typography#text) components.

### Text

Given values are:  
`x-small | small | medium | large | x-large`

Possible text mixin for usage with SCSS (where {v} is the value):
```
@include p-text-{v};
```

#### Example
```
h1 {
  @include p-text-small;
}
```

#### Result
```
p {
  font-family: "Porsche Next", "Arial Narrow", Arial, sans-serif;
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
```
h1 {
  @include p-headline-1;
}
```

#### Result
```
h1 {
  font-family: "Porsche Next", "Arial Narrow", Arial, sans-serif;
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