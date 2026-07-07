# Fix Guide — Focus Visibility

## When to use

WCAG 2.4.7 Focus Visible, 2.4.11 Focus Not Obscured (partial)

axe-core does **not** reliably detect missing focus indicators on custom UI or shadow DOM hosts.

## Agent-driven probe (step 2b)

Use **Playwright MCP** or the built-in browser. Works in any PDS product — no project-specific scripts required.

### Procedure

1. Navigate to the page; wait for load and PDS `componentsReady()` if applicable
2. Press **Tab** repeatedly through interactive elements (record ~20–40 stops per page)
3. After each Tab, run a `page.evaluate` probe on `document.activeElement` (see below)
4. Optionally take a screenshot at each stop for the report
5. Repeat in light and dark themes if the app supports both

### Focus indicator probe (`page.evaluate`)

Inline all logic in the callback — do not pass nested functions from TypeScript (serialization issues).

Check the active element and up to 8 ancestors (including shadow hosts) for a visible:

- `outline` (style not `none`, width > 0)
- `box-shadow` (not `none`)
- contrasting `border`

Traverse into shadow roots: while `activeElement.shadowRoot?.activeElement`, descend to the deepest focused node.

| Result | Severity |
| ------ | -------- |
| No visible indicator on element or ancestors | **Failure** |
| Focus center obscured by another element (`elementFromPoint`) | **Warning** — common false positive in sidebars |
| Zero-size focus target | **Failure** |

### PDS shadow DOM note

PDS components (`p-button`, `p-link`, etc.) render focus rings inside shadow DOM. If focus is on a host element, also check `:focus-visible` descendants inside `element.shadowRoot`.

## Fix patterns

### PDS custom elements

Use `:focus-visible` with a visible focus ring. Follow [PDS focus styling](https://designsystem.porsche.com/v4/emotion/focus/) for custom UI in PDS-based apps.

### CSS (product apps)

```css
.interactive:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}

.interactive:focus:not(:focus-visible) {
  outline: none;
}
```

### Never

```css
/* ❌ */
* { outline: none; }
```

## Verify

- Re-run Tab probe — no `missing-indicator` failures
- Visual Tab check in light and dark themes
- Document obscured-focus warnings if visually acceptable
