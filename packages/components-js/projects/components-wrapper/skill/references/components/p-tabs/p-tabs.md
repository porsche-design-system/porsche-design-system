# p-tabs

The `p-tabs` component makes it easy to explore and switch between different views. You can organize and allow navigation between groups of content that are related and at the same level of hierarchy. The component handles the display of content according to the active tab and all accessibility attributes on your tab and tab content.

This variant does not support `a` tags and should not be used for navigation. If you need to update your window location have a look at [Tabs Bar](../p-tabs-bar/p-tabs-bar.md) component.

Basic implementation shows a tab list with buttons to switch between the content. For every `p-tabs-item` inside of the `p-tabs` component, a tab will be created. The assigned `label` property defines also the name of the button.

Every `p-tabs-item` holds a `slot` to display content which can be individually assigned.

## Usage

The following section provides guidance for designers and developers on how to use this component in different situations.

### Do:

- Use when there is a large amount of content that can be separated.
- Use to make the content accessible without reloading the page or compromising on space.

### Don't:

- Don't place more than six tabs within a group.
- Don't use more than two words for a tab label whenever possible.
- Don't use it for primary navigation.

---

## Related Component

- [Tabs Bar](../p-tabs-bar/p-tabs-bar.md)

## Accessibility support

### Keyboard

| Key / state | Function |
| --- | --- |
| `Tab` | - Moves focus to the active tab.
 - When the tab list contains the focus, moves focus to the next element in the tab sequence, which is the `tabpanel` element. |
| `Right Arrow`, `Left Arrow` | - Moves focus to the next tab.
 - Activates the newly focused tab.
 - If focus is on the last tab, moves focus to the first tab. |
| `Home`, `End` | - Moves focus to the first/last tab and activates it. |

### ARIA enhancements

#### External **ARIA** provided by the `aria` property:

| ARIA | Usage |
| --- | --- |
| `aria-label="STRING"` | Defines a string value that labels the tablist. |
| `aria-description="STRING"` | Defines a string value that adds a more detailed description of the tablist. |

#### Internal **ARIA** that is managed by the component:

| ARIA | Usage |
| --- | --- |
| `role="tablist"` | Indicates that the element serves as a container for a set of tabs. |
| `role="tab"` | Indicates the button serves as a tab control. |
| `role="tabpanel"` | Indicates the `tabs-item` serves as a container for tabpanel content. |
| `aria-label="STRING"` | Adds accessible name to the `tabs-item` based on the `label` property. |
| `aria-selected="BOOLEAN"` | Indicates whether the tab is selected and whether its associated tabpanel is visible. |

## Development considerations

### Labelling

When multiple tab groups appear on the same page, or when the purpose of the tabs is not clear from the visible tab labels alone, provide a descriptive accessible name for the tablist using the `aria` property, e.g.: `<p-tabs aria="{ 'aria-label': 'Some label for the tablist', 'aria-description': 'Some description for the tablist' }">`.

## Limitations

Due to the nature of **Web Components** and **shadow DOM**, there are limitations when using some **ARIA** attributes to define relationships between elements across different shadow DOMs or shadow DOM/light DOM combinations.

| ARIA | Support |
| --- | --- |
| `aria-controls` | 🚫 |

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
| `activeTabIndex` | `number` | `0` | Sets the zero-based index of the currently active tab; update this prop to switch tabs programmatically. |
| `aria` | `TabsAriaAttribute` | `undefined` | Sets ARIA attributes on the tablist, such as `aria-label` and `aria-description`. |
| `background` | `'canvas'` `'surface'` `'frosted'` `'none'` | `'none'` | Sets the background color of the tabs bar. Use `frosted` only when placed on top of images, videos, or gradients. |
| `compact` | `boolean` | `undefined` | Reduces the tab height and padding for use in dense layouts where vertical space is limited. |
| `size` | `'small'` `'medium'`<br>`BreakpointCustomizable<TabsSize>` | `'small'` | Sets the font size of the tab labels using the PDS typographic scale. Supports responsive breakpoint values. |
| `weight` _(deprecated)_ | `'regular'` `'semi-bold'` | `'regular'` | @deprecated Will be removed in the next major release. Has no effect anymore. |

### Events

| Event | Type | Description |
| --- | --- | --- |
| `update` | `CustomEvent<TabsUpdateEventDetail>`<br>`{ activeTabIndex: number }` | Emitted when the user switches to a different tab, carrying the new `activeTabIndex` in the event detail. |

### Controlled properties

- `activeTabIndex` — a controlled prop, but the component also updates it internally. Listen for the `update` event to observe changes; you do not have to write the value back.

### Slots

| Slot | Required | Allowed tag names | Description |
| --- | --- | --- | --- |
| _(default)_ | no | — | Default slot for the `p-tabs-item` tags. |

## Sub-components

These tags are only valid inside this component (see each one’s allowed parents). Their APIs come from the same authoritative `component-meta` as the parent above.

### `p-tabs-item`

Allowed parent: `p-tabs`.

#### Properties

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `label` _(required)_ | `string` | `undefined` | Sets the label text displayed in the tab navigation button that the user clicks to activate this tab's content. |

#### Slots

| Slot | Required | Allowed tag names | Description |
| --- | --- | --- | --- |
| _(default)_ | no | — | Default slot for the tab content. |

## Examples

| Example | When to use | File |
| --- | --- | --- |
| Default | Minimal default configuration. | [./examples/Default.html](./examples/Default.html) |
| Gradient color | If the amount of tabs exceeds the viewport, the component renders arrow-buttons to help with horizontal scrolling. | [./examples/Gradient.html](./examples/Gradient.html) |
| Active Tab | You may need to change the initial active tab. | [./examples/ActiveTab.html](./examples/ActiveTab.html) |
| Labelling | Use the `aria` property to provide an accessible name and optional description for the tablist. | [./examples/Labelling.html](./examples/Labelling.html) |
