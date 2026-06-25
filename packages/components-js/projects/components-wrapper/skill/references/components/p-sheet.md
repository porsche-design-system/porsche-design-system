# p-sheet

The `p-sheet` is a temporary overlay to focus the user's attention on one or multiple tasks while the underlying page is still visible but interactions with it are blocked. It should be used thoughtfully and sparingly.

It is a controlled component. This grants flexible control over the sheet's behavior especially whether it should stay open after user interaction like submission of a form.

Following **web standards**, the component uses the native `<dialog />` element internally which ensures proper focus handling including a **focus trap**. In addition, it's rendered on the `#top-layer` which ensures the element to be on top of the page independent of where `p-sheet` is placed in the DOM hierarchy (`z-index` is not relevant anymore and won't have any effect).

The most important property of `p-sheet` is its `open` property. When it's set to `true` the sheet will be visible. In order to get notified when the sheet gets closed by clicking the `x` button, the backdrop or by pressing the `Escape` key you need to register an event listener for the `dismiss` event which is emitted by `p-sheet`.

## Usage

The following section provides guidance for designers and developers on how to use this component in different situations.

### Do:

- Use an sheet only for critical decisions or when multiple related actions need to be presented.
- Keep the options clear, concise, and easy to understand.
- Limit the number of choices to avoid overwhelming the user.
- Use descriptive labels that indicate the outcome of each action.
- Include a cancel option to allow users to dismiss the sheet without making a selection.

### Don't:

- Don’t use sheets for non-essential or minor tasks.
- Avoid presenting too many options or complex decisions.
- Don’t use vague labels like “OK” or “Cancel” without context.
- Avoid stacking multiple sheets on top of each other.
- Don’t interrupt the user’s workflow unnecessarily.

## Accessibility support

The `Sheet` component uses the native `dialog` element to provide a modal dialog which comes with browser-specific behavior. As a result, accessibility features may vary across different browsers.

### Keyboard

| Key / state | Function |
| --- | --- |
| `Tab`, `Shift-Tab` | Moves focus to the next (or previous) focusable element inside the dialog. Focus is trapped (browser behavior). |
| `ESC` | Closes the dialog. |
| `focus` on trigger element | The focus is returned to the trigger element after closing the dialog (browser behavior). |

### ARIA enhancements

#### External **ARIA** provided by the `aria` property:

| ARIA | Usage |
| --- | --- |
| `aria-label` | Defines a string value that labels the dialog element. |
| `role` | Defines the semantic of the dialog element (`dialog` or `alertdialog`). |

#### Internal **ARIA** that is managed by the component:

| ARIA | Usage |
| --- | --- |
| `aria-label="STRING"` | Defines the accessible name if no `aria` property is provided, uses the contents of the header slot and falls back to a fixed name. |

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
| `aria` | `SheetAriaAttribute` | `undefined` | Sets ARIA attributes on the sheet dialog element for improved accessibility when the default `aria-label` is insufficient. |
| `background` | `'canvas'` `'surface'` | `'canvas'` | Sets the background color of the sheet panel (`canvas` or `surface`). |
| `disableBackdropClick` | `boolean` | `false` | When enabled, clicking the backdrop will not close the sheet. |
| `dismissButton` | `boolean` | `true` | Shows a dismiss button in the sheet header so users can manually close it. |
| `open` _(required)_ | `boolean` | `false` | Controls whether the sheet panel slides in from the bottom and is visible to the user. |

### Events

| Event | Type | Description |
| --- | --- | --- |
| `dismiss` | `CustomEvent<void>` | Emitted when the user dismisses the sheet via the close button, backdrop click, or Escape key. |
| `motionHiddenEnd` | `CustomEvent<SheetMotionHiddenEndEventDetail>`<br>`TransitionEvent` | Emitted after the sheet's close transition has fully completed and the panel is hidden. |
| `motionVisibleEnd` | `CustomEvent<SheetMotionVisibleEndEventDetail>`<br>`TransitionEvent` | Emitted after the sheet's open transition has fully completed and the panel is visible. |

### Slots

| Slot | Required | Allowed tag names | Description |
| --- | --- | --- | --- |
| `header` | no | — | Renders a header section above the content area. |
| _(default)_ | no | — | Default slot for the main content. |

### CSS Variables

| CSS Variable | Default | Description |
| --- | --- | --- |
| `--ref-p-sheet-pt` | — | Exposes the internally used padding-top of the Sheet as read only CSS variable. When slotting e.g. a media container, this variable can be used to stretch the element to the top of the Sheet. |
| `--ref-p-sheet-pb` | — | Exposes the internally used padding-bottom of the Sheet as read only CSS variable. When slotting e.g. a media container, this variable can be used to stretch the element to the bottom of the Sheet. |
| `--ref-p-sheet-px` | — | Exposes the internally used padding-inline of the Sheet as read only CSS variable. When slotting e.g. a media container, this variable can be used to stretch the element to the full horizontal size of the Sheet. |

## Examples

| Example | When to use | File |
| --- | --- | --- |
| Default | Minimal default configuration. | [./p-sheet/examples/Default.html](./p-sheet/examples/Default.html) |
