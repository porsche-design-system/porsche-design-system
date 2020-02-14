# Radio Button
 
Use a Radio Button to allows the user to choose/select only one of a predefined set of mutually exclusive options.
In a group of radio buttons should be selected one option by default. However, there is an exception if the pre-selection of an option can lead to wrong assumptions, i.e. "Male" or "Female". In this case no option should be selected by default.
.

---
 
## Variants
 
### 1. Default
EXAMPLE
 
### 2. Checked
EXAMPLE
 
---
 
## States
All Radio Buttons are available in the following states:
* default
* checked
* disabled
* focus
* error
 
---
 
## Content
 
The Radio Button can contain the following sub-components:
 
- **Headings**
XY
 
- **Label**
Label text (≤ 20 characters) is used to inform users as to what information is requested for a Radio Button. Every Radio Button should have a label.
 
---
 
## Usage
 
### Single-selection control
The singular property of a radio button makes it distinct from a checkbox, which allows more than one (or no) item to be selected and for the unselected state to be restored. As soon as two options are mutually exclusive, a radio button is used.

### Disabled states
All types of Radio Buttons are available in disabled state. However, disabled states should be avoided whenever possible, as they always tend to disrupt the user and break the user flow. Keep in mind: "The best way [to] prevent user error is to make sure that the use cannot make errors in the first place (…)." (Donald A. Norman, 2002)
 
!!! EXAMPLES !!!
 
---
 
## Don'ts
 
- Use for a large number of items (≥ 7 items) a select component instead.
- Don't align radio buttons horizontally as it is more difficult to scan.
- Avoid using a radio button as a single choice.
 
!!! EXAMPLES !!!
 
---
 
## Related components
 
### Checkboxes
 
**Checkboxes** are used when there are lists of options and the user may **select any number** of choices, including zero, one, or several. In other words, each Checkbox is independent of all other Checkboxes in the list, so checking one box doesn't uncheck the others.
 