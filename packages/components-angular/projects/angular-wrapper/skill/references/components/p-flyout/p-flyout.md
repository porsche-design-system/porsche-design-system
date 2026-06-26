# p-flyout

The `p-flyout` is a overlay from the left or right side of the screen. It is commonly used as a temporary workspace that allows users to complete tasks without navigating to a new page or as a mobile navigation.

It is a controlled component. This grants flexible control over the flyout's behavior especially whether it should stay open after user interaction like submission of a form.

## Usage

The following section provides guidance for designers and developers on how to use this component in different situations.

### Do:

- Use a Flyout as a temporary workspace that allows users to complete tasks without navigating to a new page.
- Use a Flyout for mobile navigation.
- Adjust Flyout size and alignment with the grid.
- Use the sticky header for a descriptive heading & optional sub-heading.
- Use the sticky footer for a call to action.
- Use the sub-footer slot for additional or less important information such as legals or faqs.
- Follow button order and positioning guidelines.
- Use feedback banner for any feedback related to the request.

### Don't:

- Don't use to many actions in the sticky footer or header.
- Don't put important information in the sub-footer slot.
- Don't use fullscreen Flyout's on desktop.
- Don't launch a Flyout within a Flyout.

## Accessibility support

The `Flyout` component uses the native `dialog` element to provide a modal dialog which comes with browser-specific behavior. As a result, accessibility features may vary across different browsers.

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

#### Internal **ARIA** that is managed by the component:

| ARIA | Usage |
| --- | --- |
| `aria-label="STRING"` | Defines the accessible name if no `aria` property is provided, uses the contents of the header slot and falls back to a fixed name. |

## Development considerations

To inform users that the trigger button opens a `dialog`, the `aria-haspopup` attribute must be set using the `aria` property, e.g.: `aria={{ 'aria-haspopup': 'dialog' }}`.

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
| `aria` | `FlyoutAriaAttribute` | `undefined` | Sets ARIA attributes on the flyout dialog element for improved screen reader accessibility. |
| `backdrop` | `'blur'` `'shading'` | `'blur'` | Sets the backdrop style. Use `blur` when background content is irrelevant; use `shading` when users still need visual context. |
| `background` | `'canvas'` `'surface'` | `'canvas'` | Sets the background color of the flyout panel (`canvas` or `surface`). |
| `disableBackdropClick` | `boolean` | `false` | When enabled, clicking the backdrop will not close the flyout. |
| `footerBehavior` | `'sticky'` `'fixed'` | `'sticky'` | Controls footer behavior. `fixed` keeps it anchored at the bottom; `sticky` pins it only when content overflows. |
| `fullscreen` | `boolean`<br>`BreakpointCustomizable<boolean>` | `false` | If true the flyout stretches to the full viewport width with squared corners. Useful for smaller viewports where the flyout would otherwise fill the screen but still show rounded corners. |
| `open` _(required)_ | `boolean` | `false` | Controls whether the flyout panel is visible. |
| `position` | `'start'` `'end'` | `'end'` | Sets the side the flyout slides in from — `start` for left or `end` for right in LTR layouts. |

### Events

| Event | Type | Description |
| --- | --- | --- |
| `dismiss` | `CustomEvent<void>` | Emitted when the user closes the flyout via the close button, backdrop click, or Escape key. |
| `motionHiddenEnd` | `CustomEvent<FlyoutMotionHiddenEndEventDetail>`<br>`TransitionEvent` | Emitted after the flyout's close transition completes and the panel is fully hidden. |
| `motionVisibleEnd` | `CustomEvent<FlyoutMotionVisibleEndEventDetail>`<br>`TransitionEvent` | Emitted after the flyout's open transition completes and the panel is fully visible. |

### Slots

| Slot | Required | Allowed tag names | Description |
| --- | --- | --- | --- |
| `header` | no | — | Renders a sticky header section above the content area. |
| _(default)_ | no | — | Default slot for the main content. |
| `footer` | no | — | Shows a sticky footer section, flowing under the content area when scrollable. |
| `sub-footer` | no | — | Renders additional content below the footer, such as legal information or FAQs. It appears when the flyout has enough space or when the user scrolls to the end. |

### CSS Variables

| CSS Variable | Default | Description |
| --- | --- | --- |
| `--p-flyout-width` | `auto` | Width of the flyout. |
| `--p-flyout-sticky-top` | — | @experimental Exposes the header's height as a read-only CSS variable, set automatically by the component. Slotted sticky content can use this value to offset their top position correctly. |
| `--ref-p-flyout-pt` | — | Exposes the internally used padding-top of the Flyout as read only CSS variable. When slotting e.g. a media container, this variable can be used to stretch the element to the top of the Flyout. |
| `--ref-p-flyout-pb` | — | Exposes the internally used padding-bottom of the Flyout as read only CSS variable. When slotting e.g. a media container, this variable can be used to stretch the element to the bottom of the Flyout. |
| `--ref-p-flyout-px` | — | Exposes the internally used padding-inline of the Flyout as read only CSS variable. When slotting e.g. a media container, this variable can be used to stretch the element to the full horizontal size of the Flyout. |

## Examples

| Example | When to use | File |
| --- | --- | --- |
| Default | Minimal default configuration. | [./examples/Default.ts](./examples/Default.ts) |
| Sticky content with Custom CSS Property (Experimental) | In order to display some sticky element within the flyout content you can use the experimental `--p-flyout-sticky-top` CSS custom property to account for the height of the header. | [./examples/StickyTop.ts](./examples/StickyTop.ts) |
| Flyout Form | The following example demonstrates how a form can be used within a flyout component: | [./examples/Form.ts](./examples/Form.ts) |
| Custom Styling | The Flyout exposes read-only CSS Variables (prefixed with `--ref-`). | [./examples/CustomStyling.ts](./examples/CustomStyling.ts) |
