# Select



<!-- Auto Generated Below -->


## Properties

| Property            | Attribute            | Description                                                                       | Type                                                                                                                        | Default   |
| ------------------- | -------------------- | --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- | --------- |
| `description`       | `description`        | The description text.                                                             | `string`                                                                                                                    | `''`      |
| `dropdownDirection` | `dropdown-direction` | Changes the direction to which the dropdown list appears.                         | `"auto" | "down" | "up"`                                                                                                  | `'auto'`  |
| `filter`            | `filter`             | Filters select options by typing a character                                      | `boolean`                                                                                                                   | `false`   |
| `hideLabel`         | `hide-label`         | Show or hide label. For better accessibility it is recommended to show the label. | `Partial<{ base: boolean; xs: boolean; s: boolean; m: boolean; l: boolean; xl: boolean; }> & { base: boolean; } | boolean` | `false`   |
| `label`             | `label`              | The label text.                                                                   | `string`                                                                                                                    | `''`      |
| `message`           | `message`            | The message styled depending on validation state.                                 | `string`                                                                                                                    | `''`      |
| `native`            | `native`             | Forces rendering of native browser select dropdown                                | `boolean`                                                                                                                   | `false`   |
| `state`             | `state`              | The validation state.                                                             | `"error" | "none" | "success"`                                                                                            | `'none'`  |
| `theme`             | `theme`              | Adapts the select color depending on the theme.                                   | `"dark" | "light"`                                                                                                         | `'light'` |