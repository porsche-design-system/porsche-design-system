<ComponentHeading name="Canvas"></ComponentHeading>

The `p-canvas` is an experimental layout component for productive web applications.

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
  **LTR** mode / **right** in **RTL** mode).
- `slot="sidebar-end-header"`: Renders in the header section of the sidebar end area.
- `slot="sidebar-end"`: Renders a sidebar area on the **end** side (**right** in **LTR** mode / **left** in **RTL**
  mode). On mobile view it transforms into a flyout.
- `slot="sidebar-start"`: Renders a sidebar area on the **start** side (**left** in **LTR** mode / **right** in **RTL**
  mode). On mobile view it transforms into a flyout.
- `slot="title"`: Renders the application name in the header of the sidebar start area.

<Playground :frameworkMarkup="codeSamples" :markup="codeSamples['vanilla-js']" :config="config"></Playground>

## CSS utility class

The canvas component provides a CSS utility class which comes with a basic 12 columns
[CSS grid](https://css-tricks.com/snippets/css/complete-guide-grid) and
[CSS container-type](https://css-tricks.com/css-container-queries). The utility class can be used in default or footer
slot to align its content.

```scss
.-p-canvas-grid // experimental, might be removed in a future release
```

## Custom styling

The canvas component has some values which can be overwritten by **CSS Variables**.

```scss
--p-canvas-sidebar-start-width: 220px;
--p-canvas-sidebar-end-width: 180px;
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
