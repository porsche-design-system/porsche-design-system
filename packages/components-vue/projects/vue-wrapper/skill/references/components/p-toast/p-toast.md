# p-toast

The `p-toast` component manages both, the queue and display of toast messages. Therefore, you can only have a single instance of this component within your application. Its messages are rendered on the `#top-layer` which ensures the element to be on top of the page, independent of where `p-toast` is placed in the DOM hierarchy (z-index is not relevant anymore and won't have any effect).

Review the [notification decision tree](https://designsystem.porsche.com/patterns/notifications/decision-tree/) to determine which notification component is best for a particular scenario.

Queuing messages on `p-toast` component happens via its `addMessage()` method. For Angular users, we offer the injectable `ToastManager` service; for React and Vue, there is the `useToastManager()` hook (a composable in Vue). All expose the `addMessage()` method, which needs to be called with a parameter that has the following structure:

```ts
type ToastMessage = {
  text: string;
  state?: 'info' | 'success';
};
```

The bottom position of the `p-toast` can be adjusted via the `--p-toast-position-bottom` CSS variable.

For more information about the Usage of the `p-toast` checkout the [Notification](https://designsystem.porsche.com/patterns/notifications/introduction) page.

## Accessibility support

### Keyboard

| Key / state | Function |
| --- | --- |
| `Tab` | Moves focus to the close button of the `Toast` element. |

### ARIA enhancements

#### Internal **ARIA** that is managed by the component:

| ARIA | Usage |
| --- | --- |
| `role="status"` | When content is populated or changed in `state="info"`, the component announces it unobtrusively. |
| `aria-hidden="true"` | State `icon` is hidden from the screen reader. |

## Development considerations

### ARIA live announcements

The `Toast` component uses `role="status"` to announce **content changes** for assistive technologies. Therefore, it is **mandatory** that the component is **pre-rendered** and the content (`Toast Item`) is added dynamically.

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

### CSS Variables

| CSS Variable | Default | Description |
| --- | --- | --- |
| `--p-toast-position-bottom` | `56px` | Defines the spacing between the toast and the bottom edge of its container. |

## Examples

| Example | When to use | File |
| --- | --- | --- |
| Default | Minimal default configuration. | [./examples/Default.vue](./examples/Default.vue) |
