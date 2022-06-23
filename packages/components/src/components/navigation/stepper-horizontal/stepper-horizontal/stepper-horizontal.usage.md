# Stepper Horizontal

<TableOfContents></TableOfContents>

## States

| States       | Usage                                                                   |
| ------------ | ----------------------------------------------------------------------- |
| `current`    | This shows the step that the user is on.                                |
| `undefined`   | 'Next' Step which is visible but disabled.                              |
| `conmpleted` | The step the user has already completed. Marked with success indicator. |
| `warning`    | Shown when the system detects a potential issue                         |

## Behavior

### Overflow

When a set of steps cannot fit on the screen, the stepper becomes horizontally scrollable and navigable with arrows. To
navigate back and forth, use the arrows.

## Usage

### Scalable

The component can have a maximum of 9 steps. However, it would be best to use between 3-5 steps and always consider how
you might simplify it.

### Text label

We recommend keeping the label short and descriptive.

### Completed steps are clickable

The user should have the opportunity to use the stepper to jump to the previous steps.
