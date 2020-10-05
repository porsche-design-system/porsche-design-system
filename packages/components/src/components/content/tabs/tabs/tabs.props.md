# Tabs



<!-- Auto Generated Below -->


## Properties

| Property              | Attribute               | Description                                                   | Type                      | Default     |
| --------------------- | ----------------------- | ------------------------------------------------------------- | ------------------------- | ----------- |
| `gradientColorScheme` | `gradient-color-scheme` | Adapts the background gradient color of prev and next button. | `"default" \| "surface"`  | `'default'` |
| `size`                | `size`                  | The text size.                                                | `"medium" \| "small"`     | `'small'`   |
| `theme`               | `theme`                 | Adapts color when used on dark background.                    | `"dark" \| "light"`       | `'light'`   |
| `weight`              | `weight`                | The text weight.                                              | `"regular" \| "semibold"` | `'regular'` |


## Events

| Event       | Description                          | Type                                       |
| ----------- | ------------------------------------ | ------------------------------------------ |
| `tabChange` | Emitted when active tab is changing. | `CustomEvent<{ activeTabIndex: number; }>` |