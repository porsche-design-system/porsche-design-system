# Text Field

Use text fields in forms to help people enter, select, and search for text. Text fields are normally found within a form but can also be part of a modal, search, or card. Common text input types include: usernames, descriptions, URLs, emails, addresses, and plain text searches.

---

## Available variants

In order to provide an optimal user guidance within a page, different types of text fields are 
available:

### 1. Label only

Use label only if the user is aware that these are only mandatory fields. For example a login form - containing only one field username and one field password.

### 2. Required label

Use required label if the form has only a few mandatory fields and mark them with an asterisk next to the label. 

### 3. Optional label

Use optional label if the form has only a few optional fields, mark them with "(optional)" next to the label. 

---

## Text fields states

All text fields types are available in the following states:

| STATE | DESCRIPTION |
|----|----|----|
| default | Default text field state.|
| disabled | Whenever the text field function is not available, it is indicated by a greyed-out text field color. |
| hover | In hover state, the icons color changes in red. |
| error |  Indicates the incorrect input with a real time validation including an icon and error text. | 
| success | Indicates the correct input with a real time validation including an icon and success text. | 
| active/focus | In active or focus state, the border color changes slightly and gets a bit thicker. |

---

## Content

The text Field always contains the following sub-components:

- **Label**
Labels should be title case and ≤ 20 characters.
- **Placeholder text** 
Use placeholder text to give a concrete example of what you should write. For example, for formatted fields such as date of birth.
- **Help text**
If a help text is required, it is displayed with the info icon. This will be displayed by mouseover in a tooltip.
- **Icon**
Icons in text fields are optional. Icon signifiers can describe the type of input a text field requires, and be touch targets for nested components. For example, a calendar icon may be tapped to reveal a date picker.

---

## Usability & interaction

### Width

Text fields don’t have a specific width, depending on the layout you can set the width either depending on the text length or by adjusting to grid. For input fields with icon, a minimum spacing of 18 px between text and icon must always be ensured. Just pick your preferred text field, make a text override and set the width manually. The initial width is set to 322 px (equals grid width on 375 px).

### Clickability

The entire text field is clickable. The clickability is indicated by the focus state and the hover state on the icon (if one exists).

### Disabled state

All types of Text field are available as disabled state. However, disabled states (e.g. read only) should be avoided whenever possible, as they always tend to disrupt the user and break the user flow. Keep in mind: “The best way [to] prevent user error is to make sure that the use cannot make errors in the first place (…).” (Donald A. Norman, 2002)