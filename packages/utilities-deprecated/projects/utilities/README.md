# Porsche Design System - Utilities

This package contains helpful SCSS functions, mixins and variables. Additionally, JavaScript variables, functions and
helpers are provided. Visit the [Porsche Design System](https://designsystem.porsche.com) to learn more.

## Using the Porsche Design System Utilities

### Installation

Run the following command using [npm](https://www.npmjs.com):

```bash
npm install @porsche-design-system/utilities
```

If you prefer [Yarn](https://yarnpkg.com), use the following command instead:

```bash
yarn add @porsche-design-system/utilities
```

### Usage

#### SCSS

```scss
@import '~@porsche-design-system/utilities/scss';

#app {
  color: $p-color-default;

  @include p-media-query('s') {
    color: $p-color-brand;
  }
}
```

#### JS

**Note!** The JavaScript utilities are especially made for [styled-components](https://styled-components.com) which
allows e.g. the usage
of [media queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries) in JavaScript.

```jsx
import {headline, color, font} from '@porsche-design-system/utilities';

const StyledHeadline = styled.h1`
  ${headline[1]}
`

const StyledP = styled.p`
  color: ${color.brand}
  font-size: ${font.size.small} 
`

render(
  <>
    <StyledHeadline>
      I am styled
    </StyledHeadline>
    <StyledP>
      I am styled
    </StyledP>
  </>
)
```

## License

- See [Custom License](./LICENSE) within npm package