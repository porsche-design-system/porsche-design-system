# Grid (parent)



<!-- Auto Generated Below -->


## Properties

| Property              | Attribute              | Description                                                                                                                                                              | Type                                                     | Default     |
| --------------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------- | ----------- |
| `direction`           | `direction`            | Defines the direction of the main and cross axis. The default "row" (default) defines the main axis as horizontal left to right.                                         | `"column" \| "column-reverse" \| "row" \| "row-reverse"` | `"row"`     |
| `directionResponsive` | `direction-responsive` | Defines the direction of the main and cross axis for specific breakpoints, like {"base": "column", "l": "row"}. You always need to provide a base value when doing this. | `any`                                                    | `undefined` |
| `gap`                 | `gap`                  | Defines the gap between contained children. The value "normal" (default) sets responsive grid spacings that should be used together with Grid.Child.                     | `"normal" \| "zero"`                                     | `"normal"`  |
| `gapResponsive`       | `gap-responsive`       | The gap for specific breakpoints, like {"base": "zero", "l": "normal"}. You always need to provide a base value when doing this.                                         | `any`                                                    | `undefined` |