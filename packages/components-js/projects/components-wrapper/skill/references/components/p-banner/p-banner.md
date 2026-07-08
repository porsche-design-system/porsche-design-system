# p-banner

The `p-banner` component provides action-based feedback messages (e.g. after performing a task) or to convey informational and/or critical notification like some site related topics.

Review the [notification decision tree](https://designsystem.porsche.com/patterns/notifications/decision-tree) to determine which notification component is best for a particular scenario.

For more information about the Usage of the `p-banner` checkout the [Notification](https://designsystem.porsche.com/patterns/notifications/introduction) page.

## Accessibility support

### Keyboard

| Key / state | Function |
| --- | --- |
| `ESC` | Closes the Banner. |
| `Tab`, `Shift-Tab` | Moves focus to the next focusable element. |
| `focus` | Moves focus automatically to the close button. |

### ARIA enhancements

#### Internal **ARIA** that is managed by the component:

| ARIA | Usage |
| --- | --- |
| `role="status"` | When content is populated or changed in `state="info"`, the component announces it unobtrusively. |
| `role="alert"` | When content is populated or changed in `state="warning/error"`, the component announces it immediately. |
| `aria-label="STRING"` | References the accessible name. |

## Development considerations

### Focus handling

To support **keyboard navigation**, please take care of correct **focus handling** after closing the `Banner` with `ESC` or `Enter` key: The trigger element (e.g. a button) which has opened the `Banner` must receive focus state again after the `Banner` is closed. This is important to keep focus order consistent.

### ARIA live announcements

The `Banner` component uses `role="status"` and `role="alert"` to announce **content changes** for assistive technologies, but only if the component is **pre-rendered** and the content is added dynamically.

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

Authoritative API data: `../meta` (`component-meta`). When these tables disagree with it, follow `component-meta`.

### Properties

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `description` | `string` | `''` | Sets the supporting description text shown below the heading. |
| `dismissButton` | `boolean` | `true` | Shows a dismiss button so the user can manually close the banner. |
| `heading` | `string` | `''` | Sets the heading text displayed at the top of the banner. |
| `headingTag` | `'h1'` `'h2'` `'h3'` `'h4'` `'h5'` `'h6'` | `'h5'` | Sets the HTML heading tag (e.g. h2, h3) to maintain correct document structure for the heading. |
| `open` _(required)_ | `boolean` | `false` | Controls whether the banner is visible. Set to `true` to show it and `false` to hide it. |
| `position` | `'top'` `'bottom'`<br>`BreakpointCustomizable<BannerPosition>` | `{"base":"bottom","s":"top"}` | Sets the position of the banner on screen — `top` or `bottom`. Supports responsive breakpoint values. |
| `state` | `'info'` `'success'` `'warning'` `'error'` | `'info'` | Sets the visual state of the banner — controls the icon and color scheme (`info`, `warning`, `error`, `success`). |

### Events

| Event | Type | Description |
| --- | --- | --- |
| `dismiss` | `CustomEvent<void>` | Emitted when the user closes the banner via the dismiss button or Escape key. |

### Slots

| Slot | Required | Allowed tag names | Description |
| --- | --- | --- | --- |
| `heading` | no | — | Defines the heading of the banner. Can be used as an alternative to the `heading` prop for rich content. |
| _(default)_ | no | — | Default slot for the banner description content. |
| `description` _(deprecated)_ | no | — | Deprecated: Use the default slot instead. |

### CSS Variables

| CSS Variable | Default | Description |
| --- | --- | --- |
| `--p-banner-max-w` | `100ch` | Defines the maximum width of the Banner. |
| `--p-banner-top` | `56px` | Defines the distance from the top of the viewport. Only takes effect when the `position` property is set to `top` (at the respective breakpoint). |
| `--p-banner-bottom` | `56px` | Defines the distance from the bottom of the viewport. Only takes effect when the `position` property is set to `bottom` (at the respective breakpoint). |
| `--p-banner-inset-x` | `max(22px, 10.625vw - 12px)` | Defines the horizontal offset of the Banner from the edges of the viewport. |

## Examples

| Example | When to use | File |
| --- | --- | --- |
| Default | Minimal default configuration. | [./examples/Default.html](./examples/Default.html) |
| Customization | Rich content for `heading` and `description` can be provided via named slots. | [./examples/Customization.html](./examples/Customization.html) |
