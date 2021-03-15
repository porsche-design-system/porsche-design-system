# Textarea



<!-- Auto Generated Below -->


## Properties

`type HideLabel = boolean`    
`type BreakpointCustomizable<T> = { base: T; xs?: T; s?: T; m?: T; l?: T; xl?: T; }`

| Property      | Attribute     | Description                                                                       | Type                                                                                                                               | Default  |
| ------------- | ------------- | --------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `description` | `description` | The description text.                                                             | `string`                                                                                                                           | `''`     |
| `hideLabel`   | `hide-label`  | Show or hide label. For better accessibility it is recommended to show the label. | `boolean` <br> \| `BreakpointCustomizable<HideLabel>` | `false`  |
| `label`       | `label`       | The label text.                                                                   | `string`                                                                                                                           | `''`     |
| `message`     | `message`     | The message styled depending on validation state.                                 | `string`                                                                                                                           | `''`     |
| `state`       | `state`       | The validation state.                                                             | `'error'` <br> \| `'none'` <br> \| `'success'`                                                                                                   | `'none'` |
