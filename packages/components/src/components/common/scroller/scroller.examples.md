# Scroller

The `p-scroller` component forces its child nodes to be rendered horizontally next to each other. In case not enough
viewport space is given a clickable scroll indicator is shown and the element becomes scrollable.

<TableOfContents></TableOfContents>

## Basic

<Playground :markup="basicMarkup" :config="config"></Playground>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
  
@Component
export default class Code extends Vue {
  config = { themeable: true };
  
  basicMarkup = `<p-scroller>
  <span>Some element 1</span>
  <span>Some element 2</span>
  <span>Some element 3</span>
  <span>Some element 4</span>
  <span>Some element 5</span>
  <span>Some element 6</span>
  <span>Some element 7</span>
  <span>Some element 8</span>
  <span>Some element 9</span>
  <span>Some element 10</span>
</p-scroller>`;
}
</script>

<style lang="scss">
  p-scroller > * {
    border: 1px solid deeppink;
    padding: 2.5rem;

    &:not(:last-child) {
      margin-right: 1rem;
    }
  }
</style>
