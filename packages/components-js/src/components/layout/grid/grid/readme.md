# Grid



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute   | Description                                                                                                                                                                                                                                                           | Type                                                                                 | Default |
| ----------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ | ------- |
| `direction` | `direction` | Defines the direction of the main and cross axis. The default "row" defines the main axis as horizontal left to right. Also defines the direction for specific breakpoints, like {base: "column", l: "row"}. You always need to provide a base value when doing this. | `BreakpointValues<"row" \| "row-reverse" \| "column" \| "column-reverse"> \| string` | `'row'` |
| `safeZone`  | `safe-zone` | Defines whether the outer grid margin should be applied which centers the grid and applies `overflow-x: hidden;` to prevent horizontal scrolling. Defaults to `false`.                                                                                                | `boolean`                                                                            | `false` |