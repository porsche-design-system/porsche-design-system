# Text Link



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                                                                    | Type                                                                                                                                                                                                                                                                                                                                              | Default              |
| ---------- | ---------- | -------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| `color`    | `color`    | Basic text color variations.                                                                                   | `"inherit" \| "porsche-black" \| "porsche-light"`                                                                                                                                                                                                                                                                                                 | `'porsche-black'`    |
| `download` | `download` | Special download attribute to open native browser download dialog if target url points to a downloadable file. | `boolean`                                                                                                                                                                                                                                                                                                                                         | `false`              |
| `href`     | `href`     | Target url to where the component should link to.                                                              | `string`                                                                                                                                                                                                                                                                                                                                          | `'#'`                |
| `icon`     | `icon`     | The icon shown next to the label.                                                                              | `string`                                                                                                                                                                                                                                                                                                                                          | `'arrow-right-hair'` |
| `rel`      | `rel`      | Specifies the relationship of the target object to the link object.                                            | `string`                                                                                                                                                                                                                                                                                                                                          | `''`                 |
| `tag`      | `tag`      | Set a custom HTML tag depending of the usage of the component.                                                 | `"a" \| "span"`                                                                                                                                                                                                                                                                                                                                   | `'a'`                |
| `target`   | `target`   | Target attribute where the link should be opened.                                                              | `"blank" \| "parent" \| "self" \| "top"`                                                                                                                                                                                                                                                                                                          | `'self'`             |
| `variant`  | `variant`  | The style of the text.                                                                                         | `"copy" \| "small" \| "12" \| "16" \| "18" \| "20" \| "20-thin" \| "24" \| "24-thin" \| "28" \| "28-thin" \| "30" \| "30-thin" \| "32" \| "32-thin" \| "36" \| "36-thin" \| "42" \| "42-thin" \| "44" \| "44-thin" \| "48" \| "48-thin" \| "52" \| "52-thin" \| "60" \| "60-thin" \| "62" \| "62-thin" \| "72" \| "72-thin" \| "84" \| "84-thin"` | `'copy'`             |


## Events

| Event    | Description                       | Type                |
| -------- | --------------------------------- | ------------------- |
| `pClick` | Emitted when the link is clicked. | `CustomEvent<void>` |


## Dependencies

### Depends on

- [p-icon](../../icon/icon)
- [p-text](../../basic/typography/text)