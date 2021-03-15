# Tabs Bar



<!-- Auto Generated Below -->


## Properties

`type Size = 'small' | 'medium'`    
`type BreakpointCustomizable<T> = { base: T; xs?: T; s?: T; m?: T; l?: T; xl?: T; }`

| Property              | Attribute               | Description                                                            | Type                                                                                                                                                                                                        | Default     |
| --------------------- | ----------------------- | ---------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `activeTabIndex`      | `active-tab-index`      | Defines which tab to be visualized as selected (zero-based numbering). | `number`                                                                                                                                                                                                    | `0`         |
| `gradientColorScheme` | `gradient-color-scheme` | Adapts the background gradient color of prev and next button.          | `'default'` <br> \| `'surface'`                                                                                                                                                                                    | `'default'` |
| `size`                | `size`                  | The text size.                                                         | `'small'` <br> \| `'medium'` <br> \| `BreakpointCustomizable<Size>` | `'small'`   |
| `theme`               | `theme`                 | Adapts the color when used on dark background.                         | `'dark'` <br> \| `'light'`                                                                                                                                                                                         | `'light'`   |
| `weight`              | `weight`                | The text weight.                                                       | `'regular'` <br> \| `'semibold'`                                                                                                                                                                                   | `'regular'` |


## Events

| Event       | Description                         | Type                                       |
| ----------- | ----------------------------------- | ------------------------------------------ |
| `tabChange` | Emitted when active tab is changed. | `CustomEvent<{ activeTabIndex: number; }>` |
