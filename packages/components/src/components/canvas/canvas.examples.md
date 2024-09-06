<ComponentHeading name="Canvas"></ComponentHeading>

The `p-canvas` is an experimental layout component for productive web applications.

<Notification heading="Scroll-lock" heading-tag="h2" state="warning">
  Currently, it's very important to define `overflow-x: hidden` on the `body` tag. 
  Otherwise, the component might not work as expected. 
  We're working on a solution which makes this pre-condition obsolete.
</Notification>

<TableOfContents></TableOfContents>

## Basic

### Supported named slots:

- `slot="header-start"`: Renders a **sticky** header section above the content area on the **start** side (**left** in
  **LTR** mode / **right** in **RTL** mode).
- `slot="header-end"`: Renders a **sticky** header section above the content area on the **end** side (**right** in
  **LTR** mode / **left** in **RTL** mode).
- `slot="title"`: Application name.
- `slot`: Shows the content area.
- `slot="footer"`: Shows a footer section, flowing under the content area when scrollable.
- `slot="sidebar-start"`: Shows a sidebar area on the **start** side (**left** in **LTR** mode / **right** in **RTL**
  mode). On mobile view it transforms into a flyout.
- `slot="sidebar-end"`: Shows a sidebar area on the **end** side (**right** in **LTR** mode / **left** in **RTL** mode).
  On mobile view it transforms into a flyout.

<Playground :frameworkMarkup="codeSamples" :markup="codeSamples['vanilla-js']" :config="config"></Playground>

## Custom styling

The canvas component has some values which can be overwritten by **CSS Variables**.

```scss
--p-canvas-sidebar-start-width: 50vw;
--p-canvas-sidebar-end-width: 20vw;
```

The canvas component is also exposing **CSS Variables** to be used in `subgrid` context (see example).

```scss
var(--p-canvas-grid-span-full)
var(--p-canvas-grid-span-one-half)
var(--p-canvas-grid-span-one-third)
var(--p-canvas-grid-span-two-third)
```

In addition, the canvas component also exposes some **utility CSS classes** which can be used on direct children of
slotted main content.

```scss
.p-module

.p-module--subgrid // inherits the shadowed CSS Grid defined by the canvas component

.p-module--more-space-above-small
.p-module--more-space-above-medium
.p-module--more-space-above-large

.p-module--less-space-above-small
.p-module--less-space-above-medium
.p-module--less-space-above-large

.p-flex // might be removed in a future release in favour of PDS Tailwind
.p-align-items--center // might be removed in a future release in favour of PDS Tailwind
.p-gap--small // might be removed in a future release in favour of PDS Tailwind
.p-gap--medium // might be removed in a future release in favour of PDS Tailwind
.p-gap--large // might be removed in a future release in favour of PDS Tailwind
```

## Open Issues

- How is the desired scroll behaviour of sidebar in desktop view (scrollable within sidebar of depending on the
  document)?
- Is the footer area sticky?
- Styling (box-shadows or colored surfaces) are missing in desktop view for header, sidebar and footer area
- Dismiss button for sidebar needs to be placed properly
- The component shouldn't rely on `overflow-x: hidden` on the `body` tag.
- Currently, on breakpoint `1000px` it isn't possible to have both sidebars open when used with width `large` due to too
  less available space.

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component'; 
import { getCanvasCodeSamples } from "@porsche-design-system/shared";  

@Component
export default class Code extends Vue {
  config = { themeable: false, withoutDemo: true };
  canvas = [];
  codeSamples = getCanvasCodeSamples();
}
</script>
