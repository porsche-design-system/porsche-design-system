# Flex



<!-- Auto Generated Below -->


## Properties

| Property         | Attribute         | Description                                                                                                                                                               | Type                                                                                                                                     | Default        |
| ---------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `alignContent`   | `align-content`   | This aligns a flex container's individual lines when there is extra space in the cross-axis, similar to how "justifyContent" aligns individual items along the main axis. | `BreakpointValues<"center" \| "flex-start" \| "flex-end" \| "space-between" \| "space-around" \| "space-evenly" \| "stretch"> \| string` | `'stretch'`    |
| `alignItems`     | `align-items`     | Defines how the flex items are aligned along the cross axis.                                                                                                              | `BreakpointValues<"center" \| "flex-start" \| "flex-end" \| "stretch" \| "baseline"> \| string`                                          | `'stretch'`    |
| `direction`      | `direction`       | Defines the direction of the main and cross axis. The default "row" defines the main axis as horizontal left to right.                                                    | `BreakpointValues<"row" \| "row-reverse" \| "column" \| "column-reverse"> \| string`                                                     | `'row'`        |
| `inline`         | `inline`          | Defines the flex containers content flow if 2 or more containers are siblings of each other.                                                                              | `BreakpointValues<boolean> \| boolean \| string`                                                                                         | `false`        |
| `justifyContent` | `justify-content` | Defines how the flex items are aligned along the main axis.                                                                                                               | `BreakpointValues<"center" \| "flex-start" \| "flex-end" \| "space-between" \| "space-around" \| "space-evenly"> \| string`              | `'flex-start'` |
| `wrap`           | `wrap`            | If set, overflowing elements will wrap to a new line.                                                                                                                     | `BreakpointValues<"nowrap" \| "wrap" \| "wrap-reverse"> \| string`                                                                       | `'nowrap'`     |