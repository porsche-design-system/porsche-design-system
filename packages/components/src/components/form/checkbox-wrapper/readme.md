# Checkbox



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute    | Description                                                                      | Type                                                                                                                                  | Default  |
| ----------- | ------------ | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `hideLabel` | `hide-label` | Show or hide label. For better accessibility it's recommended to show the label. | `Partial<{ base: boolean; xs: boolean; s: boolean; m: boolean; l: boolean; xl: boolean; }> & { base: boolean; } | boolean` | `false`  |
| `label`     | `label`      | The label text.                                                                  | `string`                                                                                                                              | `''`     |
| `message`   | `message`    | The message styled depending on validation state.                                | `string`                                                                                                                              | `''`     |
| `state`     | `state`      | The validation state.                                                            | `"error" | "none" | "success"`                                                                                                      | `'none'` |