# Multi Select

<TableOfContents></TableOfContents>

## Basic usage

<Playground :markup="basic()" :config="config"></Playground>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class Code extends Vue {
  config = { themeable: true };

  basic() {
    return `<p-multi-select name="name" label="Some Label" description="Some description" required>
  <p-multi-select-option value="a">Option A</p-multi-select-option>
  <p-multi-select-option value="b">Option B</p-multi-select-option>
  <p-multi-select-option value="c">Option C</p-multi-select-option>
  <p-multi-select-option value="d">Option D</p-multi-select-option>
  <p-multi-select-option value="e">Option E</p-multi-select-option>
  <p-multi-select-option value="f">Option F</p-multi-select-option>
</p-multi-select>`;
  }
}
</script>
