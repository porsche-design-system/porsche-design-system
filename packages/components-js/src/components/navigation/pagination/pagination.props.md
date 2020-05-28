# Pagination



<!-- Auto Generated Below -->


## Properties

| Property               | Attribute                  | Description                                              | Type                                                      | Default              |
| ---------------------- | -------------------------- | -------------------------------------------------------- | --------------------------------------------------------- | -------------------- |
| `activePage`           | `active-page`              | Index of the currently active page.                      | `number`                                                  | `1`                  |
| `allyLabel`            | `ally-label`               | Aria label what the pagination is used for.              | `string`                                                  | `'Pagination'`       |
| `allyLabelNext`        | `ally-label-next`          | Aria label for next page icon.                           | `string`                                                  | `'Next page'`        |
| `allyLabelPage`        | `ally-label-page`          | Aria label for page navigation.                          | `string`                                                  | `'Page'`             |
| `allyLabelPrev`        | `ally-label-prev`          | Aria label for previous page icon.                       | `string`                                                  | `'Previous page'`    |
| `itemsPerPage`         | `items-per-page`           | The total count of items which should be shown per page. | `number`                                                  | `1`                  |
| `maxNumberOfPageLinks` | `max-number-of-page-links` | The maximum number of page links rendered                | `5 \| 7 \| BreakpointValues<NumberOfPageLinks> \| string` | `{ base: 5, xs: 7 }` |
| `theme`                | `theme`                    | Adapts the color when used on dark background.           | `"dark" \| "light"`                                       | `'light'`            |
| `totalItemsCount`      | `total-items-count`        | The total count of items.                                | `number`                                                  | `1`                  |


## Events

| Event        | Description                    | Type               |
| ------------ | ------------------------------ | ------------------ |
| `pageChange` | Emitted when the page changes. | `CustomEvent<any>` |