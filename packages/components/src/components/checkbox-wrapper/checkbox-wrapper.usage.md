# Checkbox

<TableOfContents></TableOfContents>

## Usage

The following segment provides instructions for designers and developers regarding the appropriate utilization of this
component in various situations.

### Do:

- Use for a list of options when you want the user to select one, none, or multiple options.
- Use when an explicit action is required to apply to settings.
- Use the default view for checkboxes when no option is selected.
- Use the indeterminate state only as a visual state and not as a direct user interaction.
- Nest when a parent and child relationship is needed.
- Use short and descriptive label text for each checkbox option.
- Provide validation messages for each checkbox option if needed.
- Set vertically left-aligned for better scannability.

### Don't:

- Avoid using when you have more than 8 options to choose from or consider using a [Select](components/select).
- Don't mix [Radio Button](components/radio-button) buttons with checkboxes.
- Don't change the selection of another checkbox when a nested one is clicked. The only exception is when a checkbox is
  used to make a bulk selection of multiple items.

---

## Related Components

- [Radio Button](components/radio-button)
- [Select](components/select)
