# Select
 
Use a Select to allows the user to search through a large list of choices and choose one item at a time, similarly to radio buttons. 
Select components are more compact allowing users to save space and prevent from entering erroneous data, since they only show legal choices.
 
---

## Types
 
In order to provide an optimal user guidance within a page, different types of Selects are 
available:
 
### 1. Default 
 
Use default select especially within a form without any context around.
 
!!! EXAMPLE !!!

### 2. Pure (without label)
 
Use Pure (without label) only if a separate description is intended, e.g. within copytext.
 
!!! EXAMPLE !!!
 
---

## States
 
All Selects are available in the following states:

* default
* disabled
* focus
* read only
* error
* success

 
---
 
## Content

- **Label**
Label text (≤ 20 characters) is used to inform users as to what information is requested for a Select. Every Select should have a label. !!! TBD !!!

- **Select suffix**
Indicates there are options to choose from.

- **Validation message**
Validation text for a select is placed right below the field box (≤ 90 characters). This places the error next to the offending select, 
so there is no confusion for the user as to what field failed validation. Effective error messaging can help the user to understand the problem and how to fix it.

--- 
 
## Usage
 
### Selection
Use a default selection, if possible or a placeholder option, such as “Select…” if no default is available.
 
### Prompt Text
Keep the prompt text in view while the select list is open. The selection description, reminds the user what he has just selected.

### Sorting
Use common sort order for menu items (Frequency of use, alpha or numeric).

### Disabled State
All Selects are provided in disabled state. However, disabled states should be avoided whenever possible, as they always tend to disrupt the user and break the user flow.
 
!!! EXAMPLES !!!

## Don'ts
 
### Items
Don´t include too many items whenever possible. If you have many items, consider alternative ways of presenting them.

### Content
Avoid select boxes for data that is highly familiar such as the day, month, or year. Having to find these options in a long menu is tedious, breaks the previous guideline, and can create even more work for users.

### Length
Very long select boxes that require scrolling make it impossible for users to see all their choices in one glance.

### Purpose
Avoid select boxes when typing may be faster.

--- 
 
## Related Components

* [Text Field](#/web/components/form/text-field)
* [Textarea](#/web/components/form/textarea)
* [Checkbox](#/web/components/form/checkbox)
* [Radio Button](#/web/components/form/radio-button)