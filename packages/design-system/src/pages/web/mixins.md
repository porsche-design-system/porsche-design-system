# Mixins

## Breakpoint / Media query
Predefined breakpoints can be easily used like in following examples.  

Available breakpoints:  
`xxs | xs | s | m | l | xl | xxl`

#### Example
```
div {
  color: inherit;
  
  @include p-breakpoint('s') {
    color: deeppink;
  }
}
```

#### Result
```
div {
  color: inherit;
}

@media (min-width: 760px) {
  div {
    color: deeppink;
  }
}
```

---

#### Example
```
div {
  color: inherit;
  
  @include p-breakpoint('s', 'm') {
    color: deeppink;
  }
}
```

#### Result
```
div {
  color: inherit;
}

@media (min-width: 760px) and (max-width: 999px) {
  div {
    color: deeppink;
  }
}
```

---

## Typography

**Note:** For font-styling it's recommended to use [`<p-headline>`](#/web/components/basic/typography#code)/[`<p-text>`](#/web/components/basic/typography#code) component.

### Headline

Given values are:  
`large-title | headline-1 | headline-2 | headline-3 | headline-4 | headline-5 | headline-6`

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
  font-size: 1.5rem;
  line-height: 1.333;
  margin-top: 4.5rem;
}

@media (min-width: 760px) and (max-width: 999px) {
  h1 {
    font-size: 1.875rem;
    line-height: 1.333;
  }
}

@media (min-width: 1000px) and (max-width: 1299px) {
  h1 {
    font-size: 2.25rem;
    line-height: 1.222;
  }
}

@media (min-width: 1300px) and (max-width: 1759px) {
  h1 {
    font-size: 2.625rem;
    line-height: 1.238;
  }
}

@media (min-width: 1760px) {
  h1 {
    font-size: 3rem;
    line-height: 1.166;
  }
}
```

### Text

Given values are:  
`copy | small`

Possible headline mixin for usage with SCSS (where {v} is the value):
```
@include p-text-{v};
```

#### Example
```
p {
  @include p-text-copy;
}
```

#### Result
```
p {
  font-family: "Porsche Next", "Arial Narrow", Arial, sans-serif;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.5;
  margin-top: 1.5rem;
}
```
