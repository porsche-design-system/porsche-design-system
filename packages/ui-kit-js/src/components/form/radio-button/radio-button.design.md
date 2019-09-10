# Radio Button

A Radio Button is a graphical control element that allows the user to choose only one of a predefined set of mutually exclusive options.
Radio Buttons are activated by default. 

The Radio Button component is available for both Porsche Light and Dark Theme.

---

## Types

There are two available variants for Radio Buttons:

**1. unselected**  

**2. selected** 

---

## Options

Radio Buttons are shown as ○ when unselected, or ● when selected.

---

## States

Radio Buttons are available in the following states:

| STATE | DESCRIPTION |
|----|----|----|
| active | Radio Buttons are activated by default.|
| hover | In hover state, the (outline color changes slightly and gets a bit brighter.|
| disabled | Whenever the radio button is not available, it is indicated by a greyed-out color.|
| loading | Indicates the loading process when clicking on the text link, the icon is replaced by a small loading spinner. |
| focus | In focus state, the Radio Button takes the focus color.|

---

## Content

### Labels

- Use sentence-style capitalization
- Write the label so that it describes the selected state of the Radio Button.
- For a group of Radio Buttons, use parallel phrasing and try to keep the length about the same for all labels.
- Describe just the option with the label.
- Keep labels brief so it's easy to refer to them in messages and documentation.
 
---

## Usage Pattern

The singular property of a Radio Button makes it distinct from a Checkbox.

- **single-selection control**. As soon as two options are mutually exclusive, a radio button is used.

---

## Best Practices

### Do's

- **List Radio Buttons in a logical order**, such as grouping highly related options together or placing most common options first, or following some other natural progression. 
- **Align Radio Buttons vertically**, not horizontally. Horizontal alignment is harder to read.

### Don'ts
- **A list of Radio Buttons has to be consistent.** Don´t use subheadings that break the list up.
- **Reconsider using Radio Button groups.** Organizing groups of Radio Buttons often results in unnecessary screen clutter.
- **Alphabetical ordering** isn't recommended because it is language dependent, and therefore not localizable.

---

## Usability & Interaction

### Clickability

The whole Radio Button area is clickable. The clickability is indicated by a specific hover state (slightly changing color).

### Disabled State

All Radio Buttons are provided in disabled state. However, disabled states should be avoided whenever possible, as they always tend to disrupt the user and break the user flow. 

---

## Related components 

### Checkboxes

**Checkboxes** are used when there are lists of options and the user may **select any number** of choices, including zero, one, or several. In other words, each Checkbox is independent of all other Checkboxes in the list, so checking one box doesn't uncheck the others.

---

<p-text variant="small">placeholder footnote</p-text>