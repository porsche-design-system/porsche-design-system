# Js

## Breakpoints

We provide a `breakpoint` object with predefined values: `xxs | xs | s | m | l | xl | xxl` 

#### Example

```
import { breakpoint } from '@porsche-design-system/utilities';

if (window.matchMedia(`(min-width: ${breakpoint.m}px)`).matches) {
  /* The viewport is greater than, or equal to the breakpointValue wide */
} else {
  /* The viewport is less than breakpointValue wide */
}
```

## Media Query

The function has two parameter `mediaQuery(minBreakpoint: breakpoint | number, maxBreakpoint?: breakpoints | number)` where the `minBreakpoint` parameter is mandatory.
You can choose any number as pixel value or our predefined breakpoints as `minBreakpoint` or `maxBreakpoint`.

The type `breakpoint` includes predefined breakpoints: `xxs | xs | s | m | l | xl | xxl`

The `mediaQuery()` function returns a `@media (min-width: minBreakpoints) || @media (min-width: minBreakpoint) and (max-width: maxBreakpoint)`

#### Example predefined breakpoint

```
import { mediaQuery, breakpoint, font, color } from '@porsche-design-system/utilities';

const StyledDiv = css`{
  ...font.size['small']
  color: color.brand,
  fontFamily: font.family
  [mediaQuery(breakpoint.s)]: { color: color.external.facebook }
}`

render (
  <StyledDiv>
    Styled Text
  </StyledDiv>
)
```

---

#### Example custom breakpoint

```
import { mediaQuery, font, color } from '@porsche-design-system/utilities';

const StyledDiv = css`{
  ...font.size['small']
  color: color.brand,
  fontFamily: font.family
  [mediaQuery(320)]: { color: color.external.facebook }
}`

render (
  <StyledDiv>
    Styled Text
  </StyledDiv>
)
```

---

#### Example predefined min and max breakpoint

```
import { mediaQuery, font, color } from '@porsche-design-system/utilities';

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

#### Example custom min and max breakpoint

```
import { mediaQuery, font, color } from '@porsche-design-system/utilities';

const StyledDiv = css`{
  ...font.size['small']
  color: color.brand,
  fontFamily: font.family
  mediaQuery(320, 640)]: { color: color.external.facebook }
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

The predefined variables for `text` and `headline` **only** work with JSS frameworks like styled-components due to the necessity of font sizes in relation to breakpoints.
You can follow e.g. [React media queries Hooks](https://medium.com/@ttennant/react-inline-styles-and-media-queries-using-a-custom-react-hook-e76fa9ec89f6) and style your custom component according to [Typography Guidelines](#/components/typography).

### Text

Given values are:  
`text.xSmall | text.small | text.medium | text.large | text.xLarge`

#### Example

```
import { text } from '@porsche-design-system/utilities';

const PTextSmall = styled.p`
  ${text.small}
`;
```

#### Result

```
PHeadline style = {
  font-family: "Porsche Next", "Arial Narrow", Arial, sans-serif;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.5;
}
```

### Headline

Given variables are:  
`title.large | headline['1'] | headline['2'] | headline['3'] | headline['4'] | headline['5']`

#### Example

```
import { headline } from '@porsche-design-system/utilities';

const PHeadline = styled.h1`
  ${headline['1']}
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

### Generic font definition

With the `generateFontDefinition()` function it is possible to get various kinds of font variants (size and weight) by passing two parameters as variables for `fontSize` and `fontWeight`.
The `fontSize` is freely selectable, for the `fontWeight` one of the predefined weight values must be chosen.

Predefined size values are:  
 `12 | 16 | 18 | 20 | 24 | 28 | 30 | 32 | 36 | 42 | 44 | 48 | 52 | 60 | 62 | 72 | 84 | xSmall | small | medium | large | xLarge`  

Pre defined weight values are:  
 `thin | regular | semibold | bold`

#### Example usage

```
import { generateFontDefinition } from '@porsche-design-system/utilities';

const StyledText = styled.p`
  ${generateFontDefinition('large', 'thin')};
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
