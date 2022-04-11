# Tags

<TableOfContents></TableOfContents>

## Tag Dismissible

`p-tag-dismissible` is used in contexts where the user can actively remove tags. It is often seen in filtering.  

It is a controlled component and behaves similar to a button. The functionality to dismiss the tag needs to be implemented by e.g. `onClick` listener.  


## Color

<Playground :markup="colorMarkup" :config="{ ...config, colorScheme: backgroundColorScheme }">
  <select v-model="backgroundColorScheme" aria-label="Select background color">
    <option disabled>Select background color</option>
    <option value="default">Default</option>
    <option value="surface">Surface</option>
  </select>
</Playground>

## Label

<Playground :markup="label" :config="config"></Playground>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component'; 
import { TAG_DISMISSIBLE_COLOR } from "./tag-dismissible-utils"; 

@Component
export default class Code extends Vue {
  config = { spacing: 'inline' };
  backgroundColorScheme = 'default';


  get colorMarkup(){
    return TAG_DISMISSIBLE_COLOR.map((color) => `<p-tag-dismissible color="${color}">Color ${color}</p-tag-dismissible>`).join('\n');
  };

  label = `<p-tag-dismissible label="Some label">Some content</p-tag-dismissible>`;

}
</script>