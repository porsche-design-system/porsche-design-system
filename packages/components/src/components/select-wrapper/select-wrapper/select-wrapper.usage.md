# Select Wrapper

<TableOfContents></TableOfContents>

## Usage

The following segment provides instructions for designers and developers regarding the appropriate utilization of this
component in various situations.

### Do:

- Keep the label visible for better accessibility whenever possible.
- Provide a descriptive label text for screen readers when using the component without a label.
- Use to trigger an action based on the selected option choose and search one option from a list of items to navigate
  the user to a new position and recommend a default option for most users.
- Use without label only if the context clearly describes what the component is to be used for and no further
  explanation is required.
- Provide a description text displayed openly and directly outside the form field when helpful for the user to get
  further information on the input.
- Use the custom filter for a large number of select options (e.g. country/state select).
- Use without preselection (mandatory field) if you don't know or need to make sure the user makes a conscious choice.
- Use preselection (mandatory field) if you have a reason to believe one of the options is most likely or you know the
  default or current option.
- Use preselection (optional field) to make it possible to go back to an empty default.
- Use common sort order for menu items (frequency of use, alpha or numeric).

### Don't:

- Don't use select boxes for data that is highly familiar such as the day month or year.
- Don't set the default to 'please select' if there's an empty field.
- Don't use very long select boxes that require scrolling but if unavoidable make sure that when open there is only a
  maximum of 7 elements in the field of view without having to scroll.
