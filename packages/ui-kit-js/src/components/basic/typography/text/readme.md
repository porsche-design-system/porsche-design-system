# Text



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                                                                                                                   | Type                                                                                                  | Default           |
| ---------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ----------------- |
| `align`    | `align`    | Text alignment of the component.                                                                                                                              | `"center" \| "left" \| "right"`                                                                       | `'left'`          |
| `color`    | `color`    | Basic text color variations.                                                                                                                                  | `"inherit" \| "porsche-black" \| "porsche-light" \| "porsche-red"`                                    | `'porsche-black'` |
| `ellipsis` | `ellipsis` | Adds an ellipsis to a single line of text if it overflows.                                                                                                    | `boolean`                                                                                             | `false`           |
| `size`     | `size`     | Size of the text. Also defines the size for specific breakpoints, like {base: "small", l: "medium"}. You always need to provide a base value when doing this. | `BreakpointValues<TextSize> \| string`                                                                | `'small'`         |
| `tag`      | `tag`      | Sets a custom HTML tag depending of the usage of the text component.                                                                                          | `"address" \| "blockquote" \| "cite" \| "div" \| "figcaption" \| "legend" \| "p" \| "span" \| "time"` | `'p'`             |
| `weight`   | `weight`   | The weight of the text.                                                                                                                                       | `"bold" \| "regular" \| "thin"`                                                                       | `'regular'`       |


## Dependencies

### Used by

 - [p-button-pure](../../../action/button-pure)
 - [p-text-link](../../../action/text-link)