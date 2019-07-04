# p-pagination



<!-- Auto Generated Below -->


## Properties

| Property          | Attribute           | Description                                                     | Type                | Default           |
| ----------------- | ------------------- | --------------------------------------------------------------- | ------------------- | ----------------- |
| `activePage`      | `active-page`       | Index of the currently active page.                             | `number`            | `1`               |
| `itemsPerPage`    | `items-per-page`    | The total count of items which should be shown per page.        | `number`            | `undefined`       |
| `label`           | `label`             | Aria label what the pagination is used for.                     | `string`            | `'Pagination'`    |
| `labelNext`       | `label-next`        | Aria label for next page icon.                                  | `string`            | `'Next page'`     |
| `labelPage`       | `label-page`        | Aria label for page navigation.                                 | `string`            | `'Page'`          |
| `labelPrev`       | `label-prev`        | Aria label for previous page icon.                              | `string`            | `'Previous page'` |
| `pageRange`       | `page-range`        | The number of pages between ellipsis. 0 = mobile \| 1 = desktop | `0 \| 1`            | `1`               |
| `theme`           | `theme`             | Adapts the color when used on dark background.                  | `"dark" \| "light"` | `'light'`         |
| `totalItemsCount` | `total-items-count` | The total count of items.                                       | `number`            | `undefined`       |


## Events

| Event    | Description                       | Type               |
| -------- | --------------------------------- | ------------------ |
| `pClick` | Emitted when the link is clicked. | `CustomEvent<any>` |


## Dependencies

### Depends on

- [p-icon](#/components/icon/icon)