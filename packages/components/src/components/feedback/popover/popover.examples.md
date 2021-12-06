# Popover

The `p-popover` component can be used to display some additional content on top of another in conjunction with 
the info <p-icon name="information" aria="{ 'aria-label': 'Information icon' }"></p-icon>-button.

## Basic

It's important, that the Popover isn't used within a parent node having e.g. `overflow: hidden` as style defined. 
Then it might be shown cut-off under certain circumstances because it's placed relative 
to the info <p-icon name="information" aria="{ 'aria-label': 'Information icon' }"></p-icon>-button node technically.

Only one Popover can be opened at the time, by clicking another Popover the opened Popover will be closed.

You can use the `description` or the slot of the Popover to provide content which will be displayed in the open popover.

<Playground :markup="basicMarkup" :config="config"></Playground>

### ARIA attributes and states

Through the `aria` property you have the possibility to provide additional **ARIA** attributes to the component.

<Playground :markup="accessibilityMarkup" :config="config"></Playground>

### <p-icon name="accessibility" size="medium" color="notification-neutral" aria-hidden="true"></p-icon> Accessibility hints

- Make sure to provide a **descriptive**, self explaining **label** which could be understood without context to expose a more descriptive experience to screen reader users, telling them what they can expect to read after clicking the info <p-icon name="information" aria="{ 'aria-label': 'Information icon' }"></p-icon>-button.

---

## Direction

It's possible to define a preferred direction in which the popover should open, given there is enough space in viewport. Otherwise, it will be opened in the direction with most available space automatically.

<Playground :markup="directionMarkup" :config="config">
  <select v-model="direction">
    <option disabled>Select a direction</option>
    <option value="top">Top</option>
    <option value="right">Right</option>
    <option value="bottom">Bottom</option>
    <option value="left">Left</option>
  </select>
</Playground>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  
  @Component
  export default class Code extends Vue {
    config = { overflowX: true };

    direction = 'left';
    popoverContent = 'Some additional content.';
    
    basicMarkup = `<p-text>
  Some content <p-popover>${this.popoverContent}</p-popover> which is longer. <br />
  Some continuous content <p-popover description="${this.popoverContent}"></p-popover>.
</p-text>`;

    descriptionMarkup = `<p-popover description="${this.popoverContent}"></p-popover>`;

    get directionMarkup() {
      return `<p-popover direction="${this.direction}">${this.popoverContent}</p-popover>`;
    }

    accessibilityMarkup = `<p-text>
  Some content <p-popover aria="{ 'aria-label': 'Some more descriptive label' }">${this.popoverContent}</p-popover>
</p-text>`;
    
  }
</script>
