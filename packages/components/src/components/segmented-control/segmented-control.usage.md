# Segmented control

<TableOfContents></TableOfContents>

## When to use
A segmented control presents a set of selectable options at once. The users can make a single selection from 2-5 short and consistent options. For other use cases, consider using Radio Button, Checkbox, or Select.
 • Use them over other selection controls to reduce cognitive load. 
 • Do not use them to filter or navigate content (use Tabs instead).
 • For more than 5 option use the [Select](components/select) component.
 • For less than 2 option use the [Switch](components/switch) component.
 • For inconsistent option values use the [Radio Button](components/radio-button) component.

---

## Types

To ensure a seamless UX in all Porsche web applications it is recommended to use the Button as follows

| Types | Usage |
|----|----|
| Default | For short and consistent text only values. |
| Value + Icon | To improve visual recognition the option value can be paired with an icon. |
| Icon only | Options can only be used with icons when the icon and context are really clear. We recommend always using a label. |
| Label | To add more clarity to the shown options a label can be added. |

| Variants | Usage |
|----|----|
| Preslection | If the selection of a value is necessary by default. |
| No preselection | If the user needs to select a value to see a relevant result. |
| Horizontal layout | Options will be placed in a row and wrapped on smaller viewports. |
| Vertical layout | Options will be staked. |


## Usage

### Values

Use short and consistent values for each option for visual rhythm and easy scanning. The component can handle multiline content, but this should be rather avoided!

### Units

When consistent add a short indication for the unity (such as km, €, %, or $) to each option to improve readability.

### Layout

Values will be laid out horizontally in a row by default. On smaller view-ports options will wrap in the next row. There is also the possibility to place all options horizontally.



## Related components
* [Select](components/select)
* [Switch](components/switch)
* [Radio Button](components/radio-button)
