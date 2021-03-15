# Grid



<!-- Auto Generated Below -->


## Properties

`type Direction = 'row' | 'row-reverse' | 'column' | 'column-reverse'`    
`type BreakpointCustomizable<T> = { base: T; xs?: T; s?: T; m?: T; l?: T; xl?: T; }`

| Property    | Attribute   | Description                                                                                                                                                                                                                                                           | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Default |
| ----------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `direction` | `direction` | Defines the direction of the main and cross axis. The default 'row' defines the main axis as horizontal left to right. Also defines the direction for specific breakpoints, like {base: 'column', l: 'row'}. You always need to provide a base value when doing this. | `'row'` <br> \| `'row-reverse'` <br> \| `'column'` <br> \| `'column-reverse'` <br> \| `BreakpointCustomizable<Direction>` | `'row'` |
