# Introduction

<TableOfContents></TableOfContents>

## Porsche Design System - Utilities

<p-inline-notification heading="Important note" state="error" dismiss-button="false">
  The <code>Porsche Design System - Utilities</code> package is <strong>deprecated</strong> and will no longer be maintained.<br>
  All Porsche Design System utilities are now provided via the @porsche-design-system/components-{js|angular|react|vue}/styles sub-package.<br>
  To make the migration easier have a look at the <a href="news/changelog/utilities">changelog</a> which contains a migration path.
</p-inline-notification>

This package contains helpful SCSS & JS variables, functions and helpers.

### Install

All releases are available as versioned NPM packages. You can consume the public `@porsche-design-system/utilities`
package here:

- Public NPM registry ([https://www.npmjs.com](https://www.npmjs.com))

```shell
// install with npm:
npm install @porsche-design-system/utilities

// install with yarn:
yarn add @porsche-design-system/utilities
```

### Usage SCSS

Assuming a proper SCSS compiler is set up within your project: Simply import the following file at the place where you
want to make use of the **@porsche-design-system/utilities**.

```scss
@import '~@porsche-design-system/utilities/scss';
```

If your SCSS compiler does not support '~' (tilde) imports, you can also import it trough a relative path from your **
node_modules**.

```scss
@import 'path-to-your-node_modules/@porsche-design-system/utilities/scss';
```

A sample usage might look like as follows:

```scss
@import '~@porsche-design-system/utilities/scss';

#app {
  color: $p-color-default;

  @include p-media-query('s') {
    color: $p-color-brand;
  }
}
```

### Usage JavaScript

**Note!** The JavaScript utilities are especially made for JSS frameworks like
[styled-components](https://styled-components.com) which allows e.g. the usage of
[media queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries) in JavaScript.
Therefore examples are made with styled components.

```jsx
import { headline, color, font } from '@porsche-design-system/utilities';

const StyledHeadline = styled.h1`
  ${headline['1']}
`;

const StyledP = styled.p`
  color: ${color.brand}
  font-size: ${font.size.small} 
`;

render(
  <>
    <StyledHeadline>I am styled</StyledHeadline>
    <StyledP>I am styled</StyledP>
  </>
);
```
