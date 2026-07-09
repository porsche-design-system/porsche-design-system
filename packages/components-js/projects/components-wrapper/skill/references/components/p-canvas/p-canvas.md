# p-canvas

> **Experimental:** This component is experimental — its API may change in any release. Avoid relying on it in production.

The `p-canvas` is an experimental layout component for productive web applications.

The canvas component provides a CSS utility class which comes with a basic 12 columns [CSS grid](https://css-tricks.com/snippets/css/complete-guide-grid) and [CSS container-type](https://css-tricks.com/css-container-queries). The utility class can be used in default or footer slot to align its content.

```scss
.-p-canvas-grid // experimental, might be removed in a future release
```

The canvas component has some values which can be overwritten by **CSS Variables**.

```scss
--p-canvas-sidebar-start-width: 220px;
--p-canvas-sidebar-end-width: 180px;
```

## Usage

The following section provides guidance for designers and developers on how to use the p-canvas layout component in different application contexts.

### Do:

- Use p-canvas to structure complex application layouts with sidebars, headers, and footers in a consistent, responsive manner.
- Use named slots (sidebar-start, sidebar-end, header-start, footer, etc.) to separate concerns and improve maintainability.
- Use the -p-canvas-grid utility class to create a 12-column layout inside the canvas content or footer areas.
- Combine p-canvas with CSS Grid column helpers (e.g. grid-column: span 4) to align content efficiently.
- Use the sidebarStartOpen and sidebarEndOpen bindings to dynamically control sidebar behavior based on viewport size or user actions.
- Customize layout widths via CSS variables like --p-canvas-sidebar-start-width and --p-canvas-sidebar-end-width to match your design needs.
- Use slot="background" for decorative media like images or videos that sit below the main content, enhancing visual appeal.
- Consider keyboard and focus management when using dynamic flyouts or sidebars, especially on mobile.

### Don’t:

- Don’t use p-canvas for simple or static content pages where a standard layout is sufficient.
- Don’t place critical content only inside sidebars or sticky areas without providing access via the main layout.
- Don’t rely solely on custom styling; instead, use provided slots and layout classes to maintain consistency.
- Don’t nest p-canvas within another p-canvas; this may lead to unpredictable layout behavior.
- Don’t overload the p-canvas with too many sticky elements that compete for screen space, especially on smaller viewports.
- Don’t use -p-canvas-grid outside of canvas slots—it is experimental and might be removed in future releases.
- Don’t override CSS variables globally without scoping, as this can break other usages in your application.

## Accessibility support

Not yet considered due to experimental state  🧪.

## API

Authoritative API data: `../meta` (`component-meta`). When these tables disagree with it, follow `component-meta`.

### Properties

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `background` | `'canvas'` `'surface'` | `'canvas'` | Sets the background color of the main content area and automatically applies a matching color to the sidebar. |
| `sidebarEndOpen` | `boolean` | `false` | Controls whether the utility sidebar on the end side (right in LTR) is open or collapsed. |
| `sidebarStartOpen` | `boolean` | `false` | Controls whether the navigation sidebar on the start side (left in LTR) is open or collapsed. |

### Events

| Event | Type | Description |
| --- | --- | --- |
| `sidebarEndDismiss` | `CustomEvent<void>` | Emitted when the user dismisses the end sidebar via the close button. |
| `sidebarStartUpdate` | `CustomEvent<CanvasSidebarStartUpdateEventDetail>`<br>`{ open: boolean }` | Emitted when the user toggles the start sidebar, with the new open state in the event detail. |

### Slots

| Slot | Required | Allowed tag names | Description |
| --- | --- | --- | --- |
| `title` | no | — | Renders the application name in the header section of the sidebar start area. |
| `header-start` | no | — | Renders a **sticky** header section above the content area on the **start** side (**left** in **LTR** mode / **right** in **RTL** mode). |
| `header-end` | no | — | Renders a **sticky** header section above the content area on the **end** side (**right** in **LTR** mode / **left** in **RTL** mode). |
| _(default)_ | no | — | Default slot for the main content. |
| `footer` | no | — | Renders a **sticky** footer section underneath the main content. |
| `sidebar-start` | no | — | Renders a sidebar area on the **start** side (**left** in **LTR** mode / **right** in **RTL** mode). On mobile view it transforms into a flyout. |
| `sidebar-end` | no | — | Renders a sidebar area on the **end** side (**right** in **LTR** mode / **left** in **RTL** mode). On mobile view it transforms into a flyout. |
| `sidebar-end-header` | no | — | Renders in the header section of the sidebar end area. |
| `background` | no | — | Can be used to pass a sticky media element <img/> or <video/> placed underneath the main content. |

### CSS Variables

| CSS Variable | Default | Description |
| --- | --- | --- |
| `--p-canvas-sidebar-start-width` | `320px` | Width of the sidebar start. |
| `--p-canvas-sidebar-end-width` | `320px` | Width of the sidebar end. |

## Examples

| Example | When to use | File |
| --- | --- | --- |
| Default | Minimal default configuration. | [./examples/Default.html](./examples/Default.html) |
