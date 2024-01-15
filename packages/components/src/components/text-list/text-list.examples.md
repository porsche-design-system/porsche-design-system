<ComponentHeading name="Text List"></ComponentHeading>

The `p-text-list` component is used to display listed data in form of an unordered or ordered list. A list depends on
two parts (like any native HTML list): A list wrapper which defines the type of the list (unordered or ordered) and the
list items. Nesting is also provided and follows the same nesting rules like native HTML lists. For more complex data
you should consider the use of a data table.

<TableOfContents></TableOfContents>

<Notification heading="Deprecation hint" state="warning">
  The <code>listType</code> and <code>orderType</code> properties have been deprecated and will be removed with the next major release.<br>
  Please use the <code>type</code> property instead.
</Notification>

## Unordered list

<Playground :markup="list()" :config="config"></Playground>

## Ordered list - numbered

<Playground :markup="list('numbered')" :config="config"></Playground>

## Ordered list - alphabetically

<Playground :markup="list('alphabetically')" :config="config"></Playground>

## Mixed list - (ordered / unordered)

<Playground :markup="listMixed()" :config="config"></Playground>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class Code extends Vue {
  config = { themeable: true };
  
  list(type?: string) {
    const attr = type ? ` type="${type}"` : '';
    return `<p-text-list${attr}>
  <p-text-list-item>The quick brown fox jumps over the lazy dog</p-text-list-item>
  <p-text-list-item>The quick brown fox jumps over the lazy dog
    <p-text-list${attr}>
      <p-text-list-item>The quick brown fox jumps over the lazy dog</p-text-list-item>
      <p-text-list-item>The quick brown fox jumps over the lazy dog</p-text-list-item>
    </p-text-list>
  </p-text-list-item>
  <p-text-list-item>The quick brown fox jumps over the lazy dog</p-text-list-item>
</p-text-list>`;
  }

  listMixed() {
    return `<p-text-list type="numbered">
  <p-text-list-item>The quick brown fox jumps over the lazy dog</p-text-list-item>
  <p-text-list-item>The quick brown fox jumps over the lazy dog
    <p-text-list>
      <p-text-list-item>The quick brown fox jumps over the lazy dog</p-text-list-item>
      <p-text-list-item>The quick brown fox jumps over the lazy dog</p-text-list-item>
    </p-text-list>
  </p-text-list-item>
  <p-text-list-item>The quick brown fox jumps over the lazy dog</p-text-list-item>
</p-text-list>`;
  }
}
</script>
