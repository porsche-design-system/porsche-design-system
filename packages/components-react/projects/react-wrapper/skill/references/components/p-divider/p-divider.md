# p-divider

The `p-divider` is used as 'horizontal or vertical rule' and displays a dividing line. The component is self-closing. Slotted content between the component tags won't be displayed.

## Usage

### Do:

- Use to create a visual separation between related sections of content.
- Use to separate content into clear groups.
- Use when other options for structuring content are not sufficient.

### Don't:

- Don't use dividers to structure content, rather work with more space for clustering
- Don't use it for decorative purposes unless it's necessary.
- Avoid full-bleed dividers to separate page sections.

## Accessibility support

This component does not include any special accessibility features.

## API

### Properties

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `color` | `'contrast-lower'` `'contrast-low'` `'contrast-medium'` `'contrast-high'` | `'contrast-lower'` | Sets the color of the divider line using PDS contrast tokens. |
| `direction` | `'vertical'` `'horizontal'`<br>`BreakpointCustomizable<DividerDirection>` | `'horizontal'` | Sets the orientation of the divider to `horizontal` or `vertical`. Supports responsive breakpoint values. |

## Examples

| Example | When to use | File |
| --- | --- | --- |
| Default | Minimal default configuration. | [./examples/Default.tsx](./examples/Default.tsx) |
| Vertical | **Hint:** The component has not an implicit vertical height unless we set a container which provides it or define the height on the component itself. | [./examples/Vertical.tsx](./examples/Vertical.tsx) |
| Responsive | You can change the divider's direction by using different major breakpoints `xs`, `s`, `m`, `l`, `xl`. | [./examples/Responsive.tsx](./examples/Responsive.tsx) |
