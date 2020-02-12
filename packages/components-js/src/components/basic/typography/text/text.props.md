# Text



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                                                                                                                   | Type                                                                                                                                                                                              | Default     |
| ---------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `align`    | `align`    | Text alignment of the component.                                                                                                                              | `"center" \| "left" \| "right"`                                                                                                                                                                   | `'left'`    |
| `color`    | `color`    | Basic text color variations depending on theme property.                                                                                                      | `"brand" \| "default" \| "inherit" \| "neutral-contrast-high" \| "neutral-contrast-low" \| "neutral-contrast-medium" \| "notification-error" \| "notification-success" \| "notification-warning"` | `'default'` |
| `ellipsis` | `ellipsis` | Adds an ellipsis to a single line of text if it overflows.                                                                                                    | `boolean`                                                                                                                                                                                         | `false`     |
| `size`     | `size`     | Size of the text. Also defines the size for specific breakpoints, like {base: "small", l: "medium"}. You always need to provide a base value when doing this. | `BreakpointValues<TextSize> \| string`                                                                                                                                                            | `'small'`   |
| `tag`      | `tag`      | Sets a custom HTML tag depending of the usage of the text component.                                                                                          | `"address" \| "blockquote" \| "cite" \| "div" \| "figcaption" \| "legend" \| "p" \| "span" \| "time"`                                                                                             | `'p'`       |
| `theme`    | `theme`    | Adapts the text color depending on the theme. Has no effect when "inherit" is set as color prop.                                                              | `"dark" \| "light"`                                                                                                                                                                               | `'light'`   |
| `weight`   | `weight`   | The weight of the text.                                                                                                                                       | `"bold" \| "regular" \| "thin"`                                                                                                                                                                   | `'regular'` |


## Dependencies

### Used by

 - [p-button](#/web/components/action/button)
 - [p-button-pure](#/web/components/action/button-pure)
 - [p-link](#/web/components/navigation/link)
 - [p-link-pure](#/web/components/navigation/link-pure)
 - [p-textarea-wrapper](#/web/components/form/textarea-wrapper)