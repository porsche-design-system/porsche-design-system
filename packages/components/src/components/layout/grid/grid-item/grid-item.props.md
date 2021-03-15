# Grid Item



<!-- Auto Generated Below -->


## Properties

`type Offset = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11`
  `type Size = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12`  
`type BreakpointCustomizable<T> = { base: T; xs?: T; s?: T; m?: T; l?: T; xl?: T; }`

| Property | Attribute | Description                                                                                                                                                                                       | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Default |
| -------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| `offset` | `offset`  | The offset of the column. Can be between 0 and 11. Also defines the offset of the column for specific breakpoints, like {base: 6, l: 3}. You always need to provide a base value when doing this. | `0` <br>\|` 1` <br>\|` 2` <br>\|` 3` <br>\|` 4` <br>\|` 5` <br>\|` 6` <br>\|` 7` <br>\|` 8` <br>\|` 9` <br>\|` 10` <br>\|` 11` <br>\|` BreakpointCustomizable<Offset>`         | `0`     |
| `size`   | `size`    | The size of the column. Can be between 1 and 12. Also defines the size of the column for specific breakpoints, like {base: 6, l: 3}. You always need to provide a base value when doing this.     | `1` <br>\|` 2` <br>\|` 3` <br>\|` 4` <br>\|` 5` <br>\|` 6` <br>\|` 7` <br>\|` 8` <br>\|` 9` <br>\|` 10` <br>\|` 11` <br>\|` 12` <br>\|` BreakpointCustomizable<Size>` | `1`     |
