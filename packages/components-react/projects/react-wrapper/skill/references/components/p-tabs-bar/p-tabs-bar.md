# p-tabs-bar

The `p-tabs-bar` component is a styled button/link list for multiple purposes. You can use it with your framework router to ensure your **window location** updates on tab click, use it for **hash routing** and displaying content accordingly to the hash, as **skip navigation** to move on a longer page or to **change the state** of another element and therefore change the appearance of your content .

The component does not handle the display of your content. If you use the component you have to manually care for the content to be rendered beneath. To help with this task the component triggers an event called `update` with the index of the active tab.

If you intend to only change content on tab-click without location changes and you are fine that the content needs to be pre-rendered then we prepared a component which also handles the correct display of content according to the active tab. Have a look at the [Tabs](../p-tabs/p-tabs.md) component.

It is a controlled component. This means it does not contain any internal state, and you are in full control over its behavior.

Basic implementation is a tab bar with tabs to switch between the content. Just put `<button>` tags if you need to change e.g. the state on tab-click or `<a>` tags, if you also have to manipulate the window location, inside the `<p-tabs-bar>` component and it will handle all styling behaviors.

In order to get notified when the active tabs change, you need to register an event listener for the `update` event which is emitted by `p-tabs-bar`.

## Usage

The following section provides guidance for designers and developers on how to use this component in different situations.

### Do:

- Use as an anchor navigation to jump to a section on a longer page.
- Use it to switch between different stages of content.
- Use it to show different types of elements.

### Don't:

- Don't place more than six tabs within a group.
- Don't use more than two words for a tab label whenever possible.
- Don't use it for primary navigation.

---

## Related Component

- [Tabs](../p-tabs/p-tabs.md)
- [Pagination](../p-pagination/p-pagination.md)

## Accessibility support

### Keyboard

#### Tabs Bar as a tabbed interface

| Key / state | Function |
| --- | --- |
| `Tab` | - Moves focus to the active tab.
 - When the tab list contains the focus, moves focus to the next element in the tab sequence, which is the `tabpanel` element. |
| `Right Arrow`, `Left Arrow` | - Moves focus to the next tab.
 - Activates the newly focused tab.
 - If focus is on the last tab, moves focus to the first tab. |
| `Home`, `End` | - Moves focus to the first/last tab and activates it. |

#### Tabs Bar as link list

| Key / state | Function |
| --- | --- |
| `Tab`, `Shift-Tab` | Moves focus to next (or previous) focusable element. |
| `Enter` | Activates the link. |

### ARIA enhancements

#### External **ARIA** provided by the `aria` property:

| ARIA | Usage |
| --- | --- |
| `aria-label="STRING"` | Defines a string value that labels the tablist when used as a tabbed interface. |
| `aria-description="STRING"` | Defines a string value that adds a more detailed description of the tablist. |

The `aria` property applies only when the component is used as a **tabbed interface** with `<button>` children. It is not applied when the component is used as a **link list** with `<a>` children.

#### Internal **ARIA** that is managed by the component:

| ARIA | Usage |
| --- | --- |
| `role="tablist"` | Indicates that the element serves as a container for a set of tabs. |
| `role="tab"` | Indicates the button serves as a tab control. |
| `aria-selected="BOOLEAN"` | Indicates whether the tab is selected and whether its associated tabpanel is visible. |

## Development considerations

### Labelling

When multiple tab bars appear on the same page, or when the purpose of the tabs is not clear from the visible tab labels alone, provide a descriptive accessible name for the tablist using the `aria` property, e.g.: `<p-tabs-bar aria="{ 'aria-label': 'Some label for the tablist', 'aria-description': 'Some description for the tablist' }">`.

### ARIA enhancements if used as a tabbed interface

The `p-tabs-bar` component is detached from the content (`tabpanel`) which belongs to the active tab. To be truly accessible you need to provide additional ARIA attributes, because every tab (`button`) needs an `aria-controls` attribute which points to the corresponding `id` of the `tabpanel`. The content placeholder needs the `role="tabpanel"` and the attribute `aria-labelledby` which points to the unique `id` of the corresponding tab (`button`).

You must also take care of the **focus handling** of the `tabpanel`. Therefore, the active tab panel must have a `tabindex="0"` to receive keyboard focus and the focus indicator must be styled accordingly. Use the provided focus style like this:

```html
<p-tabs-bar
  aria="{ 'aria-label': 'Some label for the tablist', 'aria-description': 'Some description for the tablist' }"
  active-tab-index="0"
>
  <button type="button" id="tab-item-0" aria-controls="tab-panel-0">Tab One</button>
  <button type="button" id="tab-item-1" aria-controls="tab-panel-1">Tab Two</button>
  <button type="button" id="tab-item-2" aria-controls="tab-panel-2">Tab Three</button>
</p-tabs-bar>
<div id="tab-panel-0" role="tabpanel" tabindex="0" aria-labelledby="tab-item-0">
  <p-text>Your content of Tab 1</p-text>
</div>
<div id="tab-panel-1" role="tabpanel" hidden tabindex="-1" aria-labelledby="tab-item-1">
  <p-text>Your content of Tab 2</p-text>
</div>
<div id="tab-panel-2" role="tabpanel" hidden tabindex="-1" aria-labelledby="tab-item-2">
  <p-text>Your content of Tab 3</p-text>
</div>
```

```scss
p-tabs-bar ~ [tabindex='0'][role='tabpanel'] {
  @include pds-focus;
}
```

### ARIA enhancements if used as a link list

#### Route based navigation

If the `p-tabs-bar` is used as a link list (navigation context), the semantics of that UI component changes completely - from a **tabbed interface** where content changes happen **on-site** to a **list of links** where content changes are **route-based**. Therefore, additional ARIA attributes **must not** be provided for tab identification. The `p-tabs-bar` component manages this also internally.

To enhance accessibility even further, wrap the `p-tabs-bar` in a `<nav>` element with an `aria-label` attribute. Additionally, an `aria-current="page"` attribute should be provided to the active link.

```html
<nav aria-label="Label for the navigation">
  <p-tabs-bar>
    <a href="https://porsche.com/page-1" aria-current="page">Page One</a>
    <a href="https://porsche.com/page-2">Page Two</a>
    <a href="https://porsche.com/page-3">Page Three</a>
  </p-tabs-bar>
</nav>
```

#### In-page jump navigation

If the `p-tabs-bar` is used as an in-page jump navigation, you should follow the same rules as for the route-based variant except that `aria-current="page"` should not be used.

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

Authoritative API data: `@porsche-design-system/components-js/meta` (`component-meta`). When these tables disagree with it, follow `component-meta`.

### Properties

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `activeTabIndex` | `number | undefined` | `undefined` | Sets the zero-based index of the currently active tab. Pass `undefined` to render all tabs in an unselected state. |
| `aria` | `TabsBarAriaAttribute` | `undefined` | Sets ARIA attributes on the tablist, such as `aria-label` and `aria-description`. |
| `background` | `'canvas'` `'surface'` `'frosted'` `'none'` | `'none'` | Sets the background color of the tabs bar. Use `frosted` only when placed on top of images, videos, or gradients. |
| `compact` | `boolean` | `undefined` | Reduces the tab height and padding for use in dense layouts where vertical space is limited. |
| `size` | `'small'` `'medium'`<br>`BreakpointCustomizable<TabsBarSize>` | `'small'` | Sets the font size of the tab labels using the PDS typographic scale. Supports responsive breakpoint values. |
| `weight` _(deprecated)_ | `'regular'` `'semi-bold'` | `'regular'` | @deprecated Will be removed in the next major release. Has no effect anymore. |

### Events

| Event | Type | Description |
| --- | --- | --- |
| `update` | `CustomEvent<TabsBarUpdateEventDetail>`<br>`{ activeTabIndex: number }` | Emitted when the user clicks a different tab, carrying the new `activeTabIndex` in the event detail. |

### Controlled properties

- `activeTabIndex` — a controlled prop: the component does **not** update it itself. Handle the `update` event and assign the new value to `activeTabIndex` yourself, or the change will not take effect.

### Slots

| Slot | Required | Allowed tag names | Description |
| --- | --- | --- | --- |
| _(default)_ | no | — | Default slot for the `button` or `a` tags which will be rendered as tabs. |

## Examples

| Example | When to use | File |
| --- | --- | --- |
| Default | Minimal default configuration. | [./examples/Default.tsx](./examples/Default.tsx) |
| Links | If the `p-tabs-bar` is used as a link list (navigation context), the semantics of that UI component changes completely - from a **tabbed interface** where content changes happen **on-site** to a **list of links** where content changes are **route-based**. | [./examples/Links.tsx](./examples/Links.tsx) |
| Gradient color | If the amount of tabs exceeds the viewport, the component renders arrow-buttons to help with horizontal scrolling. | [./examples/Gradient.tsx](./examples/Gradient.tsx) |
| Labelling | Use the `aria` property to provide an accessible name and optional description for the tablist when the component is used as a tabbed interface with `<button>` children. | [./examples/Labelling.tsx](./examples/Labelling.tsx) |
