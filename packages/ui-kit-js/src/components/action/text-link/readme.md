# Text Link



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                                                                    | Type                                                                                                                                                                                                            | Default              |
| ---------- | ---------- | -------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| `download` | `download` | Special download attribute to open native Browser download dialog if target url points to a downloadable file. | `boolean`                                                                                                                                                                                                       | `false`              |
| `href`     | `href`     | Target url to where the component should link to.                                                              | `string`                                                                                                                                                                                                        | `"#"`                |
| `icon`     | `icon`     | The icon shown next to the label.                                                                              | `string`                                                                                                                                                                                                        | `"arrow-right-hair"` |
| `target`   | `target`   | Target attribute where the link should be opened.                                                              | `"blank" \| "parent" \| "self" \| "top"`                                                                                                                                                                        | `"self"`             |
| `theme`    | `theme`    | Adapts the color when used on dark background.                                                                 | `"dark" \| "light"`                                                                                                                                                                                             | `"light"`            |
| `type`     | `type`     | The style of the text.                                                                                         | `"small" \| "copy" \| "12" \| "16" \| "18" \| "20" \| "24" \| "28" \| "30" \| "32" \| "36" \| "42" \| "44" \| "48" \| "52" \| "60" \| "60-thin" \| "62" \| "62-thin" \| "72" \| "72-thin" \| "84" \| "84-thin"` | `"copy"`             |


## Events

| Event    | Description                       | Type                |
| -------- | --------------------------------- | ------------------- |
| `pClick` | Emitted when the link is clicked. | `CustomEvent<void>` |


## Dependencies

### Depends on

- [p-icon](../../icon/icon)
- [p-text](../../basic/typography/text)