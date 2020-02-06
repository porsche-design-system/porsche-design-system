# Text Field
 
Use Text Fields in forms to help people enter and select text. Text Fields are normally found within a form but can also be part of a modal search, or card. Text Fields should be always accompanied by labels.
 
---
 
## Types
 
In order to provide an optimal user guidance within a page, different types of Text Fields are 
available:
 
### 1. Label only
 
Per default use label only if the user is aware that these are only mandatory fields. For example a login form - containing only one field username and one field password.
 
<p-text-field-wrapper label="Some label"><input type="text" name="some-name"></p-text-field-wrapper>
 
### 2. Required label
 
Use required label if the form has only a few mandatory fields and mark them with an asterisk next to the label and mention near the form that asterisks indicate required fields.
 
<p-text-field-wrapper label="Some label*"><input type="text" name="some-name"></p-text-field-wrapper>
 
### 3. Optional label
 
Use optional label if the form has only a few optional fields, mark them with "(optional)" next to the label.
 
<p-text-field-wrapper label="Some label (optional)"><input type="text" name="some-name"></p-text-field-wrapper>

### 4. Pure (whitout label)
 
Use Pure only for a dedicated use where the need for a stringing of fields is necessary, e.g. for a two-factor authentication.
 
<p-text-field-wrapper label="Some label" hide-label="true"><input type="text" name="some-name"></p-text-field-wrapper>
 
---
 
## Variantes
 
### 1. Placeholder
 
Placeholder text disappears when a user types in the input. If a user doesn’t enter a value and moves to another part of a form, the placeholder text reappears in the former text box. But we don't recommend to use placeholder text it since users can misinterpret it as final content.
 
<p-text-field-wrapper label="Some label"><input type="text" name="some-name" placeholder="Some placeholder text"></p-text-field-wrapper>
 
### 2. Password
 
In password fields, when a user starts typing display a password show icon and password hide icon on press.
 
<p-text-field-wrapper label="Some label"><input type="password" name="some-name"></p-text-field-wrapper>
 
### 3. Read only
 
Use a read-only Text Field only if you want your input to be read only and not edited.
 
<p-text-field-wrapper label="Some label"><input type="text" name="some-name" value="Some value" readonly="readonly"></p-text-field-wrapper>
 
### 4. Error
 
<p-text-field-wrapper label="Some label" state="error" message="Some error validation message."><input type="text" name="some-name"></p-text-field-wrapper>
 
### 5. Success
 
<p-text-field-wrapper label="Some label" state="success" message="Some success validation message."><input type="text" name="some-name" class=""></p-text-field-wrapper>
 
---
 
## States
 
All Text Fields types are available in the following states:
 
* default 
* disabled 
* read only
* hover
* focus
* error 
* success
 
---
 
## Validation
 
Real-time field-level validation appears as needed. One example is email validation.
When an error occurs, the outline of the field turns red & text appears under of the Text Field.
 
---
 
## Content
 
The Text Field can contains the following sub-components:
 
- **Label**
Label text (≤ 20 characters) is used to inform users as to what information is requested for a Text Field. Every Text Field should have a label.
- **Placeholder text**
Use placeholder text to give a concrete example of what you should write. For example, for formatted fields such as date of birth.
- **Icon**
Icons in Text Fields are optional. Icon signifiers can describe the type of input a Text Field requires, and be touch targets for nested components.
- **Validation message**
Validation text for a field is placed right below the field box (≤ 90 characters). This places the error near next to the offending field, so there is no confusion for the user as to what field failed validation. Effective error messaging can help the user to understand the problem and how to fix it.
 
---
 
## Usage
 
### Width
 
Text Fields don’t have a specific width, depending on the layout you can set the width either depending on the text length or by adjusting to grid. However the initial width is set to 320 px (equals grid width on 375 px). For Text Fields with icon, a minimum spacing of 12 px between text and icon must always be ensured. Just pick your preferred Text Field, make a text override and set the width manually.
 
### Clickability
 
The entire Text Field is clickable. The clickability is indicated by the focus state and the hover state on the icon (if one exists).
 
### Disabled state
 
All types of Text Field are available as disabled state. However, disabled states (e.g. read only) should be avoided whenever possible, as they always tend to disrupt the user and break the user flow. Keep in mind: “The best way [to] prevent user error is to make sure that the use cannot make errors in the first place (…).” (Donald A. Norman, 2002)
 