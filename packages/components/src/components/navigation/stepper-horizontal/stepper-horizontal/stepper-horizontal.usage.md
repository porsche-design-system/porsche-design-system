# Stepper Horizontal

<TableOfContents></TableOfContents>

## When to use

- Use a stepper to display progress through a sequence by breaking it up into multiple logical and numbered steps.
- Use a stepper to show completed tasks.

---

## Types

| Types          | Usage                                                                   |
| -------------- | ----------------------------------------------------------------------- |
| Current step   | This shows the step that the user is on.                                |
| Next step      | Visible but disabled.                                                   |
| Completed step | The step the user has already completed. Marked with success indicator. |
| Warning step   | ?                                                                       |
| Step label     | This describes the purpose of the step.                                 |

## Behavior

### Overflow

When a set of steps cannot fit on the screen, the stepper becomes horizontally scrollable and navigable with arrows. To
navigate back and forth, use the arrows.

## Usage

### Scalable

As the stepper can scroll horizontally, technically, a UI could have as many steps as needed. However, you should use no
more than nine steps. If a Workflow needs more than nine steps, consider how you might simplify it.

### Text label

It's recommended to keep the label short. For example, try not to use more than two words for a step label.

### Steps are Links

The user should have the opportunity to use the stepper to jump to the previous step.
