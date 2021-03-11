# Tabs



<!-- Auto Generated Below -->


## Properties

| Property              | Attribute               | Description                                                            | Type                                                                                                                                                                                                        | Default     |
| --------------------- | ----------------------- | ---------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `activeTabIndex`      | `active-tab-index`      | Defines which tab to be visualized as selected (zero-based numbering). | `number`                                                                                                                                                                                                    | `0`         |
| `gradientColorScheme` | `gradient-color-scheme` | Adapts the background gradient color of prev and next button.          | `"default" \| "surface"`                                                                                                                                                                                    | `'default'` |
| `size`                | `size`                  | The text size.                                                         | `string \| { base?: "small" \| "medium"; xs?: "small" \| "medium"; s?: "small" \| "medium"; m?: "small" \| "medium"; l?: "small" \| "medium"; xl?: "small" \| "medium"; } & { base: "small" \| "medium"; }` | `'small'`   |
| `theme`               | `theme`                 | Adapts the color when used on dark background.                         | `"dark" \| "light"`                                                                                                                                                                                         | `'light'`   |
| `weight`              | `weight`                | The text weight.                                                       | `"regular" \| "semibold"`                                                                                                                                                                                   | `'regular'` |


## Events

| Event       | Description                         | Type                                       |
| ----------- | ----------------------------------- | ------------------------------------------ |
| `tabChange` | Emitted when active tab is changed. | `CustomEvent<{ activeTabIndex: number; }>` |