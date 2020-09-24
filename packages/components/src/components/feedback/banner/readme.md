# Banner



<!-- Auto Generated Below -->


## Properties

| Property     | Attribute    | Description                                              | Type                                | Default     |
| ------------ | ------------ | -------------------------------------------------------- | ----------------------------------- | ----------- |
| `persistent` | `persistent` | Defines if the banner can be closed/removed by the user. | `boolean`                           | `false`     |
| `position`   | `position`   | Position of the banner.                                  | `"inline" \| "overlay"`             | `'overlay'` |
| `state`      | `state`      | State of the banner.                                     | `"error" \| "neutral" \| "warning"` | `'neutral'` |
| `theme`      | `theme`      | Adapts the banner color depending on the theme.          | `"dark" \| "light"`                 | `'light'`   |


## Events

| Event          | Description                               | Type               |
| -------------- | ----------------------------------------- | ------------------ |
| `closeOnClick` | Emitted when the close button is clicked. | `CustomEvent<any>` |