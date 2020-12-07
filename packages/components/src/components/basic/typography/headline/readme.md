# Typography

## Headline



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                                                      | Type                                                                                                    | Default        |
| ---------- | ---------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------- | -------------- |
| `align`    | `align`    | Text alignment of the component.                                                                 | `"center" \| "left" \| "right"`                                                                         | `'left'`       |
| `color`    | `color`    | Basic text color variations depending on theme property.                                         | `"default" \| "inherit"`                                                                                | `'default'`    |
| `ellipsis` | `ellipsis` | Adds an ellipsis to a single line of text if it overflows.                                       | `boolean`                                                                                               | `false`        |
| `size`     | `size`     | Custom size of the headline.                                                                     | `string \| { base: TextSize; xs?: TextSize; s?: TextSize; m?: TextSize; l?: TextSize; xl?: TextSize; }` | `undefined`    |
| `tag`      | `tag`      | Sets a custom HTML tag depending of the usage of the headline component.                         | `"h1" \| "h2" \| "h3" \| "h4" \| "h5" \| "h6"`                                                          | `undefined`    |
| `theme`    | `theme`    | Adapts the text color depending on the theme. Has no effect when "inherit" is set as color prop. | `"dark" \| "light"`                                                                                     | `'light'`      |
| `variant`  | `variant`  | Predefined style of the headline.                                                                | `"headline-1" \| "headline-2" \| "headline-3" \| "headline-4" \| "headline-5" \| "large-title"`         | `'headline-1'` |


## Dependencies

### Depends on

- [p-text](../text)