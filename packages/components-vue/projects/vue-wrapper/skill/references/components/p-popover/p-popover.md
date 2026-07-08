# p-popover

The `p-popover` component can be used to display some additional content on top of surrounding content, triggered by a button. By default it renders its own info button , or you can provide a custom trigger via the `button` slot.

By default, the Popover works **uncontrolled**: it manages its own visibility and toggles open or closed when its info button (or a slotted trigger) is clicked. It is dismissed on outside click, on `Escape`, or when keyboard focus leaves the Popover.

Alternatively, the Popover can be used in a **controlled** mode by setting the `open` prop together with a slotted `button` (the default info button does not toggle in this mode). In this mode you own the open state: the Popover only emits the `dismiss` event when the user requests to close it (via `Escape`, an outside click or when keyboard focus leaves the Popover), and you decide whether to update `open` in response.

**Hint:** The `p-popover` utilizes the [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API) and gets rendered on the `#top-layer` which enables it to be shown correctly even when used e.g. within a scroll container.

## Usage

The following section provides guidance for designers and developers on how to use this component in different situations.

### Do:

- Use it to display additional information that is not necessary for task completion or to provide further explanation about a workflow.
- Position popovers in a way that they do not block related content.
- Choose a preferred direction in which the popover should open, or it will automatically open in the direction with the most available space.
- Use it consistently throughout your site.

### Don't:

- Don't use for content that can be displayed directly.

---

## References

Nielsen Norman Group [Tooltip Guidelines](https://nngroup.com/articles/tooltip-guidelines)

## Accessibility support

### Keyboard

| Key / state | Function |
| --- | --- |
| `Tab`, `Shift-Tab` | Moves focus to the next (or previous) focusable element. |
| `Enter`, `Space` | - Opens/closes the popover. |

### ARIA enhancements

#### External **ARIA** provided by the `aria` property:

| ARIA | Usage |
| --- | --- |
| `aria-label` | Defines a string value that labels the interactive element. |

#### Internal **ARIA** that is managed by the component:

| ARIA | Usage |
| --- | --- |
| `aria-expanded="BOOLEAN"` | Indicates that the popover element is displayed/hidden. |

## Limitations

### Custom slotted button

The `p-popover` component does not support the `aria-expanded` attribute when used with a custom slotted button. This is because the component does not expose its `open` state publicly, which is necessary to manage the relationship between the button and the internal state of the popover.

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
| `aria` | `PopoverAriaAttribute` | `undefined` | Sets ARIA attributes on the popover panel to improve accessibility for screen readers. |
| `description` | `string` | `undefined` | Sets the text content displayed inside the popover panel when it is open, providing contextual help or information. |
| `direction` | `'top'` `'right'` `'bottom'` `'left'` | `'bottom'` | Sets the preferred direction for the popover to open relative to its trigger button. Falls back to the direction with the most available viewport space. |

### Slots

| Slot | Required | Allowed tag names | Description |
| --- | --- | --- | --- |
| _(default)_ | no | — | Default slot for the popover content. |
| `button` | no | — | Renders a custom trigger button. When used, the default info button is replaced. |

## Examples

| Example | When to use | File |
| --- | --- | --- |
| Default | Minimal default configuration. | [./examples/Default.vue](./examples/Default.vue) |
| Slotted button | The `p-popover` component can also be used with a **slotted button** via the `button` slot, allowing you to provide a custom button element. | [./examples/SlottedButton.vue](./examples/SlottedButton.vue) |
