# p-inline-notification

The `p-inline-notification` is a controlled component that provides action-based feedback messages (e.g. after performing a task) or to convey informational and/or critical notification like some site related topics.

Review the [notification decision tree](https://designsystem.porsche.com/patterns/notifications/decision-tree/) to determine which notification component is best for a particular scenario.

# Inline Notification

## Accessibility support

### Keyboard

| Key / state | Function |
| --- | --- |
| `Tab`, `Shift-Tab` | Moves focus to the next focusable element. |

### ARIA enhancements

#### Internal **ARIA** that is managed by the component:

| ARIA | Usage |
| --- | --- |
| `role="status"` | When content is populated or changed in `state="info"`, the component announces it unobtrusively. |
| `role="alert"` | When content is populated or changed in `state="warning/error"`, the component announces it immediately. |
| `aria-label="STRING"` | References the accessible name. |

## Development considerations

### ARIA live announcements

The `Inline Notification` component uses `role="status"` and `role="alert"` to announce **content changes** for assistive technologies, but only if the component is **pre-rendered** and the content is added dynamically.

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
| `actionIcon` | `''`<br>one of 290 icon names — see [icon names](references/icons.md) | `'arrow-right'` | Sets the icon displayed inside the action button using a PDS icon name. |
| `actionLabel` | `string` | `undefined` | Sets the label text of the optional action button inside the notification. |
| `actionLoading` | `boolean` | `false` | Disables the action button and shows a spinner to indicate an ongoing operation. |
| `description` | `string` | `''` | Sets the supporting description text shown below the heading. |
| `dismissButton` | `boolean` | `true` | Shows a dismiss button so the user can manually close the notification. |
| `heading` | `string` | `''` | Sets the heading text displayed at the top of the inline notification. |
| `headingTag` | `'h1'` `'h2'` `'h3'` `'h4'` `'h5'` `'h6'` | `'h5'` | Sets the HTML heading tag (e.g. h2, h3) to maintain correct document structure. |
| `state` | `'info'` `'success'` `'warning'` `'error'` | `'info'` | Sets the visual state — controls the icon and color scheme (`info`, `warning`, `error`, `success`). |

### Events

| Event | Type | Description |
| --- | --- | --- |
| `action` | `CustomEvent<void>` | Emitted when the user clicks the action button. |
| `dismiss` | `CustomEvent<void>` | Emitted when the user clicks the dismiss button. |

### Slots

| Slot | Required | Allowed tag names | Description |
| --- | --- | --- | --- |
| `heading` | no | — | Defines the heading of the inline notification. Can be used as an alternative to the `heading` prop for rich content. |
| _(default)_ | no | — | Default slot for the inline notification description content. |

## Examples

| Example | When to use | File |
| --- | --- | --- |
| Default | Minimal default configuration. | [./examples/Default.tsx](./examples/Default.tsx) |
| Event Handling | The custom event that is emitted on close button click is called `dismiss`. | [./examples/EventHandling.tsx](./examples/EventHandling.tsx) |
| Action Button | A custom interaction, e.g., to retry the previous action like submitting a form, can be provided by setting the optional `actionLabel`, `actionIcon` and `actionLoading` properties. | [./examples/ActionButton.tsx](./examples/ActionButton.tsx) |
