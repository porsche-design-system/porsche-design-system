# Grid (/#/components/parent)



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute   | Description                                                                                                                                                                                                                                                                                        | Type                                                                                                                                          | Default    |
| ----------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `direction` | `direction` | Defines the direction of the main and cross axis. The default "row" defines the main axis as horizontal left to right. Also defines the direction for specific breakpoints, like {"base": "column", "l": "row"}. You always need to provide a base value when doing this.                          | `"column" \| "column-reverse" \| "row" \| "row-reverse" \| BreakpointValues<"row" \| "row-reverse" \| "column" \| "column-reverse"> & string` | `"row"`    |
| `gap`       | `gap`       | Defines the gap between contained children. The value "normal" (/#/components/default) sets responsive grid spacings that should be used together with Grid.Child. Also defines the gap for specific breakpoints, like {"base": "zero", "l": "normal"}. You always need to provide a base value when doing this. | `"normal" \| "zero" \| BreakpointValues<"normal" \| "zero"> & string`                                                                         | `"normal"` |