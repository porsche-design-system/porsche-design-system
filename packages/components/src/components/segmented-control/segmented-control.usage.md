# Segmented control

<TableOfContents></TableOfContents>

## When to use

A segmented control presents a set of selectable options at once. The users can make a single selection from 2-5 short
and consistent options. For other use cases, consider using Radio Button, Checkbox, or Select.

• Use them over other selection controls to reduce cognitive load.  
• Do not use them to filter or navigate content (use Tabs instead).   
• For more than 5 option use the [Select](components/select) component.  
• For less than 2 option use the [Switch](components/switch) component.   
• For inconsistent option values use the [Radio Button](components/radio-button) component.

---

## Types

To ensure a seamless UX in all Porsche web applications it is recommended to use the `p-segmented-control` as follows

| Variants | Usage |
|----|----|
| Default | For short and consistent text only values. |
| Value + Icon | To improve visual recognition the option value can be paired with an icon. |
| Icon only | Options can only be used with icons when the icon and context are really clear. We recommend always using additional text. |
| Label | To add more clarity to the shown options a label can be added. |
| Preselection | If the selection of a value is necessary by default. |
| No preselection | If the user needs to select a value to see a relevant result. |

## Usage

### Values

Use short and consistent values for each option for visual rhythm and easy scanning. When the maximum width is exceeded,
the component will be multiline, but this should be avoided!

### Units

When consistent add a short indication for the unity (such as km, €, %, or $) to each option to improve readability.

### Layout

The items will be laid out horizontally in a row by default, using the available space. On smaller view-ports options
will wrap onto the next row. Every item has the same width, which is defined by the item with the longest content upon
to a maximum width.

## Related components

* [Select](components/select)
* [Switch](components/switch)
* [Radio Button](components/radio-button)
