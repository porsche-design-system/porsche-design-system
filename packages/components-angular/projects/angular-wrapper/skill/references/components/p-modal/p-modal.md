# p-modal

The `p-modal` is a temporary overlay to focus the user's attention on one task while interactions with the underlying page are blocked. It is only used as highly disruptive modal notification to present important information until dismissed. Or as overlay to confirm critical user actions, such as confirming an irreversible choice. It should be used thoughtfully and sparingly.

It is a controlled component. This grants flexible control over the modal's behavior especially whether it should stay open after user interaction like submission of a form.

Following **web standards**, the component uses the native `<dialog />` element internally which ensures proper focus handling including a **focus trap**. In addition, it's rendered on the `#top-layer` which ensures the element to be on top of the page independent of where `p-modal` is placed in the DOM hierarchy (`z-index` is not relevant anymore and won't have any effect).

The most important property of `p-modal` is its `open` property. When it's set to `true` the modal will be visible. In order to get notified when the modal gets closed by clicking the `x` button, the backdrop or by pressing the `Escape` key you need to register an event listener for the `dismiss` event which is emitted by `p-modal`.

The size of `p-modal` adjusts itself to the content with a predefined **min/max width** which aligns to the **[Porsche Grid](../../styles/tailwindcss.md)**.

## Usage

The following section provides guidance for designers and developers on how to use this component in different situations.

### Do:

- Use Modals to display additional information or required steps without losing context.
- Use Modals for confirmation before performing lengthy or dangerous actions.
- Use default Modal for simple content.
- Use full-width content and background overlay animation to draw user attention.
- Provide multiple ways to dismiss the Modal but require an intentional choice.
- Use scrolling only when necessary and try to keep content in a single view.
- Adjust Modal size and alignment with the grid.
- Use up to three actions in the action bar at the bottom of the Modal.
- Follow button order and positioning guidelines.
- Use feedback banner for any feedback related to the request.

### Don't:

- Don't use fullscreen Modals on desktop.
- Don't use the Modal with more than three buttons.
- Don't launch a Modal within a Modal.

## Accessibility support

The `Modal` component uses the native `dialog` element to provide a modal dialog which comes with browser-specific behavior. As a result, accessibility features may vary across different browsers.

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

## Development considerations

To inform users that the trigger button opens a `dialog`, set the trigger button's `aria` property to the value `{ 'aria-haspopup': 'dialog' }`, binding it with your framework's prop syntax (see the examples).

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
| `aria` | `ModalAriaAttribute` | `undefined` | Sets ARIA attributes on the dialog element for improved accessibility when no visible heading is present. |
| `backdrop` | `'blur'` `'shading'` | `'blur'` | Sets the backdrop style. Use `blur` when the modal is opened by user interaction; use `shading` when opened automatically (e.g. Cookie Consent). |
| `background` | `'canvas'` `'surface'` | `'canvas'` | Sets the background color of the modal panel (`canvas` or `surface`). |
| `disableBackdropClick` | `boolean` | `false` | When enabled, clicking the backdrop will not close the modal. |
| `dismissButton` | `boolean` | `true` | Shows a dismiss button in the modal header so the user can manually close it. |
| `fullscreen` | `boolean`<br>`BreakpointCustomizable<boolean>` | `false` | Expands the modal to the full viewport size, intended for mobile use cases. Supports responsive breakpoint values. |
| `open` _(required)_ | `boolean` | `false` | Controls whether the modal dialog is visible. |

### Events

| Event | Type | Description |
| --- | --- | --- |
| `dismiss` | `CustomEvent<void>` | Emitted when the user closes the modal via the dismiss button, backdrop click, or Escape key. |
| `motionHiddenEnd` | `CustomEvent<ModalMotionHiddenEndEventDetail>`<br>`TransitionEvent` | Emitted after the modal's close transition completes and the dialog is fully hidden. |
| `motionVisibleEnd` | `CustomEvent<ModalMotionVisibleEndEventDetail>`<br>`TransitionEvent` | Emitted after the modal's open transition completes and the dialog is fully visible. |

### Controlled properties

- `open` — a controlled prop: the component does **not** update it itself. Handle the `dismiss` event and assign the new value to `open` yourself, or the change will not take effect.

### Slots

| Slot | Required | Allowed tag names | Description |
| --- | --- | --- | --- |
| `header` | no | — | Renders a header section above the content area. |
| _(default)_ | no | — | Default slot for the main content. |
| `footer` | no | — | Shows a sticky footer section, flowing under the content area when scrollable. |

### CSS Variables

| CSS Variable | Default | Description |
| --- | --- | --- |
| `--p-modal-width` | `auto` | Width of the modal. |
| `--p-modal-spacing-top` | `clamp(16px, 10vh, 192px)` | Spacing of the modal to the top. |
| `--p-modal-spacing-bottom` | `clamp(16px, 10vh, 192px)` | Spacing of the modal to the bottom. |
| `--ref-p-modal-pt` | — | Exposes the internally used padding-top of the Modal as read only CSS variable. When slotting e.g. a media container, this variable can be used to stretch the element to the top of the Modal. |
| `--ref-p-modal-pb` | — | Exposes the internally used padding-bottom of the Modal as read only CSS variable. When slotting e.g. a media container, this variable can be used to stretch the element to the bottom of the Modal. |
| `--ref-p-modal-px` | — | Exposes the internally used padding-inline of the Modal as read only CSS variable. When slotting e.g. a media container, this variable can be used to stretch the element to the full horizontal size of the Modal. |

## Examples

| Example | When to use | File |
| --- | --- | --- |
| Default | Minimal default configuration. | [./examples/Default.ts](./examples/Default.ts) |
| Scrollable modal with sticky footer | If the modal's content does not fit within the available space, the content becomes scrollable and the footer area remains sticky. | [./examples/Scrollable.ts](./examples/Scrollable.ts) |
| Modal as alert dialog | The `p-modal` component can be used as an alert dialog. | [./examples/AlertDialog.ts](./examples/AlertDialog.ts) |
| Custom styling | The modal component has some values that can be overridden via CSS custom properties (aka CSS variables). | [./examples/CustomStyling.ts](./examples/CustomStyling.ts) |
