# p-drilldown

The `p-drilldown` component is meant for displaying an infinite multilevel structure in a drilldown menu that overlays the page content from the start side of the screen. It is a controlled component that gives you flexible control over its behavior.

The basic concept of the component is to have a button that opens the `p-drilldown` with an infinite multilevel structure. The levels are generated out of `p-drilldown-item` which generates a list of cascade buttons to navigate to a deeper level, back buttons and a header section on mobile view. These items can be filled with e.g. `p-drilldown-link`, another `p-drilldown-item` or any HTML element.

The visibility of `p-drilldown` can be controlled by its `open` property.

It's **obligatory** that each `p-drilldown-item` has a unique `identifier` and `label` defined.

Since it's a controlled component it's necessary to register an event listener for the `dismiss` and `update` event in order to get notified when `p-drilldown` needs to be closed or navigated to another hierarchy level.

## Usage

The following section provides guidance for designers and developers on how to use this component in different situations.

### Do:

- Use Drilldown for multilevel purposes.
- Use Drilldown for multilevel on desktop & mobile.
- Use a button-pure with a burger icon as the main trigger for the Drilldown component.
- Use additional interaction items to trigger component.
- Use a multilevel hierarchy that matches the two-layer capability of the component.
- Use the first layer for multilevel targets or categories for link lists.
- Use the second layer only if necessary.
- Use section headings on the second layer for a group of links.
- Use link-tile on the second layer for important links.

### Don't:

- Don't put too much additional information into the component.
- Don't use other interaction components than mentioned.
- Don't manipulate the heading in the second layer.
- Don't implement external links without indicators.

---

## Related components

- [Flyout](../p-flyout/p-flyout.md)

## Accessibility support

The `Drilldown` component uses the native `dialog` element to provide a modal dialog which comes with browser-specific behavior. As a result, accessibility features may vary across different browsers.

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
| `activeIdentifier` | `string | undefined` | `undefined` | Sets which `p-drilldown-item` (by `identifier`) is currently expanded to show its sub-navigation level. |
| `aria` | `DrilldownAriaAttribute` | `undefined` | Sets ARIA attributes on the drilldown dialog element for improved screen reader accessibility. |
| `open` | `boolean` | `false` | Controls whether the drilldown navigation panel is visible. |

### Events

| Event | Type | Description |
| --- | --- | --- |
| `dismiss` | `CustomEvent<void>` | Emitted when the user closes the drilldown via the close button or Escape key. |
| `update` | `CustomEvent<DrilldownUpdateEventDetail>`<br>`{ activeIdentifier: string | undefined }` | Emitted when the active navigation level changes, with the new `activeIdentifier` in the event detail. |

### Slots

| Slot | Required | Allowed tag names | Description |
| --- | --- | --- | --- |
| _(default)_ | no | — | Default slot to render p-drilldown items. |

### CSS Variables

| CSS Variable | Default | Description |
| --- | --- | --- |
| `--p-drilldown-grid-template` | `auto/auto` | Overrides the CSS `grid-template` of the default slot container, allowing custom grid layout for drilldown items. |
| `--p-drilldown-gap` | `8px` | Overrides the gap between drilldown items in the default slot container. |

## Examples

| Example | When to use | File |
| --- | --- | --- |
| Default | Minimal default configuration. | [./examples/Default.tsx](./examples/Default.tsx) |
| Example with custom content | To give more flexibility, it's possible to use custom slots `slot="button"` (renders a custom cascade button) and/or `slot="header"` (renders a custom header on mobile view). | [./examples/CustomContent.tsx](./examples/CustomContent.tsx) |
