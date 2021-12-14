# Js

<TableOfContents></TableOfContents>

## Breakpoints

We provide a `breakpoint` object with predefined values: `xxs | xs | s | m | l | xl | xxl` 

#### Example

```tsx
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

```tsx
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

```tsx
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

**Note:** For font-styling it's recommended to use the [`<p-headline>`](components/typography/headline)/[`<p-text>`](components/typography/text) components.

The predefined variables for `text` and `headline` **only** work with JSS frameworks like styled-components due to the necessity of font sizes in relation to breakpoints.
You can follow e.g. [React media queries Hooks](https://medium.com/@ttennant/react-inline-styles-and-media-queries-using-a-custom-react-hook-e76fa9ec89f6) and style your custom component according to [Typography Guidelines](components/typography).

### Text

Given values are:  
`text.xSmall | text.small | text.medium | text.large | text.xLarge`

#### Example

```tsx
import { text } from '@porsche-design-system/utilities';
import styled from 'styled-components';

const PTextSmall = styled.p`
  ${text.small}
`;
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

Given variables are:  
`title.large | headline['1'] | headline['2'] | headline['3'] | headline['4'] | headline['5']`

#### Example

```tsx
import { headline } from '@porsche-design-system/utilities';
import styled from 'styled-components';__

const PHeadline = styled.h1`
  ${headline['1']}
`;
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

Given options object keys: 
* `color`: Can be overwritten when default (`currentColor`) is not sufficient, e.g. a custom button with background-color and white text on a page with white surface.  
* `offset`: Can be overwritten when default offset is not sufficient.
* `pseudo`: Needed whenever the invisible clickable and focusable area of an element shall be increased relative to a wrapping element.

#### Example

```tsx
import { color, focus } from '@porsche-design-system/utilities';
import styled from 'styled-components';

const Anchor = styled.a`${focus()}`;
const Button = styled.div`
  // to control the focusable area of the nested button a proper position needs to be defined
  position: relative; 
  padding: 1rem;
  
  // use '::before' or '::after' if the focusable area needs to be enlarged relative to a wrapping element
  button {
    ${focus({color: color.state.focus, offset: '1px', pseudo: '::before'})}
  }`;

return (
  <>
    <Anchor>Some Label</Anchor>
    <Button>Some Label</Button>
  </>
);
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

div {
  position: relative;
  padding: 1rem;
}
div button::-moz-focus-inner { border:0; }
div button::before { 
  content: "";
  outline: transparent solid 1px;
  outline-offset: 1px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
div button:focus::before { outline-color: currentColor; }
div button:focus:not(:focus-visible)::before { outline-color: transparent; }
```