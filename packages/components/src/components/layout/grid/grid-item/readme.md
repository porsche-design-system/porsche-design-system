# Grid Item



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description                                                                                                                                                                                       | Type                                                                                                                          | Default |
| -------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ------- |
| `offset` | `offset`  | The offset of the column. Can be between 0 and 11. Also defines the offset of the column for specific breakpoints, like {base: 6, l: 3}. You always need to provide a base value when doing this. | `Partial<{ base: number; xs: number; s: number; m: number; l: number; xl: number; }> & { base: number; } \| number \| string` | `0`     |
| `size`   | `size`    | The size of the column. Can be between 1 and 12. Also defines the size of the column for specific breakpoints, like {base: 6, l: 3}. You always need to provide a base value when doing this.     | `Partial<{ base: number; xs: number; s: number; m: number; l: number; xl: number; }> & { base: number; } \| number \| string` | `1`     |