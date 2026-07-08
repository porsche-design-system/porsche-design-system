# p-stepper-horizontal

The `p-stepper-horizontal` component displays progress through a sequence of logical and numbered steps. It is ideal when the contents of one step depends on an earlier step. Avoid using long step names.

The component does not handle the display of your content. When using the component you have to manually take care of the content to be rendered beneath. To help with this task, if a step is clicked, the component triggers an event called `change` with the index of the clicked step.

**Note**: Maximum of 9 steps are supported.

It is a controlled component. This means it does not contain any internal state and you got full control over its behavior.

Use `p-stepper-horizontal-item`s inside the `p-stepper-horizontal` component. Each item will be rendered as a step. You have to manually manage the state of the items by setting the `state` property.

The `state` property can be set to `complete` when a step is complete, `warning` when a user has to revisit the step, `current` for the step that is in progress and `undefined`.

If the `state` property is `undefined` the step renders as stateless and disabled. This can be used to prevent the user from navigating to a step which is not yet reachable. This is to be used for future steps which cannot yet be processed at the time.

By clicking on a previous step, the `p-stepper-horizontal` emits the `update` event, which contains the index of the clicked step.

## Usage

The following section provides guidance for designers and developers on how to use this component in different situations.

### Do:

- Use to display progress through a sequence of logical and numbered steps.
- Use when the content of one step depends on an earlier step.
- Use short and descriptive labels for each step.
- Make completed steps clickable so that the user can jump back to previous steps.
- Be aware that the component does not handle the display of your content and you will need to manually take care of the content to be rendered beneath.
- Consider how you can simplify the component and use between 3-5 steps for the best user experience.

### Don't:

- Don't use long step names as it can make the component difficult to use.
- Don't use more than 9 steps (component has a maximum of 9)
- Don't forget that if a set of steps can not fit on the screen the stepper becomes horizontally scrollable and navigable with arrows.

## Accessibility support

### Keyboard

| Key / state | Function |
| --- | --- |
| `Tab`, `Shift-Tab` | Moves focus to the scroll container or to next (or previous) focusable element. |
| `Enter`, `Space` | Activates the completed and current step-item. |
| `disabled` | Step-item still focusable. |

### ARIA enhancements

#### Internal **ARIA** that is managed by the component:

| ARIA | Usage |
| --- | --- |
| `role="list"` | Indicates the stepper as list element. |
| `role="listitem"` | Indicates the step-item as list-item element. |

## Tests

### Automated

| Technology | Support |
| --- | --- |
| AXE-Core (WCAG 2.2 AA, Best-Practice) | ✅ |
| High-Contrast Mode (light/dark) | ✅ |
| Text-Zoom (200%) | ✅ |

### Manual

| Technology | Support |
| --- | --- |
| Keyboard | ✅ |
| Screen reader (VoiceOver, NVDA) | ✅ |

## API

Authoritative API data: `../meta` (`component-meta`). When these tables disagree with it, follow `component-meta`.

### Properties

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | `'small'` `'medium'`<br>`BreakpointCustomizable<StepperHorizontalSize>` | `'small'` | The font size of the step labels. |

### Events

| Event | Type | Description |
| --- | --- | --- |
| `update` | `CustomEvent<StepperHorizontalUpdateEventDetail>`<br>`{ activeStepIndex: number }` | Emitted when active step is changed. |

### Slots

| Slot | Required | Allowed tag names | Description |
| --- | --- | --- | --- |
| _(default)_ | no | — | Default slot for the `p-stepper-horizontal-item` tags. |

## Sub-components

These tags are only valid inside this component (see each one’s allowed parents). Their APIs come from the same authoritative `component-meta` as the parent above.

### `p-stepper-horizontal-item`

Allowed parent: `p-stepper-horizontal`.

#### Properties

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `disabled` | `boolean` | `false` | Disables the stepper-horizontal-item. No events will be triggered while disabled state is active. |
| `state` | `undefined` `'current'` `'complete'` `'warning'` | `undefined` | The current progression state of the step. Use `current` for the active step, `complete` for finished steps, `warning` for steps with issues. Leave unset for future steps. |

#### Slots

| Slot | Required | Allowed tag names | Description |
| --- | --- | --- | --- |
| _(default)_ | no | — | Default slot for the content. |

## Examples

| Example | When to use | File |
| --- | --- | --- |
| Default | Minimal default configuration. | [./examples/Default.html](./examples/Default.html) |
| Framework Implementation | Below you can find an interactive example of an outlined registration process. | [./examples/FrameworkImplementation.html](./examples/FrameworkImplementation.html) |
