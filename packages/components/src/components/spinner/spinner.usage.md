# Spinner

<TableOfContents></TableOfContents>

## Usage

The following segment provides instructions for designers and developers regarding the appropriate utilization of this
component in various situations.

### Do:

- Use when the user has to wait for more than 1 second.
- Use either stand-alone or within components (e.g. in Buttons to indicate progress after clicking "save“).
- Use vertically and horizontally centered within the referring area.
- Use a blocking layer for the whole screen when the user is not supposed to start another activity.
- Include simple text to explain why the user is waiting.
- Disable the component while the spinner is visible if it is triggered by an interaction.

### Don't:

- Don't use too many Spinners at the same time within a page or application.
- Don't use Spinners for delays of more than 10 seconds without providing a progress bar showing the estimated waiting
  time.
- Don't use threatening text such as "Don't click again" to prevent the user from clicking twice.
