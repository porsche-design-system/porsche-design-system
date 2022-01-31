# Porsche Design System - Utilities

This package contains helpful SCSS functions, mixins and variables.
Additionally, we provide JavaScript variables, functions and helpers.

## Install
It's necessary to have access to the Porsche Design System private NPM registry to be able to install the `@porsche-design-system/utilities` NPM package. 
If you don't have an account yet, please first [read more about getting started as developer](start-coding/introduction).

```
// install with npm:
npm install @porsche-design-system/utilities --save-dev

// install with yarn:
yarn add @porsche-design-system/utilities --dev
```

## Usage SCSS

Assuming a proper SCSS compiler is set up within your project: Simply import the following file 
at the place where you want to make use of the **@porsche-design-system/utilities**.

```
@import '~@porsche-design-system/utilities/scss';
```

If your SCSS compiler does not support '~' (tilde) imports, you can also import it trough a relative path from your **node_modules**.

```
@import 'path-to-your-node_modules/@porsche-design-system/utilities/scss';
```

A sample usage might look like as follows:

```
@import '~@porsche-design-system/utilities/scss';

#app {
  color: $p-color-default;
  
  @include p-media-query('s') {
    color: $p-color-brand;
  }
}
```

## Usage JavaScript

**Note!** The JavaScript utilities are especially made for [styled-components](https://styled-components.com) which allows e.g. the usage of [media queries](https://developer.mozilla.org/de/docs/Web/CSS/Media_Queries/Using_media_queries) in JavaScript. 

```
import { headline, color, font } from '@porsche-design-system/utilities';

const StyledHeadline = styled.h1`
    ${headline[1]}
`

const StyledP = styled.p`
    color: ${color.brand}
    font-size: ${font.size.small} 
`

render (
    <StyledHeadline>
        I am styled
    </StyledHeadline>
    <StyledP>
        I am styled
    </StyledP>
)
```