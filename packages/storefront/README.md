# Storefront

TODO:

- Explain NEXT_PUBLIC_PDS_ENV=development
- Explain scripts

## Configurator

### ElementConfig

An `ElementConfig` is an abstract way of describing an HTML structure. It can be used to generate vanilla JavaScript,
React, Vue, and Angular syntax. Each config consists of a tag, properties, and children.

- **Tag**: The name of the HTML element (e.g., `p-button`, `input`, etc.).
- **Properties**: The attributes to be applied to the element. These are defined using React-style syntax (`class`
  becomes `className`, etc.).
- **Children**: The content of the element, which can be a string (for text content) or other `ElementConfig` objects
  (for nested structures).

`ElementConfig`s are used for both the dynamic configuration of components and static examples.

```typescript
const config: ElementConfig = {
  tag: 'p-link',
  properties: { compact: true, variant: 'secondary' },
  children: [{ tag: 'a', properties: { href: 'https://porsche.com' }, children: ['Some label'] }],
};
```

Generated output:

```html
<p-link variant="secondary" compact="true">
  <a href="https://porsche.com"> Some label </a>
</p-link>
```

```jsx
<PLink variant="secondary" compact={true}>
  <a href="https://porsche.com">Some label</a>
</PLink>
```

```angular181html
<p-link variant="secondary" [compact]="true">
  <a href="https://porsche.com">
    Some label
  </a>
</p-link>
```

```vue
<PLink variant="secondary" :compact="true">
  <a href="https://porsche.com">
    Some label
  </a>
</PLink>
```

### Story

To use the configurator, you need to create a component "story". A story consists of a **state** and a **generator
function**.

- **State** defines the default configuration: properties and slots selected in the configurator.
- **Generator function** produces an array of `ElementConfig`s using the current state. The state is passed as an
  argument and can be used to apply values to the generated element(s).

The `properties` object in the `state` contains attributes that should be applied directly to the component tag.
Whenever the configurator changes (for instance, when a user toggles a checkbox or selects a different option), the
`state` is refreshed automatically. This updated state is then passed into the `generator` function, which produces a
new `ElementConfig` based on the latest values. That updated config is used to generate the final markup (vanilla JS,
React, Vue, or Angular) that reflects the current state of the component setup in the configurator.

```typescript
export const flyoutStory: Story<'p-flyout'> = {
  state: {
    properties: {
      open: false,
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-flyout',
      properties,
      children: ['Some content'],
    },
  ],
};
```

### Slots

For some components, you may want to make slots configurable—such as toggling a `header` slot in a flyout or switching
between different types of default slot content like basic or scrollable content. To support this, you can define
`SlotStories`.

A `SlotStories` object allows you to configure different slot variations. Each slot is represented by a key in the
object:

- The **default** slot is always keyed as `default`.
- Named slots (e.g. `header`, `footer`) use their respective names as keys.

Within each slot, you define one or more configurations. These configurations are objects that include:

- A `name`, which is used for display in the configurator UI.
- A `generator` function, which returns one or more `ElementConfig`s for that slot.

```typescript
export const flyoutSlotStories: SlotStories<'p-flyout'> = {
  header: {
    basic: {
      name: 'Basic',
      generator: () => [
        {
          tag: 'p-heading',
          properties: { slot: 'header', size: 'large', tag: 'h2' },
          children: ['Some Heading'],
        },
      ],
    },
  },
  default: {
    basic: {
      name: 'Basic',
      generator: () => [{ tag: 'p-text', children: ['Some Content'] }],
    },
    scrollable: {
      name: 'Scrollable Content',
      generator: () => [
        { tag: 'p-text', children: ['Some Content Begin'] },
        { tag: 'div', properties: { style: { width: '10px', height: '120vh', background: 'deeppink' } } },
        { tag: 'p-text', children: ['Some Content End'] },
      ],
    },
  },
};
```

To use slots in a `Story`, they must be defined in the story's `state`. This determines which slots are enabled by
default in the configurator.

The `slots` object in the state specifies which slot configurations to apply. Each slot key (e.g. `header`, `default`)
is assigned a specific configuration from the corresponding `SlotStories`.

During rendering, these slot configurations are passed into the generator function as part of the state. Within the
generator, you can call each slot's `generator` function to produce the appropriate `ElementConfig`s and place them in
the correct position within the component's children array.

```typescript
export const flyoutStory: Story<'p-flyout'> = {
  state: {
    properties: {
      open: false,
    },
    slots: {
      header: flyoutSlotStories.header.basic,
      default: flyoutSlotStories.default.basic,
    },
  },
  generator: ({ properties, slots } = {}) => [
    {
      tag: 'p-flyout',
      properties,
      children: [...(slots?.header?.generator() ?? []), ...(slots?.default?.generator() ?? [])],
    },
  ],
};
```

This structure allows you to dynamically switch between slot content in the configurator, giving you full flexibility in
how each slot is rendered.

### Controlled State

To support controlled components like `p-flyout`, you need to define an `EventConfig`. This configuration enables the
component to respond to events and update its props based on user interaction.

For controlled state to function correctly:

- The controlled prop (e.g. `open`) **must be defined** in the story’s `state.properties`.
- An event handler is configured via `EventConfig`, which describes how the state should change in response to a
  specific event.

The full `EventConfig` includes the following options:

- `target`: The tag of the component that should receive the updated prop.
- `prop`: The name of the prop to update.
- `value`: A static value to set for the prop, used when the new value isn’t extracted from an event (e.g. toggling
  between true/false).
- `eventValueKey`: A string that indicates which key from the `CustomEvent` detail should be used to extract the new
  value. For example, if `e.detail.open` holds the new value, use `'open'`.
- `eventType`: The name of the custom event’s TypeScript detail type (e.g. `AccordionUpdateEventDetail`). This is used
  to correctly type the event listener.
- `negateValue`: A boolean that, if true, negates the event value before applying it to the target prop (useful for
  toggle behaviors like "like"/"unlike").

This configuration not only makes interactive components work with the configurator, but also ensures the generated
markup reflects the component's controlled behavior accurately.

```typescript
export const accordionStory: Story<'p-accordion'> = {
  state: {
    properties: { open: false, heading: 'Some Heading' },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-accordion',
      properties,
      events: {
        onUpdate: {
          target: 'p-accordion',
          prop: 'open',
          eventValueKey: 'open',
          eventType: 'AccordionUpdateEventDetail',
        },
      },
      children: ['Some content'],
    },
  ],
};
```

Output (vanilla-js):

```html
<p-accordion heading="Some Heading">Some content</p-accordion>

<script>
  const accordion = document.querySelector('p-accordion');
  accordion.addEventListener('update', (e) => (e.target.open = e.detail.open));
</script>
```

### Usage

```mdxjs
import { flyoutSlotStories, flyoutStory } from "@/app/components/flyout/flyout.stories";
import { Configurator } from "@/components/playground/Configurator";
<Configurator tagName="p-flyout" story={flyoutStory} slotStories={flyoutSlotStories} />
```

## Component Examples

There are two ways to showcase component examples in the Storefront:

- `ComponentStory`: For simple examples based on the Configurator, without custom JavaScript.
- `ComponentExample`: For more advanced examples that require manual control or custom logic.

### ComponentStory

Use `ComponentStory` when the example can be built using the Configurator system—i.e. when you only need to display
markup and optionally support simple controlled behavior via `EventConfig`.

To use it, import a `story` (as described in the [Configurator](#configurator) section) and pass it to the
`ComponentStory` component.

```mdxjs
import { carouselStoryFlexibleWidths } from "@/app/components/carousel/carousel.stories";
<ComponentStory story={carouselStoryFlexibleWidths} />
```

### ComponentExample

Use the `ComponentExample` component when a more complex example is required—for instance, when custom JavaScript or
advanced behavior is involved. In these cases, examples must be written manually for each supported framework.

1. **Add Examples**

Create the example in each framework-specific package:

- `vanilla-js`: `porsche-design-system/packages/components-js/src/examples`
- `angular`: `porsche-design-system/packages/components-angular/src/app/examples`
- `react`: `porsche-design-system/packages/components-react/src/examples`
- `vue`: `porsche-design-system/packages/components-vue/src/examples`

⚠️ Follow the correct file naming conventions and update each app's routing to ensure the example is accessible during
development.

2. **Register the Example**

In `packages/shared/scripts/generateCodeExamples.ts`, add the example to the `codeExamples` array.  
Run `yarn build:shared` to generate a file in `packages/shared/src/examples`. This file will export an object containing
the React component along with the markup for all frameworks.

3. **Use in Storefront**

Import the generated example and pass it to `ComponentExample`:

```mdxjs
import { carouselExampleJumpToSlide } from "@porsche-design-system/shared/examples";
<ComponentExample codeSample={carouselExampleJumpToSlide} />
```
