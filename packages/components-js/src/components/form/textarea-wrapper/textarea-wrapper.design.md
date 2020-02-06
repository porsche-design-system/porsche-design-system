# Textarea
 
Use Textareas in forms to help people enter and select text. Textareas are normally found within a form but can also be part of a modal search, or card. Textareas should be always accompanied by labels.
 
---
 
## Types
 
In order to provide an optimal user guidance within a page, different types of Textareas are 
available:
 
### 1. Label only
 
Per default use label only if the user is aware that these are only mandatory area.
 
EXAMPLE
 
### 2. Required label
 
Use required label if the form has only a few mandatory areas and mark them with an asterisk next to the label and mention near the form that asterisks indicate required areas.
 
EXAMPLE
 
### 3. Optional label
 
Use optional label if the form has only a few optional areas, mark them with "(optional)" next to the label.
 
EXAMPLE

### 4. Pure (without label) TBD

Use Pure only for a dedicated use where the need for a stringing of fields is necessary, e.g. XY
 
---
 
## Variantes
 
### 1. Placeholder
 
Placeholder text disappears when a user types in the input. If a user doesn’t enter a value and moves to another part of a form, the placeholder text reappears in the former text box. But we don't recommend to use placeholder text it since users can misinterpret it as final content.
 
EXAMPLE
 
### 2. Read only
 
Use a read-only Textarea only if you want your input to be read only and not edited.
 
EXAMPLE
 
---
 
## States
 
All Textareas types are available in the following states:
 
* default 
* disabled 
* read only
* focus
 
---
 
## Content
 
The Textarea can contains the following sub-components:
 
- **Label**
Label text (≤ 20 characters) is used to inform users as to what information is requested for a Textarea. Every Textarea should have a label.
- **Placeholder text**
Use placeholder text to give a concrete example of what you should write.
 
---
 
## Usage
 
### Width and height
 
Textarea don’t have a specific width and height, depending on the layout you can set the size either depending on the text length or by adjusting to grid.
However the initial width is set to 320 px and 192 px height (equals grid width on 375 px). Just pick your preferred Textarea, make a text override and set the size manually.
 
### Clickability
 
The entire Textarea is clickable. The clickability is indicated by the focus state.
 
### Disabled state
 
All types of Textarea are available as disabled state. However, disabled states (e.g. read only) should be avoided whenever possible, as they always tend to disrupt the user and break the user flow. Keep in mind: “The best way [to] prevent user error is to make sure that the use cannot make errors in the first place (…).” (Donald A. Norman, 2002)
 