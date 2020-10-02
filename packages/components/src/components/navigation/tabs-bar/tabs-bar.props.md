# Tabs Nav



<!-- Auto Generated Below -->


## Properties

| Property              | Attribute               | Description                                                   | Type                                                                                                                                                                      | Default     |
| --------------------- | ----------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `activeTabIndex`      | `active-tab-index`      | Defines which tab to be visualized as selected.               | `number`                                                                                                                                                                  | `0`         |
| `gradientColorScheme` | `gradient-color-scheme` | Adapts the background gradient color of prev and next button. | `"default" \| "surface"`                                                                                                                                                  | `'default'` |
| `size`                | `size`                  | The text size.                                                | `string \| { base: "small" \| "medium"; xs?: "small" \| "medium"; s?: "small" \| "medium"; m?: "small" \| "medium"; l?: "small" \| "medium"; xl?: "small" \| "medium"; }` | `'small'`   |
| `theme`               | `theme`                 | Adapts color when used on dark background.                    | `"dark" \| "light"`                                                                                                                                                       | `'light'`   |
| `weight`              | `weight`                | The text weight.                                              | `"regular" \| "semibold"`                                                                                                                                                 | `'regular'` |


## Events

| Event      | Description                    | Type               |
| ---------- | ------------------------------ | ------------------ |
| `tabClick` | Emitted when a tab is clicked. | `CustomEvent<any>` |