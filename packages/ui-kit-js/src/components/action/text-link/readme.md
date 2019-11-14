# Text Link



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                                                                    | Type                                                                                  | Default              |
| ---------- | ---------- | -------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | -------------------- |
| `color`    | `color`    | Basic text color variations.                                                                                   | `"inherit" \| "porsche-black" \| "porsche-light" \| "porsche-red"`                    | `'porsche-black'`    |
| `download` | `download` | Special download attribute to open native browser download dialog if target url points to a downloadable file. | `string`                                                                              | `undefined`          |
| `href`     | `href`     | Target url to where the component should link to.                                                              | `string`                                                                              | `'#'`                |
| `icon`     | `icon`     | The icon shown next to the label.                                                                              | `string`                                                                              | `'arrow-right-hair'` |
| `rel`      | `rel`      | Specifies the relationship of the target object to the link object.                                            | `string`                                                                              | `undefined`          |
| `tag`      | `tag`      | Set a custom HTML tag depending of the usage of the component.                                                 | `"a" \| "span"`                                                                       | `'a'`                |
| `target`   | `target`   | Target attribute where the link should be opened.                                                              | `"blank" \| "parent" \| "self" \| "top"`                                              | `'self'`             |
| `variant`  | `variant`  | The style of the text.                                                                                         | `"inherit" \| "large" \| "medium" \| "small" \| "x-large" \| "x-small" \| "xx-large"` | `'small'`            |


## Events

| Event    | Description                       | Type                |
| -------- | --------------------------------- | ------------------- |
| `pClick` | Emitted when the link is clicked. | `CustomEvent<void>` |


## Dependencies

### Depends on

- [p-icon](../../icon/icon)
- [p-text](../../basic/typography/text)