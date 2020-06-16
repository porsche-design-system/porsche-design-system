# Scss

## Breakpoint / Media query
Predefined breakpoints can easily be used as in the following examples.

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

**Note:** For font-styling it's recommended to use the [`<p-headline>`](#/components/typography#headline)/[`<p-text>`](#/components/typography#text) components.

### Headline

Given values are:  
`large-title | headline-1 | headline-2 | headline-3 | headline-4`

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

### Text

With the text mixin, it is possible to get various kinds of text variants (size and weight) by passing two parameters as variables for `size` and `weight`. 
Default is `$p-text-size-small` and `$p-font-weight-regular`.

Pre defined variant values are:  
`$p-text-size-x-small | $p-text-size-small | $p-text-size-medium | $p-text-size-large | $p-text-size-x-large`  

Or more generic `$p-font-size-{v};` where `v` is:  
`12 | 16 | 18 | 20 | 24 | 28 | 30 | 32 | 36 | 42 | 44 | 48 | 52 | 60 | 62 | 72 | 84`

Pre defined weight values are:  
`$p-font-weight-thin | $p-font-weight-regular | $p-font-weight-bold`

#### Example text mixin for usage with SCSS (where {size} is the value for text size and {weight} for text weight):
```
@include p-text({size}, {weight});
```

#### Example with defaults
```
p {
  @include p-text;
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

#### Example with specific parameters
```
p {
  @include p-text($p-text-size-large, $p-font-weight-thin);
}
```

#### Result
```
p {
  font-family: "Porsche Next", "Arial Narrow", Arial, sans-serif;
  font-weight: 100;
  font-size: 2.25rem;
  line-height: 1.33333;
}
```

---

### p-type-scale($size)
Calculates font-size and line-height to fit into Porsche Vertical Grid System.
`$size` only accepts value in rem or px, e.g. 12px or 1.5rem.

#### Example
```
p {
  @include p-type-scale($p-font-size-32);
}
```

#### Result
```
p {
  font-size: 2rem;
  line-height: 1.375;
}
```