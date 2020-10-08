# Modal



<!-- Auto Generated Below -->


## Properties

| Property               | Attribute                | Description                                                   | Type      | Default     |
| ---------------------- | ------------------------ | ------------------------------------------------------------- | --------- | ----------- |
| `disableBackdropClick` | `disable-backdrop-click` | If true, the modal will not be closable via backdrop click. * | `boolean` | `false`     |
| `disableCloseButton`   | `disable-close-button`   | If true, the modal will not have a close button. *            | `boolean` | `false`     |
| `disableEscapeKey`     | `disable-escape-key`     | If true, the modal will not be closable via Escape key. *     | `boolean` | `false`     |
| `open`                 | `open`                   | If true, the modal is open. *                                 | `boolean` | `false`     |
| `subject`              | `subject`                | The title of the modal *                                      | `string`  | `undefined` |


## Events

| Event   | Description                                         | Type                |
| ------- | --------------------------------------------------- | ------------------- |
| `close` | Emitted when the component requests to be closed. * | `CustomEvent<void>` |