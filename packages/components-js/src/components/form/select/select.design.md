# Select
 
Use a Select dropdown to allows the user to search through a large list of choices and choose one item at a time, similarly to radio buttons. 
Select components are more compact allowing users to save space and prevent from entering erroneous data, since they only show legal choices.
 
---

### Types
 
The types of Select elements that are available for the Porsche UI Kit:
 
- **Selection** A dropdown can be used to select between choices in a form.
- **Search Selection** A selection dropdown can allow a user to search through a large list of choices.

---
 
## States
 
All Selects are available in the following states:

* default
* disabled
* focus
* read only
* error
 
---
 
## Content

- **Headings**
!!! TBD !!!

--- 

### Labels
 
- Consider adding text to the field, such as ‘Select one’ to help the user recognize the necessary action
- Use sentence-style capitalization
- Write the label so that it describes the selected item of the dropdown
- Describe just the option with the label
- Keep labels brief so it's easy to refer to them in messages and documentation
 
---
 
## Usage
 
Select dropdowns have several usage patterns and a variety of different purposes, including:
 
### Command menus
Which initiate an action based on the selected option

### Navigation menus
Which take users to a new location

### Form filling
Which lets users select an option to enter into a form field

### Attribute selection
which lets users choose a value from a menu of possible values
 
---
 
## Do's
 
- **Gray out any unavailable options** instead of removing them. Items that cannot b­­e selected should remain in view.
- **Support keyboard input** to navigate within a dropdown.
- **Keep the menu label or description in view when the dropdown is open.** Menu titles provide scope and direction by reminding users what they are choosing.
 

## Don'ts
 
- Don´t include too many items whenever possible. If you have many items, consider alternative ways of presenting them.
- Avoid dropdown boxes for data that is highly familiar such as the day, month, or year. Having to find these options in a long menu is tedious, breaks the previous guideline, and can create even more work for users.
- Very long dropdowns** that require scrolling make it impossible for users to see all their choices in one glance.
- Avoid dropdown boxes when typing may be faster.
- Alphabetical ordering** isn't recommended because it is language dependent, and therefore not localizable.
 
### Examples

!!! EXAMPLES !!!
 
Make sure you have choosen the right component for the corresponding content.
 
Keep enough space between each Select component. Use correct spacings according to the 8 px system.
 
Do not position Select dropdowns displaced.
 
Both vertical and horizontal alignment is possible.
 
---
 
## Usability & Interaction
 
### Clickability
 
The Select dropdown can be opened by clicking on the 'arrow bottom' icon . The clickability is indicated by the hover state. When selected, the font style of the selected item changes from regular to bold.
 
### Disabled State
 
All Selects are provided in disabled state. However, disabled states should be avoided whenever possible, as they always tend to disrupt the user and break the user flow.