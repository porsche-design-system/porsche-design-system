# Introduction

## Styles

Styles are the foundational layer of our design language and define basics like colors in different themes, typography
and other effects that can be applied to objects; or to define the structure and appearance with layout grid and
spacings.

You should only use the styles whenever you have to build a custom component or pattern that is not yet available in the
components library or for foundational layout objects like typography, surfaces and boxes.

The styles are available as JavaScript and SCSS version and available in the Figma library.

- [Border](styles/border)
- [Drop Shadow](styles/drop-shadow)
- [Focus](styles/focus)
- [Frosted Glass](styles/frosted-glass)
- [Gradient](styles/gradient)
- [Grid](styles/grid)
- [Media Query](styles/media-query)
- [Motion](styles/motion)
- [Spacing](styles/spacing)
- [Theme](styles/theme)
- [Typography](styles/typography)

### JS

When working with JavaScript styles, the way you import them depends on the library or tool you're using.

For most css-in-js libraries (e.g., `JSS`, `styled-components`...):
`import { … } from '@porsche-design-system/components-{js|angular|react|vue}/styles';`.

For `vanilla-extract`:
`import { … } from '@porsche-design-system/components-{js|angular|react|vue}/styles/vanilla-extract';`.

Make sure to use `"moduleResolution": "bundler"` in the `compilerOptions` of your `tsconfig.json` to ensure the correct
resolution of the styles.

### SCSS

SCSS styles can be imported by: `@use '@porsche-design-system/components-{js|angular|react|vue}/styles' as *`;
