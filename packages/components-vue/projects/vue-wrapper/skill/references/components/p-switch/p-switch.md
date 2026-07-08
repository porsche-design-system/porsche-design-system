# p-switch

The `p-switch` component is a control that is used to quickly switch between two possible states. A switch is only used for these binary actions that occur immediately after the user “flips the switch”. Commonly it is used for “on/off” state.

It is a controlled component. This means it does not contain any internal state, and you got full control over its behavior.

The `p-switch` component can be used with a visible or hidden label, but it's recommended to keep the label visible for better accessibility whenever possible. A `label` is a caption which informs the user which action is followed by interaction. When used with hidden label, it's best practice to provide a descriptive label text for screen readers.

You can use native `click`, `focus`, `focusin`, `blur` and `focusout` events on the `p-switch`.

## Usage

The following section provides guidance for designers and developers on how to use this component in different situations.

### Do:

- Use it when an instant response to applied settings is required without explicit action.
- Use to enable or disable a mode, feature, or function.
- Use when the user is toggling independent features or behaviors.
- Use the label to describe the affected property.
- Use the right-aligned version for lists (especially for handling on mobile devices).
- Use the stretched version for lists on mobile or smaller containers.

### Don't:

- Don't use it if a setting requires a button press before it can take effect (use a [Checkbox](../p-checkbox/p-checkbox.md) instead).
- Don't use anything longer than two words in the label whenever possible.
- Don't use the switch for multiple-choice questions.
- Don't use slide Switch when an intermediate state is required (Use [Checkbox](../p-checkbox/p-checkbox.md) instead).
- Don't use the label to describe the state of the component.

---

## Related Components

- [Checkbox](../p-checkbox/p-checkbox.md)
- [Button](../p-button/p-button.md)

## Accessibility support

### Keyboard

| Key / state | Function |
| --- | --- |
| `Tab`, `Shift-Tab` | Moves focus to the scroll container or to next (or previous) focusable element. |
| `Enter`, `Space` | Activates the completed and current step-item. |
| `disabled` | Step-item still focusable. |

### ARIA enhancements

#### Internal **ARIA** that is managed by the component:

| ARIA | Usage |
| --- | --- |
| `role="switch"` | Indicates the element as switch element. |
| `aria-checked="BOOLEAN"` | Indicates the status of the switch element. |
| `role="status"` | When `loading` prop is set, the component announces the loading state (start and finish). |

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
| `alignLabel` | `'start'` `'end'`<br>`BreakpointCustomizable<SwitchAlignLabel>` | `'end'` | Sets the position of the slotted label relative to the switch toggle, either before (`start`) or after (`end`) it. Supports responsive breakpoint values. |
| `checked` | `boolean` | `false` | Reflects the switch's current on/off state and allows setting the initial checked value when the component first renders. |
| `compact` | `boolean` | `false` | Reduces the switch size and spacing for use in dense layouts where vertical space is limited. |
| `disabled` | `boolean` | `false` | Prevents user interaction with the switch and blocks all click and keyboard events while it is disabled. |
| `hideLabel` | `boolean`<br>`BreakpointCustomizable<boolean>` | `false` | Hides the visible label while keeping it accessible to screen readers. Supports responsive breakpoint values. |
| `loading` | `boolean` | `false` | Disables the switch and shows a loading spinner to indicate an ongoing asynchronous toggle operation. |
| `stretch` | `boolean`<br>`BreakpointCustomizable<boolean>` | `false` | Expands the space between the switch toggle and its label to fill the full available width of the container. Supports responsive breakpoint values. |

### Events

| Event | Type | Description |
| --- | --- | --- |
| `update` | `CustomEvent<SwitchUpdateEventDetail>`<br>`{ checked: boolean }` | Emitted when the user toggles the switch, carrying the new `checked` state in the event detail. |

### Slots

| Slot | Required | Allowed tag names | Description |
| --- | --- | --- | --- |
| _(default)_ | no | — | Default slot for the label. |

## Examples

| Example | When to use | File |
| --- | --- | --- |
| Default | Minimal default configuration. | [./examples/Default.vue](./examples/Default.vue) |
