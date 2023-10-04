# Pin Code

<TableOfContents></TableOfContents>

## Usage

The following segment provides instructions for designers and developers regarding the appropriate utilization of this
component in various situations.

### Do:

- Use description text to explain the purpose or context of the `p-pin-code` component.
- Use either 4 or 6 fields in the `p-pin-code` component based on your specific use case and security requirements.
- Since only digits can be entered, use for digit codes only.
- Use type `number` for numeric input or `password` for secure input depending on your application's needs.
- Use the component's built-in support for inline validation.
- Use consideration when implementing the component's behavior in a loading state to ensure it remains usable and
  responsive during data retrieval or processing.
- If the `p-pin-code` component is isolated e.g. used with only one button use the loading state on the button. This
  ensures a consistent and intuitive user experience.

### Don't:

- Don't make the description text overly complex. Keep it concise and focused on clarifying the component's purpose.
- Don't use the wrong field type for your use case. Ensure that type `number` or `password` aligns with the kind of
  input expected from users.
