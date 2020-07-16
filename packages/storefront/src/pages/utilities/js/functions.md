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
import { mediaQuery, breakpoint } from '@porsche-design-system/utilities';

const StyledDiv = css`{
  color: 'royalblue',

  // from predefined breakpoint xs to m apply color aqua
  [mediaQuery(breakpoint.xs, breakpoint.m)]: { color: 'aqua' },

  // from predefined breakpoint m apply color deeppink
  [mediaQuery(breakpoint.m)]: { color: 'deeppink' }
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
import { mediaQuery } from '@porsche-design-system/utilities';

const StyledDiv = css`{
  color: 'royalblue',

  // from 480px to 760px viewport width apply color aqua
  [mediaQuery(480, 760)]: { color: 'aqua' },

  // from 760px viewport width apply color deeppink
  [mediaQuery(760)]: { color: 'deeppink' }
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