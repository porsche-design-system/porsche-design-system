<ComponentHeading name="Canvas"></ComponentHeading>

The `p-canvas` is an experimental layout component for productive web applications. By default, the component comes with
a CSS Grid with 12 columns (can be customized by CSS variable `--p-canvas-grid-columns`). The Grid is available for
default and footer slot.

<Notification heading="Scroll-lock" heading-tag="h2" state="warning">
  Currently, it's very important to define `overflow-x: hidden` on the `body` tag. 
  Otherwise, the component might not work as expected. 
  We're working on a solution which makes this pre-condition obsolete.
</Notification>

<TableOfContents></TableOfContents>

## Basic

### Supported named slots:

- `slot`: Default slot for the main content.
- `slot="background"`: Can be used to pass a sticky media element `<img/>` or `<video/>` placed underneath the main
  content.
- `slot="footer"`: Renders a **sticky** footer section underneath the main content.
- `slot="header-end"`: Renders a **sticky** header section above the content area on the **end** side (**right** in
  **LTR** mode / **left** in **RTL** mode).
- `slot="header-start"`: Renders a **sticky** header section above the content area on the **start** side (**left** in
  **LTR** mode / **right** in **RTL** mode). On desktop view, in case **sidebar-start slot** is present and opened it
  will be rendered within.
- `slot="sidebar-end"`: Renders a sidebar area on the **end** side (**right** in **LTR** mode / **left** in **RTL**
  mode). On mobile view it transforms into a flyout.
- `slot="sidebar-start"`: Renders a sidebar area on the **start** side (**left** in **LTR** mode / **right** in **RTL**
  mode). On mobile view it transforms into a flyout.
- `slot="title"`: Renders the application name in the header section. In case **sidebar-start slot** is present it will
  be rendered in the corresponding flyout on mobile view.

<Playground :frameworkMarkup="codeSamples" :markup="codeSamples['vanilla-js']" :config="config"></Playground>

## Custom styling

The canvas component has some values which can be overwritten by **CSS Variables**.

```scss
--p-canvas-sidebar-start-width: 220px;
--p-canvas-sidebar-end-width: 180px;
--p-canvas-grid-columns: 6;
--p-canvas-grid-max-width: 400px;
```

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
