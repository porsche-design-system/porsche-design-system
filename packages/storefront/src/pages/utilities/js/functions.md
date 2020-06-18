# Js

## Breakpoints

We provide a `breakpoint` object: 

`xxs: 0,
 xs: 480,
 s: 760,
 m: 1000,
 l: 1300,
 xl: 1760,
 xxl: 1920` 

The usage is explained in the following examples (where 'v' is the breakpoint, e.g. breakpoint.xxs)

#### Example

```

if (window.matchMedia(`(max-width: ${breakpoint.v}px)`).matches) {
      /* The viewport is less than, or equal to the breakpointValue wide */
    } else {
      /* The viewport is greater than breakpointValue wide */
    }

```

## Function mediaQuery() for styled-components

The function has two parameter `mediaQuery(minBreakpoint: breakpoints, maxBreakpoint?: breakpoints)` where the `minBreakpoint` parameter is mandatory.

The type `breakpoints` includes predefined breakpoints:

`xxs | xs | s | m | l | xl | xxl`

The `mediaQuery()` function returns a `@media (min-width: minBreakpount) || @media (min-width: minBreakpoint) and (max-width: maxBreakpoint)`

#### Example

```
const StyledDiv = css`{
    ...font.size['small']
    color: color.brand,
    fontFamily: font.family
    [mediaQuery('s')]: { color: color.external.facebook }
}`

render (
    <StyledDiv>
        Styled Text
    </StyledDiv>
)
```

---

#### Example

```
const StyledDiv = div`{
    ...font.size['small']
    color: color.brand,
    fontFamily: font.family
    [mediaQuery('s', 'm')]: { color: color.external.facebook }
}`

render (
    <StyledDiv>
        Styled Text
    </StyledDiv>
)
```

---

## Typography

**Note:** For font-styling it's recommended to use the [`<p-headline>`](#/components/typography#headline)/[`<p-text>`](#/components/typography#text) components.

The predefined variables for `title` and `headline` **only** work with styled-components, due to the necessity of font sizes in relation to breakpoints.

If there is no other option you can follow [React media queries Hooks](https://medium.com/@ttennant/react-inline-styles-and-media-queries-using-a-custom-react-hook-e76fa9ec89f6) and style your custom component according to [`<p-headline>`](#/components/typography#headline).

### Headline

Given variables are:  
`title.large | headline[1] | headline[2] | headline[3] | headline[4]`

Possible usage with styled-components (where {v} is the value):

#### Example

```
const PHeadline = styled.h1`
    ${headline[v]}
`;
```

#### Result

```
PHeadline style = {
  font-family: "Porsche Next", "Arial Narrow", Arial, sans-serif;
  font-weight: 600;
  font-size: 1.75rem;
  line-height: 1.4285714286;
}

@media (min-width: 760px) and (max-width: 999px) {
  PHeadline {
    font-size: 2.25rem;
    line-height: 1.2222222222;
  }
}

@media (min-width: 1000px) and (max-width: 1299px) {
  PHeadline {
    font-size: 2.75rem;
    line-height: 1.1818181818;
  }
}

@media (min-width: 1300px) and (max-width: 1759px) {
  PHeadline {
    font-size: 3.25rem;
    line-height: 1.2307692308;
  }
}

@media (min-width: 1760px) {
  PHeadline {
    font-size: 3.75rem;
    line-height: 1.2;
  }
}
```

### Text

With the `text()` function it is possible to get various kinds of text variants (size and weight) by passing two parameters as variables for `fontSize` and `fontWeight`.
The `fontSize` is freely selectable, for the `fontWeight` one of the predefined weight values must be chosen.

Predefined size values are:  
 `12 | 16 | 18 | 20 | 24 | 28 | 30 | 32 | 36 | 42 | 44 | 48 | 52 | 60 | 62 | 72 | 84 | xSmall | small | medium | large | xLarge`  

Pre defined weight values are:  
 `thin |regular | bold`

Default is `font.size.small` and `font.weight.regular`.

#### Example standard usage

```
const StyledText = styled.p`
    ${text()};
`
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
const StyledText = styled.p`
    ${text('large','thin')};
`
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
