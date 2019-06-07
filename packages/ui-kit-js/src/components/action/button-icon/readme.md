# Button Icon



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                                                                   | Type                                    | Default     |
| ---------- | ---------- | ------------------------------------------------------------------------------------------------------------- | --------------------------------------- | ----------- |
| `disabled` | `disabled` | Disables the button. No events will be triggered while disabled state is active.                              | `boolean`                               | `false`     |
| `href`     | `href`     | When providing an url then the component will be rendered as `<a>` instead of `<button>` tag.                 | `string`                                | `undefined` |
| `icon`     | `icon`     | The icon shown.                                                                                               | `string`                                | `"plus"`    |
| `loading`  | `loading`  | Disables the button and shows a loading indicator. No events will be triggered while loading state is active. | `boolean`                               | `false`     |
| `theme`    | `theme`    | Adapts the button color when used on dark background.                                                         | `"dark" \| "light"`                     | `"light"`   |
| `type`     | `type`     | Specifies the type of the button when no href prop is defined.                                                | `"button" \| "reset" \| "submit"`       | `"button"`  |
| `variant`  | `variant`  | The style variant of the button.                                                                              | `"default" \| "ghost" \| "transparent"` | `"default"` |


## Events

| Event    | Description                          | Type                |
| -------- | ------------------------------------ | ------------------- |
| `pBlur`  | Emitted when the button loses focus. | `CustomEvent<void>` |
| `pClick` | Emitted when the button is clicked.  | `CustomEvent<void>` |
| `pFocus` | Emitted when the button has focus.   | `CustomEvent<void>` |


## Dependencies

### Depends on

- [p-loader](../../feedback/loader)
- [p-icon](../../icon/icon)