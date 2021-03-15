# Banner



<!-- Auto Generated Below -->


## Properties

| Property     | Attribute    | Description                                                                       | Type                                | Default     |
| ------------ | ------------ | --------------------------------------------------------------------------------- | ----------------------------------- | ----------- |
| `persistent` | `persistent` | Defines if the banner can be closed/removed by the user.                          | `boolean`                           | `false`     |
| `state`      | `state`      | State of the banner.                                                              | `'error'` <br>\|` 'neutral'` <br>\|` 'warning'` | `'neutral'` |
| `theme`      | `theme`      | Adapts the banner color depending on the theme.                                   | `'dark'` <br>\|` 'light'`                 | `'light'`   |
| `width`      | `width`      | Defines the width of the banner corresponding to the `content-wrapper` dimensions | `'basic'` <br>\|` 'extended'` <br>\|` 'fluid'`  | `'basic'`   |


## Events

| Event     | Description                               | Type                |
| --------- | ----------------------------------------- | ------------------- |
| `dismiss` | Emitted when the close button is clicked. | `CustomEvent<void>` |
