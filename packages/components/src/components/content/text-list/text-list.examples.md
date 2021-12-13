# Text List

The `p-text-list` component is used to display listed data in form of an unordered or ordered list. A list depends on two parts (like any native HTML list):
A list wrapper which defines the type of the list (unordered or ordered) and the list items. 
Nesting is also provided and follows the same nesting rules like native HTML lists. For more complex data you should consider the use of a data table.

<TableOfContents></TableOfContents>

## Unordered list

<Playground :markup="list()" :config="config"></Playground>

## Ordered list - numbered

<Playground :markup="list('ordered')" :config="config"></Playground>

## Ordered list - alphabetically

<Playground :markup="list('ordered', 'alphabetically')" :config="config"></Playground>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  
  @Component
  export default class Code extends Vue {
    config = { themeable: true };
    
    list(listType?: string, orderType?: string) {
      const attr = (listType ? ` list-type="${listType}"` : '') + (orderType ? ` order-type="${orderType}"` : '');
      return `<p-text-list${attr}>
  <p-text-list-item>The quick brown fox jumps over the lazy dog</p-text-list-item>
  <p-text-list-item>The quick <a href="https://porsche.com">brown fox</a> jumps <b>over</b> the <strong>lazy</strong> dog
    <p-text-list${attr}>
      <p-text-list-item>The quick brown fox jumps over the lazy dog</p-text-list-item>
      <p-text-list-item>The quick brown fox jumps over the lazy dog, the lazy dog jumps over the quick brown fox</p-text-list-item>
        <p-text-list-item>The quick <a href="https://porsche.com">brown fox</a> jumps <b>over</b> the <strong>lazy</strong> dog
          <p-text-list${attr}>
            <p-text-list-item>The quick brown fox jumps over the lazy dog</p-text-list-item>
            <p-text-list-item>The quick brown fox jumps over the lazy dog, the lazy dog jumps over the quick brown fox</p-text-list-item>
          </p-text-list>
        </p-text-list-item>
    </p-text-list>
  </p-text-list-item>
  <p-text-list-item>The quick brown fox jumps over the lazy dog</p-text-list-item>
</p-text-list>`;
    }
  }
</script>