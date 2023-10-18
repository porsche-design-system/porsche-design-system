# Popover

The `p-popover` component can be used to display some additional content on top of another in conjunction with the info
<p-popover :theme="this.$store.getters.storefrontTheme" description="Hello World"></p-popover>-button.

<TableOfContents></TableOfContents>

## Basic

It's important, that the Popover isn't used within a parent node having e.g. `overflow: hidden` as style defined. Then
it might be shown cut-off under certain circumstances because it's placed relative to the info
<p-icon :theme="this.$store.getters.storefrontTheme" name="information" aria="{ 'aria-label': 'Information icon' }"></p-icon>-button
node technically.

Only one Popover can be opened at the time, by clicking another Popover the opened Popover will be closed.

You can use the `description` or the slot of the Popover to provide content which will be displayed in the open Popover.

**Hint:** The Popover uses a z-index of `{{zIndex}}` to be displayed on top of most elements. This only works if the
[stacking context](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context)
is not broken and following elements have a lower z-index.

<Playground :markup="basicMarkup" :config="config"></Playground>

## ARIA attributes and states

Through the `aria` property you have the possibility to provide an additional **aria-label** attribute to the component.

<Playground :markup="accessibilityMarkup" :config="config"></Playground>

### <A11yIcon></A11yIcon> Accessibility hints

- Make sure to provide a **descriptive**, self explaining **label** which could be understood without context to expose
  a more descriptive experience to screen reader users, telling them what they can expect to read after clicking the
  info
  <p-icon :theme="this.$store.getters.storefrontTheme" name="information" aria="{ 'aria-label': 'Information icon' }"></p-icon>-button.

---

## Direction

It's possible to define a preferred direction in which the popover should open, given there is enough space in viewport.
Otherwise, it will be opened in the direction with most available space automatically.

<Playground :markup="directionMarkup" :config="config">
  <SelectOptions v-model="direction" :values="directions" name="direction"></SelectOptions>
</Playground>

## Within table

When a popover is used within the `p-table` component it will automatically switch to a native popover. This will stop
the popover from being cut off when overlapping the component scroll container. The popover will be automatically closed
when the user scrolls the page or within the table.

<Playground :markup="withinTableMarkup" :config="config"></Playground>

<script lang="ts">
import {POPOVER_Z_INDEX} from "../../constants";
import Vue from 'vue';
import Component from 'vue-class-component';
import { POPOVER_DIRECTIONS } from './popover-utils'; 

@Component
export default class Code extends Vue {
  config = { overflowX: 'visible', themeable: true, };

  popoverContent = 'Some additional content.';
  zIndex = POPOVER_Z_INDEX;

  basicMarkup = `<p-text>
  Some content <p-popover>${this.popoverContent}</p-popover> which is longer.<br>  Some more content <p-popover description="${this.popoverContent}"></p-popover>.
</p-text>`;

  descriptionMarkup = `<p-popover description="${this.popoverContent}"></p-popover>`;

  direction = 'left';
  directions = POPOVER_DIRECTIONS;
  get directionMarkup() {
    return `<p-popover direction="${this.direction}">${this.popoverContent}</p-popover>`;
  }

  accessibilityMarkup = `<p-text>
  Some content <p-popover aria="{ 'aria-label': 'Some more descriptive label' }">${this.popoverContent}</p-popover>
</p-text>`;

  withinTableMarkup = `<p-table caption="Some caption" style="max-width: 200px">
  <p-table-head>
    <p-table-head-row>
      <p-table-head-cell>
        Column 1<p-popover aria="{ 'aria-label': 'Some more descriptive label' }">${this.popoverContent}</p-popover></p-table-head-cell>
      <p-table-head-cell>Column 2</p-table-head-cell>
      <p-table-head-cell>Column 3</p-table-head-cell>
    </p-table-head-row>
  </p-table-head>
</p-table>`;
}
</script>
