# Spinner

There are unavoidable moments when the user has to wait for more than 1 second (for example due to technical processing of information or requests).
These moments should be bridged with a good user feedback in order to not leave the user uncertain about what's currently happening - also to avoid a high bounce rate and to obtain a positive impression of your website or application.

For ongoing operations between 2-10 seconds, where the loading progress cannot be determined, use a **Spinner** (looped indicator) to inform the user about an ongoing operation. Use it either stand-alone (for example as page loader) or within components, such as in Buttons to indicate progress after clicking "save".

<TableOfContents></TableOfContents>

## Size

There are predefined sizes for the component available which should cover most use cases. 
If a specific size is needed, the size can be set to `inherit` to specify the text size from outside.

<Playground :markup="sizeMarkup" :config="config">
  <select v-model="size" aria-label="Select size">
    <option disabled>Select a size</option>
    <option>small</option>
    <option>medium</option>
    <option>large</option>
    <option>inherit</option>
  </select>
</Playground>

### Responsive

The settings above can also be used on different major breakpoints `xs`, `s`, `m`, `l`, `xl`.

<Playground :markup="responsive" :config="config"></Playground>

### <A11yIcon></A11yIcon> Accessibility hints
To announce the correct loading state for **screen reader** users, it is mandatory to provide a meaningful state description through **ARIA** with the `aria` property.

---

## Technical notes

For automated visual regression tests the spinner animation can be disabled by setting a global css variable: 

```
:root {
  --p-animation-duration__spinner: 0s !important;
}
```

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class Code extends Vue {
  config = { themeable: true };
  
  size = 'small';
  
  get sizeMarkup() {
    const style = this.size === 'inherit' ? ' style="width: 96px; height: 96px;"' : '';
    return `<p-spinner size="${this.size}"${style} aria="{ 'aria-label': 'Loading page content' }" />`;
  }
  
  responsive =
`<p-spinner size="{ base: 'small', l: 'medium' }" aria="{ 'aria-label': 'Loading page content' }" />`;

}
</script>
