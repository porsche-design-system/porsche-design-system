# Text



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                                                                                                                    | Type                                                                                                  | Default           |
| ---------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ----------------- |
| `align`    | `align`    | Text alignment of the component.                                                                                                                               | `"center" \| "left" \| "right"`                                                                       | `'left'`          |
| `color`    | `color`    | Basic text color variations.                                                                                                                                   | `"inherit" \| "porsche-black" \| "porsche-light" \| "porsche-red"`                                    | `'porsche-black'` |
| `ellipsis` | `ellipsis` | Adds an ellipsis to a single line of text if it overflows.                                                                                                     | `boolean`                                                                                             | `false`           |
| `tag`      | `tag`      | Sets a custom HTML tag depending of the usage of the text component.                                                                                           | `"address" \| "blockquote" \| "cite" \| "div" \| "figcaption" \| "legend" \| "p" \| "span" \| "time"` | `'p'`             |
| `thin`     | `thin`     | Thin weight of the text.                                                                                                                                       | `boolean`                                                                                             | `false`           |
| `variant`  | `variant`  | Style of the text. Also defines the style for specific breakpoints, like {base: "copy", l: "medium"}. You always need to provide a base value when doing this. | `BreakpointValues<TextVariant> \| string`                                                             | `'copy'`          |


## Dependencies

### Used by

 - [p-button-regular](#/web/components/action/button-regular)
 - [p-text-link](#/web/components/action/text-link)