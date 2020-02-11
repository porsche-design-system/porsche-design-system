# Checkbox

Use a Checkboxe for a list of options that allow the user to make choices. The choice of one or several options (checked state) or no option (unchecked state). Each checkbox has a label and is independent of all other checkboxes in the list. Checking one box doesn't uncheck the others. By default checkboxes are not selected.

---

## Variants

### 1. Default
EXAMPLE

### 2. Active
EXAMPLE

### 3. Undefined
EXAMPLE

---

## States
 
All Checkboxes types are available in the following states:
 
* default 
* activ
* undefined 
* disabled 
* focus
* error 

---

## Content

The Checkbox can contain the following sub-components:

- **Checkbox**
XY

- **Label**
XY

Label every Checkbox
Use sentence-style capitalization
Write the label so that it describes the selected state of the Checkbox.
For a group of Checkboxes, use parallel phrasing and try to keep the length about the same for all labels.
Describe just the option with the label. 
Keep labels brief so it's easy to refer to them in messages and documentation.

---

## Usage

Checkboxes have several usage patterns:

### individual choice
A single checkbox is used to select an individual choice.

### Independent choices (zero or more)
A group of Checkboxes is used to select from a set of zero or more choices. (Unlike single-selection controls such as Radio Buttons, users can select any combination of options in a group of Checkboxes.)

### Dependent choices (one or more)
A group of Checkboxes can also be used to select from a set of one or more choices.  Error is displayed when none of the options are selected. A group of Checkboxes is used where at least one protocol must be selected. 

### A stand-alone Checkbox
is used for a single option that the user can turn on or off.

---

## Usability & Interaction

### Clickability

The whole Checkbox area is clickable. The clickability is indicated by a specific hover state (slightly changing color).

### Disabled State

All Checkboxes are provided in disabled state. However, disabled states should be avoided whenever possible, as they always tend to disrupt the user and break the user flow. 

---

## EXAMPLES

---

## Don'ts

---

## Related components 

### Radio Buttons

**Radio Buttons** are used when there is a list of two or more options that are **mutually exclusive** and the user must select exactly one choice. In other words, clicking a non-selected Radio Button will deselect whatever other button was previously selected in the list.

