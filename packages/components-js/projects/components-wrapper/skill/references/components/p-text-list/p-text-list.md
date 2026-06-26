# p-text-list

The `p-text-list` component is used to display listed data in form of an unordered or ordered list. A list depends on two parts (like any native HTML list): A list wrapper which defines the type of the list (unordered or ordered) and the list items. Nesting is also provided and follows the same nesting rules like native HTML lists. For more complex data you should consider the use of a data table.

## Usage

The following section provides guidance for designers and developers on how to use this component in different situations.

### Do:

- Use to display short pieces of information in the form of an unordered or ordered list.
- Use an Unordered List to display content with equal value and an Ordered List for sequenced content.
- Arrange list items in a logical way such as from highest to the lowest level. If necessary split the content into smaller and more specific categories and group them.
- Stick to a homogeneous writing structure and style within one list.
- Use sentence-style capitalization for each list item capitalizing only the first letter.

### Don't:

- Don't exceed two hierarchy levels in Text Lists.
- Don't mix active with passive voice or declarative with imperative sentences within one list.

## Accessibility support

This component does not include any special accessibility features.

## API

Authoritative API data: `../meta` (`component-meta`). When these tables disagree with it, follow `component-meta`.

### Properties

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `type` | `'unordered'` `'numbered'` `'alphabetically'` | `'unordered'` | Sets the list type to either `unordered` (bulleted) or `ordered` (numbered), controlling the rendered HTML element (`ul` vs `ol`). |

### Slots

| Slot | Required | Allowed tag names | Description |
| --- | --- | --- | --- |
| _(default)_ | no | — | Default slot for the `p-text-list-item` tags or nested `p-text-list` tags. |

## Examples

| Example | When to use | File |
| --- | --- | --- |
| Default | Minimal default configuration. | [./examples/Default.html](./examples/Default.html) |
