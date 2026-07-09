# p-button

The `p-button` component is essential for performing form or **interaction** events. For an optimal user guidance and dedicated pursuit of business or sales goals, different types of Buttons (**Primary** and **Secondary**) are available for usage. A Button can be used with or without a label but it's recommended to keep the **label visible** for better **usability** whenever possible. When used without a label, it is mandatory for **accessibility** to provide a descriptive label text for screen readers. Whenever you want to provide navigational elements, stick to the [Link](../p-link/p-link.md) component instead.

You can use native `click`, `focus`, `focusin`, `blur` and `focusout` events on the `p-button`.

## Usage

The following section provides guidance for designers and developers on how to use this component in different situations.

### Do:

- Use buttons for actions that have clear consequences, such as submitting a form or initiating a purchase.
- Use buttons to indicate the next step in a process, such as "Continue" or "Next".
- Use buttons with clear and concise labels that accurately describe the action they perform.
- Use the primary button for the most important or desired action, and use the secondary button for less important or secondary actions.
- Use icons in buttons to enhance their meaning, but ensure the icon is relevant and easily recognizable.
- Use disabled buttons to indicate actions that are currently unavailable or incomplete, and provide context for why the button is disabled.

### Don't:

- Don't use buttons for non-actionable elements, such as decorative graphics or text.
- Don't use ambiguous or unclear labels for buttons, as it can lead to confusion for users.
- Don't use too many buttons on a page or in a single section, as it can overwhelm users and reduce usability.
- Don't use primary and secondary buttons interchangeably, as it can confuse users and reduce the clarity of your interface.
- Don't use disabled buttons without providing context for why the button is disabled. This can lead to confusion and frustration for users.

---

## Related components

- [Links](../p-link/p-link.md)

## Accessibility support

### Keyboard

| Key / state | Function |
| --- | --- |
| `Tab`, `Shift-Tab` | Moves focus to the next (or previous) focusable element. |
| `Enter`, `Space` | Activates the button. |
| `disabled` | Button still focusable. |

### ARIA enhancements

#### External **ARIA** provided by the `aria` property:

| ARIA | Usage |
| --- | --- |
| `aria-label` | Defines a string value that labels the interactive element. |
| `aria-description` | Defines a string value that adds a more detailed description of the interactive element. |
| `aria-expanded` | Exposes a visual state (e.g. expanded/collapsed) of another element. |
| `aria-pressed` | Exposes the `pressed` state of a toggle button. |
| `aria-haspopup` | Defines that the button opens a popup (e.g. `dialog`). It can be used in combination with `aria-expanded` to indicate the state of the popup. |

#### Internal **ARIA** that is managed by the component:

| ARIA | Usage |
| --- | --- |
| `aria-disabled="true"` | When `disabled` prop is set, this ARIA attribute is set on the button element. |
| `role="status"` | When `loading` prop is set, the component announces the loading state (start and finish). |
| `aria-hidden="true"` | When the `icon` prop is set, the icon is hidden from the screen reader. |

## Limitations

Due to the nature of **Web Components** and **shadow DOM**, there are limitations when using some **ARIA** attributes to define relationships between elements across different shadow DOMs or shadow DOM/light DOM combinations.

| ARIA | Support |
| --- | --- |
| `aria-labelledby` | 🚫 |
| `aria-describedby` | 🚫 |
| `aria-owns` | 🚫 |
| `aria-controls` | 🚫 |
| `aria-activedescendant` | 🚫 |

## Development considerations

### Labelling

If the text of a button does not clearly indicate what the button's behavior is, add a brief, descriptive label using the `aria` property with the `aria-label` value to provide more context for screen reader users. Phrases like "Add", "Detail" or "Show" can be unclear when read out of context by a screen reader. In such instances, provide an alternative text that offers more detailed information, such as "Add item XYZ to shopping cart" or "Details of product XYZ."

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
| Keyboard | ✅ |
| Screen reader (VoiceOver, NVDA) | ✅ |

## API

Authoritative API data: `@porsche-design-system/components-js/meta` (`component-meta`). When these tables disagree with it, follow `component-meta`.

### Properties

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `aria` | `ButtonAriaAttribute` | `undefined` | Sets ARIA attributes on the button to improve accessibility for screen readers. |
| `compact` | `boolean`<br>`BreakpointCustomizable<boolean>` | `false` | Reduces the button's height and padding for denser layouts. Supports responsive breakpoint values. |
| `disabled` | `boolean` | `false` | Disables the button, preventing all interaction and blocking events. |
| `form` | `string` | `undefined` | Associates the button with a form element by its ID, so it can submit or reset that form even when placed outside of it. |
| `hideLabel` | `boolean`<br>`BreakpointCustomizable<boolean>` | `false` | Hides the visible label while keeping it accessible to screen readers. Supports responsive breakpoint values. |
| `icon` | `'none'`<br>one of 290 icon names — see [icon names](references/icons.md) | `'none'` | Sets the icon displayed inside the button. Use `none` to show no icon. |
| `iconSource` | `string` | `undefined` | Sets a path to a custom SVG icon, used instead of the built-in icon set. |
| `loading` | `boolean` | `false` | Disables the button and replaces its content with a loading spinner to indicate an ongoing operation. |
| `name` | `string` | `undefined` | Sets the name submitted with the form data when this button triggers form submission. |
| `type` | `'button'` `'submit'` `'reset'` | `'submit'` | Sets the button's HTML type — `submit` sends the form, `reset` clears it, `button` performs no default action. |
| `value` | `string` | `undefined` | Sets the value submitted with the form data when this button triggers form submission, paired with `name`. |
| `variant` | `'primary'` `'secondary'` | `'primary'` | Sets the visual style variant of the button (`primary` or `secondary`). |

### Slots

| Slot | Required | Allowed tag names | Description |
| --- | --- | --- | --- |
| _(default)_ | no | — | Default slot for the button label. |

## Examples

| Example | When to use | File |
| --- | --- | --- |
| Default | Minimal default configuration. | [./examples/Default.vue](./examples/Default.vue) |
| Form | When used as a submit button, the `name` and `value` props are submitted as a pair as part of the form data. | [./examples/Form.vue](./examples/Form.vue) |
| Form Attribute | When a button is used as a submit or reset button outside a form, the `form` attribute can be utilized to explicitly associate the button with a specific form element. | [./examples/FormAttribute.vue](./examples/FormAttribute.vue) |
