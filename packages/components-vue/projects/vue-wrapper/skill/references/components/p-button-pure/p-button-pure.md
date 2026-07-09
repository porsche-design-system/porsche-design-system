# p-button-pure

The `p-button-pure` component is essential to perform events for **interactions**. A Button can be used with or without a label, but it's recommended to keep the **label visible** for better **usability** whenever possible. When used without a label, it is mandatory for **accessibility** to provide a descriptive label text for screen readers.

Whenever you want to provide navigational elements, stick to the [Link](../p-link/p-link.md) or [Link Pure](../p-link-pure/p-link-pure.md) component instead.

Similarly to the `p-button`, the `p-button-pure` can be used as a submit button within a form for which a `name` and `value` prop can be passed. See the [Button Form Example](../p-button/p-button.md) for more information.

You can use native `click`, `focus`, `focusin`, `blur` and `focusout` events on the `p-button-pure`.

## Usage

### Do:

- Use Button Pure as a more subtle call to action or to execute an action.
- Choose the appropriate variant for your use case, such as Icon and Text or Text only.
- Use Icon left as the default state and stretch only on small viewports or areas.
- Keep the label short and include active verbs to indicate the action.
- Stack Button Pure groups left-aligned to guarantee scannability and legibility.

### Don't:

- Don't use Button Pure as the primary or only call to action.
- Don't use long labels that do not give a clear indication of the action.
- Don't use buttons to link/navigate to other pages. Use regular [Link](../p-link/p-link.md) instead.

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

If the text of a button does not clearly indicate what the button's behavior is, add a brief, descriptive label using the `aria` property with the `aria-label` value to provide more context for screen reader users. Phrases like "Add," "Detail," or "Show" can be unclear when read out of context by a screen reader. In such instances, provide an alternative text that offers more detailed information, such as "Add item XYZ to shopping cart" or "Details of product XYZ."

## API

### Properties

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `active` | `boolean` | `false` | Visually marks the button as the currently active or selected item, useful for navigation and toggle patterns. |
| `alignLabel` | `'start'` `'end'`<br>`BreakpointCustomizable<ButtonPureAlignLabel>` | `'end'` | Sets the label position relative to the icon — `start` places it before, `end` places it after. Supports responsive breakpoint values. |
| `aria` | `ButtonPureAriaAttribute` | `undefined` | Sets ARIA attributes on the button to improve accessibility for screen readers. |
| `color` | `'primary'` `'contrast-higher'` `'contrast-high'` `'contrast-medium'` `'inherit'` | `'primary'` | Sets the foreground color of the button's icon and label text. |
| `disabled` | `boolean` | `false` | Disables the button, preventing all interaction and blocking events. |
| `form` | `string` | `undefined` | Associates the button with a form element by its ID, so it can submit or reset that form even when placed outside of it. |
| `hideLabel` | `boolean`<br>`BreakpointCustomizable<boolean>` | `false` | Hides the visible label while keeping it accessible to screen readers. Supports responsive breakpoint values. |
| `icon` | `''`<br>one of 290 icon names — see [icon names](references/icons.md) | `'arrow-right'` | Sets the icon displayed next to the label. |
| `iconSource` | `string` | `undefined` | Sets a path to a custom SVG icon, used instead of the built-in icon set. |
| `loading` | `boolean` | `false` | Disables the button and replaces its icon with a loading spinner to indicate an ongoing operation. |
| `name` | `string` | `undefined` | Sets the name submitted with the form data when this button triggers form submission. |
| `size` | `'2xs'` `'xs'` `'sm'` `'md'` `'lg'` `'xl'` `'2xl'` `'3xl'` `'4xl'` `'5xl'` `'inherit'`<br>_deprecated:_ `'xx-small'` `'x-small'` `'small'` `'medium'` `'large'` `'x-large'`<br>`BreakpointCustomizable<ButtonPureSize>` | `'sm'` | Sets the font size of the button label. Supports responsive breakpoint values. |
| `stretch` | `boolean`<br>`BreakpointCustomizable<boolean>` | `false` | Expands the space between icon and label to fill the full container width. Supports responsive breakpoint values. |
| `type` | `'button'` `'submit'` `'reset'` | `'submit'` | Sets the button's HTML type — `submit` sends the form, `reset` clears it, `button` performs no default action. |
| `underline` | `boolean` | `false` | Adds a text underline to the label to reinforce the button's link-like appearance. |
| `value` | `string` | `undefined` | Sets the value submitted with the form data when this button triggers form submission, paired with `name`. |

### Slots

| Slot | Required | Allowed tag names | Description |
| --- | --- | --- | --- |
| _(default)_ | no | — | Default slot for the button label. |

## Examples

| Example | When to use | File |
| --- | --- | --- |
| Default | Minimal default configuration. | [./examples/Default.vue](./examples/Default.vue) |
| Button Pure with custom clickable/focusable area | Sometimes it might be useful to enlarge the clickable/focusable area of a button to fulfill accessibility guidelines. | [./examples/CustomClickableArea.vue](./examples/CustomClickableArea.vue) |
| Form | When used as a submit button, the `name` and `value` props are submitted as a pair as part of the form data. | [./examples/Form.vue](./examples/Form.vue) |
| Form Attribute | When a button is used as a submit or reset button outside a form, the `form` attribute can be utilized to explicitly associate the button with a specific form element. | [./examples/FormAttribute.vue](./examples/FormAttribute.vue) |
