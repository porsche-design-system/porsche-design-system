# Stepper Horizontal

<TableOfContents></TableOfContents>

## Usage

The following segment provides instructions for designers and developers regarding the appropriate utilization of this
component in various situations.

### Do:

- Use to display progress through a sequence of logical and numbered steps.
- Use when the content of one step depends on an earlier step.
- Use short and descriptive labels for each step.
- Make completed steps clickable so that the user can jump back to previous steps.
- Be aware that the component does not handle the display of your content and you will need to manually take care of the
  content to be rendered beneath.
- Consider how you can simplify the component and use between 3-5 steps for the best user experience.

### Don't:

- Don't use long step names as it can make the component difficult to use.
- Don't use more than 9 steps (component has a maximum of 9)
- Don't forget that if a set of steps can not fit on the screen the stepper becomes horizontally scrollable and
  navigable with arrows.
