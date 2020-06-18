# Introduction

## Porsche Design System utilities

This package contains helpful SCSS functions, mixins and variables. Additionally we provide all scss content as JavaScript variables, 
functions and helpers.

**Note!** The JavaScript utilities are especially made for styled-components which allow the usage of media-queries. 
Therefore the usage examples are made for styled-components. You can still use all variables, helper and functions without media-queries to custom style components tho.  

### Install
It's necessary to have access to the Porsche Design System private NPM registry to be able to install the `@porsche-design-system/utilities` NPM package. If you don't have an account yet, please first [read more about getting started as developer](#/start-coding/introduction).
```
// install with npm:
npm install @porsche-design-system/utilities --save-dev

// install with yarn:
yarn add @porsche-design-system/utilities --dev
```

### Usage SCSS

Assuming a proper SCSS compiler is setup within your project: Simply import the following file 
at the place where you want to make use of the Porsche Design System SCSS utils.

```
@import '~@porsche-design-system/utilities/scss';
```

If your SCSS compiler does not support '~' (tilde)) imports, you can of course also import it via a path from your node_modules.

```
@import 'node_modules/@porsche-design-system/utilities/scss';
```

A sample usage might look like as follows:

```
@import '~@porsche-design-system/utilities/scss';

#app {
  color: $p-color-theme-light-default;
  
  @include p-breakpoint('s') {
    color: $p-color-theme-light-brand;
  }
}
```

### Usage JavaScript variables

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
        Iam Styled
    </StyledHeadline>
    <StyledP>
        Iam Styled
    </StyledP>
)

```