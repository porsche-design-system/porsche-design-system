# p-pagination

To adapt the pagination to the specific viewport context, the amount of displayed page items varies between either `7` (desktop/tablet) or `5` (mobile). The components handles responsive viewport sizing by default.

## Usage

The following section provides guidance for designers and developers on how to use this component in different situations.

### Do:

- Use when splitting large content into multiple pages.
- Use to provide information on the number of pages available.
- Use to show the current page position.
- Use pagination to allow the user to navigate between the pages.
- Display an ellipsis ("...") for a range of pages if there are at least 6 or 8 pages.
- Place the pagination centered beneath the related content.

### Don't:

- Don't use unnecessarily for small amounts of content.
- Don't use without providing information on the total number of pages available.
- Don't use without showing the current page position.
- Don't use without the option for the user to navigate between pages.
- Don't place the pagination in an unrelated or confusing position.

## Accessibility support

### Keyboard

| Key / state | Function |
| --- | --- |
| `Tab`, `Shift-Tab` | Moves focus to the next (or previous) focusable element. |
| `Enter`, `Space` | Activates the item. |

### ARIA enhancements

#### Internal **ARIA** that is managed by the component:

| ARIA | Usage |
| --- | --- |
| `aria-current` | Exposes the current state of the item. |

#### External **ARIA** provided by the `intl` property:

| ARIA | Usage |
| --- | --- |
| `aria-label` | Defines a string value that labels the navigation and interactive elements. |

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
| `activePage` | `number` | `1` | Sets the one-based index of the currently active page; update this prop to navigate programmatically. |
| `intl` | `PaginationInternationalization` | `{"root":"Pagination","prev":"Previous page","next":"Next page","page":"Page"}` | Overrides the default ARIA label strings used for the previous, next, and page number buttons to support localisation. |
| `itemsPerPage` _(required)_ | `number` | `1` | Sets the number of items displayed per page, used together with `totalItemsCount` to compute the page count. |
| `showLastPage` | `boolean` | `true` | Shows or hides the button that jumps directly to the last page of the pagination. |
| `totalItemsCount` _(required)_ | `number` | `1` | Sets the total number of items in the dataset, used to calculate the number of pages. |

### Events

| Event | Type | Description |
| --- | --- | --- |
| `update` | `CustomEvent<PaginationUpdateEventDetail>`<br>`{ page: number; previousPage: number }` | Emitted when the user navigates to a different page, carrying the new `activePage` index in the event detail. |

### Controlled properties

- `activePage` — a controlled prop, but the component also updates it internally. Listen for the `update` event to observe changes; you do not have to write the value back.

## Examples

| Example | When to use | File |
| --- | --- | --- |
| Default | Minimal default configuration. | [./examples/Default.html](./examples/Default.html) |
