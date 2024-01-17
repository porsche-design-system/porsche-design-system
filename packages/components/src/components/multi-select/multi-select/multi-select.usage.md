<ComponentHeading name="Multi Select"></ComponentHeading>

<TableOfContents></TableOfContents>

## Usage

The following segment provides instructions for designers and developers regarding the appropriate utilization of this
component in various situations.

### Do:

- Use to search and select one or more options from a list.
- Use to trigger an action based on a selected option or options.
- Use with label for better accessibility whenever possible.
- Use descriptive label text for screen readers when label hidden.
- Use without label only if the context clearly describes what the component is to be used for and no further
  explanation is required.
- Use description text to provide further information that is helpful for the user.
- Use without a preselection (mandatory field) by default when no other data is available.
- Use without a preselection (optional field) to make it possible to go back to an empty default.
- Use with a preselection (mandatory field) if you know a specific selection is desired by the user or a previous step
  requires a selection or in case of a predictive journey.
- Use as a mandatory field when a selection of one or more options is necessary to proceed.
- Use 'dropdown direction' to adjust the flyout's direction to improve the experience.
- Use 'validation states' error or success to give feedback on the selection.
- Use common sort order for menu items (frequency of use, alpha or numeric).

### Don't:

- Don't use very long option texts.
- Don’t use it for less than 6 options (otherwise use Checkboxes).
- Don’t exceed maximum width so the option labels turn multiline.
- Don't use the same option value twice.
- Don't use the same option text twice.
