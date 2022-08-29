# Scroller

<TableOfContents></TableOfContents>

## Usage

## When to use

When a single element or a group of elements in a row does not fit into the viewport width, the scroller enables
horizontal scrolling without moving elements to the next row below.

---

## Types

To ensure a seamless UX in all Porsche web applications it is recommended to use the Modal as follows

| Variant               | Usage                                                                             |
| --------------------- | --------------------------------------------------------------------------------- |
| Basic                 | To make an element(s) that fit not into the viewport width horizontal scrollable. |
| Scroll Indicator Size | For larger element(s) the icon can be adjusted in size to be more visible.        |
| Surface               | If the component is used on the surface background.                               |

### Size

A scroller has a minimum height of 24px. Smaller elements within the component are supported.

### Layout

A scroller should only contain elements of the same type, appearance, and function to give the user a better idea of
what to expect when scrolling. All elements are horizontally aligned.

### Amount

A scroller can contain one (such as a table) or more elements (filter chips). All elements should be focusable.

### Content

Keep in mind that with a high amount of elements within the scroller, elements on the far right might be not seen or
missed by the user. Therefore no important actions or information for the customer flow should be placed within the
scroller. Text that shouldn't linebreak is also not recommended within the component.

### Responsive

Elements within a scroller are not affected by breakpoints and viewport size.

## Components that feature the scroller

- [Tabs](components/tabs)
- [Table](components/table)
- [Stepper](components/stepper-horizontal)
