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
| Warning state  | Shown when the system detects a potential issue                         |
| Step label     | This describes the purpose of the step.                                 |

## Behavior

### Overflow

When a set of steps cannot fit on the screen, the stepper becomes horizontally scrollable and navigable with arrows. To
navigate back and forth, use the arrows.

## Usage

### Scalable

As the stepper can scroll horizontally, technically, a UI could have as many steps as needed. However, it would be best to use between 3-5 steps and not
more than nine steps, and always consider how you might simplify it.

### Text label

We recommend keeping the label short and descriptive.

### Steps are Links

The user should have the opportunity to use the stepper to jump to the previous steps.
