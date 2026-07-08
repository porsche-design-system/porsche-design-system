# p-fieldset

The `p-fieldset` is a grouping component for wrapping contextual associated form elements. Its visible part is an HTML *legend* element, which can be seen like a headline for describing the meaning of a form block. You can see some usage examples on our [form patterns section](https://designsystem.porsche.com/patterns/forms/resources/).

## Usage

The following section provides guidance for designers and developers on how to use this component in different situations.

### Do:

- Use to group related fields together to make them more organized and easier to understand for users.
- Use descriptive and clear labels for the field sets to help users quickly understand what information is being requested.
- Use for grouping several form controls as well as labels within a form.
- Use it for grouping several checkboxes.
- Use it for creating a date picker.
- Use consistent formatting and styling for field sets to maintain visual consistency and improve the overall user experience.
- Use field sets to control the visibility of groups of fields that are not always necessary, such as advanced options or additional information.
- Test your field sets with users to ensure they are effective in improving the usability of your forms or page layouts.

### Don't:

- Don't use too many field sets on a single form or page layout.
- Don't use to hide important information or fields that users need to complete a form.
- Don't rely solely on field sets to improve the usability of your forms or page layouts.

---

## Behavior

### Sections including form elements

[Form pattern guideline](https://designsystem.porsche.com/patterns/forms).

## Accessibility support

### ARIA enhancements

### ARIA enhancements

#### External **ARIA** provided by the `aria` property:

| ARIA | Usage |
| --- | --- |
| `role="radiogroup"` | Changes the default role of `group` to `radiogroup` |

#### Internal **ARIA** that is managed by the component:

| ARIA | Usage |
| --- | --- |
| `role="alert"` | When content is populated or changed in `state="error"`, the component announces it immediately. |
| `aria-required="true"` | Indicates if all children of the fieldset group are required. |
| `aria-invalid="true"` | If `error` state is set. |
| `aria-describedby="IDREF"` | References the accessible description when `state` message is provided. |

## Tests

### Automated

| Technology | Support |
| --- | --- |
| AXE-Core (WCAG 2.2 AA, Best-Practice) | ✅ |
| High-Contrast Mode (light/dark) | ✅ |
| Text-Zoom (200%) | ✅ |

### Manual

| Technology | Support |
| --- | --- |
| Screen reader (VoiceOver, NVDA) | ✅ |

## API

Authoritative API data: `@porsche-design-system/components-js/meta` (`component-meta`). When these tables disagree with it, follow `component-meta`.

### Properties

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `aria` | `'radiogroup'` | `undefined` | Overrides the ARIA role on the fieldset — use `radiogroup` when grouping radio buttons. |
| `label` | `string` | `''` | Sets the visible legend text displayed above the grouped form controls. |
| `labelSize` | `'small'` `'medium'` | `'medium'` | Sets the font size of the fieldset label (`small`, `medium`, or `large`). |
| `message` | `string` | `''` | Sets the validation feedback message displayed below the fieldset when `state` is `success` or `error`. |
| `required` | `boolean` | `false` | Marks all controls within the fieldset as required and adds a required indicator to the label. |
| `state` | `'none'` `'error'` `'success'` | `'none'` | Sets the validation state of the fieldset, controlling the color and style of the feedback message. |

### Slots

| Slot | Required | Allowed tag names | Description |
| --- | --- | --- | --- |
| `label` | no | — | Shows a label. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed. |
| _(default)_ | no | — | Default slot for the main content. |
| `message` | no | — | Shows a state message. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed. |

## Examples

| Example | When to use | File |
| --- | --- | --- |
| Default | Minimal default configuration. | [./examples/Default.vue](./examples/Default.vue) |
| Slotted label | Slotted label | [./examples/SlottedLabel.vue](./examples/SlottedLabel.vue) |
| Slotted message | Slotted message | [./examples/SlottedMessage.vue](./examples/SlottedMessage.vue) |
| Required | Setting `required="true"` on `p-fieldset` only renders the asterisk on the legend and sets `aria-required` on the underlying `<fieldset>` element. | [./examples/Required.vue](./examples/Required.vue) |
