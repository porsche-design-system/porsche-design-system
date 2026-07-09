# p-table

The `p-table` component displays tabular data and offers column-wise sorting options. It combines a consistent appearance together with great accessibility while not having restrictions regarding its content. Therefore, it can be used for plain text but also rich content like images, form elements and buttons.

It is a controlled component. This means it does not contain any internal state, and you got full control over its behavior.

## Usage

The following section provides guidance for designers and developers on how to use this component in different situations.

### Do:

- Use to display and compare structured data in rows and columns.
- Use as a tool to query consume and navigate to specific data.
- Use if there are at least two or more columns of data parameters.
- Ensure that the column headers are relevant to the data it represents and are succinct.
- Include rich content in the cell data to support the specific requirements of the application use cases.
- Enable sorting of columns in ascending or descending order with an arrow icon to indicate the order direction.
- Ensure that the table is responsive and stretches to the full available width.
- Include a table caption describing the contents of the table for accessibility
- Use the built-in scroller for horizontal scrolling on mobile viewports.

### Don't:

- Don't use for non-structured data or data that can be presented in a simpler format.
- Don't overuse or clutter cell data with unnecessary content.
- Don't neglect to include a table caption for accessibility purposes.

## Accessibility support

### Keyboard

| Key / state | Function |
| --- | --- |
| `Tab`, `Shift-Tab` | Moves focus to the next (or previous) sort button. |
| `Enter`, `Space` | Changes sorting direction. |

### ARIA enhancements

#### Internal **ARIA** that is managed by the component:

| ARIA | Usage |
| --- | --- |
| `aria-label="STRING"`, `aria-labelledby="IDREF"` | Captions are provided by aria labels. |
| `aria-sort="VALUE"` | Provides the sorting direction of the column header. |

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
| Screen reader (VoiceOver, NVDA) | 🟠 (Partially supported, [Safari issues 1](https://adrianroselli.com/2022/07/its-mid-2022-and-browsers-mostly-safari-still-break-accessibility-via-display-properties.html), [Safari issues 2](https://adrianroselli.com/2018/02/tables-css-display-properties-and-aria.html)) |

## API

Authoritative API data: `../meta` (`component-meta`). When these tables disagree with it, follow `component-meta`.

### Properties

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `caption` | `string` | `undefined` | Sets a screen-reader-only accessible caption that describes the table's content; it is not visible in the browser. Use an element with `slot="caption"` for a visible caption instead. |
| `compact` | `boolean` | `false` | Reduces the cell padding and spacing for a more condensed table layout in data-dense UIs. |
| `layout` | `'auto'` `'fixed'` | `'auto'` | Controls the CSS `table-layout` algorithm: `auto` sizes columns to fit their content, `fixed` distributes width equally. |
| `sticky` _(experimental)_ | `boolean` | `false` | @experimental Makes the scroll position indicator sticky at the viewport edge while scrolling, indicating overflow in the table. |

### Events

| Event | Type | Description |
| --- | --- | --- |
| `update` | `CustomEvent<TableUpdateEventDetail>`<br>`{ id: string; active?: boolean; direction?: Direction }` | Emitted when the user clicks a sortable column header, carrying the new sort configuration in the event detail. |

### Slots

| Slot | Required | Allowed tag names | Description |
| --- | --- | --- | --- |
| `caption` | no | — | Shows a caption that describes the content of the table. |
| _(default)_ | no | — | Default slot for the table content. |

### CSS Variables

| CSS Variable | Default | Description |
| --- | --- | --- |
| `--p-table-scroll-indicator-top` | `0px` | Defines the distance from the top of the viewport at which the scroll indicator sticks when scrolling down and `sticky` is enabled. |
| `--p-table-scroll-indicator-bottom` | `0px` | Defines the distance from the bottom of the viewport at which the scroll indicator sticks when scrolling up and `sticky` is enabled. |

## Sub-components

These tags are only valid inside the parent(s) listed under each one — often this component, but some are shared and list a different parent (e.g. a tag documented here via a common ancestor). Their APIs come from the same authoritative `component-meta` as the parent above.

### `p-table-body`

Allowed parent: `p-table`.

#### Slots

| Slot | Required | Allowed tag names | Description |
| --- | --- | --- | --- |
| _(default)_ | no | — | Default slot for the table body content. |

### `p-table-cell`

Allowed parent: `p-table-row`.

#### Properties

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `multiline` | `boolean` | `false` | Allows slotted text to wrap onto multiple lines instead of being forced onto a single line. |

#### Slots

| Slot | Required | Allowed tag names | Description |
| --- | --- | --- | --- |
| _(default)_ | no | — | Default slot for the table cell content. |

### `p-table-head`

Allowed parent: `p-table`.

#### Slots

| Slot | Required | Allowed tag names | Description |
| --- | --- | --- | --- |
| _(default)_ | no | — | Default slot for the table head content. |

### `p-table-head-cell`

Allowed parents: `p-table-head-row`, `p-table-row`.

#### Properties

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `hideLabel` | `boolean` | `false` | Hides the visible column label while keeping it accessible to screen readers. Only applies when `sort` is not set. |
| `multiline` | `boolean` | `false` | Allows the column header text to wrap onto multiple lines instead of being truncated to a single line. |
| `sort` | `TableHeadCellSort` | `undefined` | Configures sorting behavior for this column by providing an `id`, `active` state, and current `direction` (`asc` or `desc`). |

#### Slots

| Slot | Required | Allowed tag names | Description |
| --- | --- | --- | --- |
| _(default)_ | no | — | Default slot for the table head cell content. |

### `p-table-head-row`

Allowed parent: `p-table-head`.

#### Slots

| Slot | Required | Allowed tag names | Description |
| --- | --- | --- | --- |
| _(default)_ | no | — | Default slot for the table head row content. |

### `p-table-row`

Allowed parents: `p-table-body`, `p-table-head`.

#### Slots

| Slot | Required | Allowed tag names | Description |
| --- | --- | --- | --- |
| _(default)_ | no | — | Default slot for the table row content. |

## Examples

| Example | When to use | File |
| --- | --- | --- |
| Default | Minimal default configuration. | [./examples/Default.html](./examples/Default.html) |
| Caption via Property | A caption that describes the content of the table is mandatory to fulfill accessibility criteria. | [./examples/CaptionProperty.html](./examples/CaptionProperty.html) |
| Caption via Slot | Instead of using the the property, the table's caption can be provided via the `caption` slot. | [./examples/CaptionSlot.html](./examples/CaptionSlot.html) |
| Layout: fixed | By setting `layout` to `fixed`, you can take full control over each column width, which would otherwise be controlled by its content. | [./examples/LayoutFixed.html](./examples/LayoutFixed.html) |
| Sortable Columns | The `p-table`'s column headers can be configured by setting properties on each `p-table-head-cell`. | [./examples/Sorting.html](./examples/Sorting.html) |
| Hide Column Label | Sometimes you want to hide the visible label of a `p-table-head-cell`, for example when the column's content is self-explanatory. | [./examples/HideLabel.html](./examples/HideLabel.html) |
| Advanced Table | The appearance of a table's contents can be customized as illustrated in the following example. | [./examples/Advanced.html](./examples/Advanced.html) |
