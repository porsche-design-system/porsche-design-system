# Text Field



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description                                                                                            | Type                                                                                                                                  | Default  |
| ------------- | ------------- | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `description` | `description` | The description text.                                                                                  | `string`                                                                                                                              | `''`     |
| `hideLabel`   | `hide-label`  | Show or hide label and description text. For better accessibility it is recommended to show the label. | `Partial<{ base: boolean; xs: boolean; s: boolean; m: boolean; l: boolean; xl: boolean; }> & { base: boolean; } | boolean` | `false`  |
| `label`       | `label`       | The label text.                                                                                        | `string`                                                                                                                              | `''`     |
| `message`     | `message`     | The message styled depending on validation state.                                                      | `string`                                                                                                                              | `''`     |
| `state`       | `state`       | The validation state.                                                                                  | `"error" | "none" | "success"`                                                                                                      | `'none'` |