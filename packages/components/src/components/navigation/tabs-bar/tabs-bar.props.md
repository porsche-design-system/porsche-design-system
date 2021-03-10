# Tabs Bar



<!-- Auto Generated Below -->


## Properties

| Property              | Attribute               | Description                                                                                                  | Type                                                                                                                       | Default     |
| --------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `activeTabIndex`      | `active-tab-index`      | Defines which tab to be visualized as selected (zero-based numbering), undefined if none should be selected. | `number`                                                                                                                   | `undefined` |
| `gradientColorScheme` | `gradient-color-scheme` | Adapts the background gradient color of prev and next button.                                                | `"default" \| "surface"`                                                                                                   | `'default'` |
| `size`                | `size`                  | The text size.                                                                                               | `Partial<{ base: TabSize; xs: TabSize; s: TabSize; m: TabSize; l: TabSize; xl: TabSize; }> & { base: TabSize; } \| string` | `'small'`   |
| `theme`               | `theme`                 | Adapts the color when used on dark background.                                                               | `"dark" \| "light"`                                                                                                        | `'light'`   |
| `weight`              | `weight`                | The text weight.                                                                                             | `"regular" \| "semibold"`                                                                                                  | `'regular'` |


## Events

| Event       | Description                         | Type                                       |
| ----------- | ----------------------------------- | ------------------------------------------ |
| `tabChange` | Emitted when active tab is changed. | `CustomEvent<{ activeTabIndex: number; }>` |