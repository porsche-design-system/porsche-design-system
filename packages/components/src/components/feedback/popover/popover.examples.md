# Popover

The `p-popover` component can be used to display some additional content on top of another in conjunction with the info <p-icon name="information" aria="{ 'aria-label': 'Information icon' }"></p-icon>-button.

## Basic

It's important, that the Popover isn't used within a parent node having e.g. `overflow: hidden` as style defined. 
Then it might be shown cut-off under certain circumstances because it's placed relative to the info <p-icon name="information" aria="{ 'aria-label': 'Information icon' }"></p-icon>-button node technically.

<Playground :markup="basicMarkup"></Playground>

### ARIA attributes and states

Through the `aria` property you have the possibility to provide additional **ARIA** attributes to the component.

<Playground :markup="accessibilityMarkup"></Playground>

### <p-icon name="accessibility" size="medium" color="notification-neutral" aria-hidden="true"></p-icon> Accessibility hints
* Make sure to provide **descriptive**, self explaining **labels** which could be understood without context to expose a more descriptive experience to screen reader users, telling them what they can expect to read after clicking the info <p-icon name="information" aria="{ 'aria-label': 'Information icon' }"></p-icon>-button.

---

## Direction

It's possible to define a preferred direction in which the popover should open, given there is enough space in viewport. 
Otherwise, it will be opened in the direction with most available space automatically.

<Playground :markup="directionMarkup">
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

    direction = 'left';
    
    get basicMarkup() {
      return `<p-text>
  Some content <p-popover>Some additional content.</p-popover>
</p-text>`;
    }

    get directionMarkup() {
      return `<div style="height: 10rem; display: flex; justify-content: center; align-items: center;">
  <p-popover direction="${this.direction}">Some additional content.</p-popover>
</div>`;
    }

    get accessibilityMarkup() {
      return `<p-text>
  Some content <p-popover aria="{ 'aria-label': 'Some more descriptive label' }">Some additional content.</p-popover>
</p-text>`;
    }
  }
</script>