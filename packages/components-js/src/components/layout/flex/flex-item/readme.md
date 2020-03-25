# Flex Item



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute    | Description                                                                                                                                                                      | Type                                                                                                                         | Default     |
| ----------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `alignSelf` | `align-self` | Defines how this flex item is aligned along the cross axis. This overwrites the cross axis alignment set by the container. Corresponds to the "alignSelf" css property.          | `BreakpointValues<"center" or "flex-start" or "flex-end" or "stretch" or "baseline" or "auto"> or string`                    | `'auto'`    |
| `flex`      | `flex`       | The shorthand property for the combined definition of "shrink", "grow" and "basis"                                                                                               | `BreakpointValues<"none" or "auto" or "initial" or "equal"> or string`                                                       | `'initial'` |
| `grow`      | `grow`       | The ability to allow/disallow the flex child to grow.                                                                                                                            | `0 or 1 or BreakpointValues<0 or 1> or string`                                                                               | `0`         |
| `offset`    | `offset`     | The offset of the column. You can also supply values for specific breakpoints, like {base: "none", l: "one-quarter"}. You always need to provide a base value when doing this.   | `BreakpointValues<"none" or "one-quarter" or "one-third" or "half" or "two-thirds" or "three-quarters"> or string`           | `'none'`    |
| `shrink`    | `shrink`     | The ability to allow/disallow the flex child to shrink.                                                                                                                          | `0 or 1 or BreakpointValues<0 or 1> or string`                                                                               | `1`         |
| `width`     | `width`      | The width of the flex item. You can also supply values for specific breakpoints, like {base: "full", l: "one-quarter"}. You always need to provide a base value when doing this. | `BreakpointValues<"auto" or "one-quarter" or "one-third" or "half" or "two-thirds" or "three-quarters" or "full"> or string` | `'auto'`    |