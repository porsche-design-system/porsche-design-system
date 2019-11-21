# Link

The `link` component is essential to perform changes in page routes. They can be used with or without a label (as link icon only).


## Variants

Choose between predefined styling variants.

### Primary

<Playground :themeable="true" :childElementLayout="{spacing: 'inline'}">
  <template v-slot={theme}>
    <p-link variant="primary" href="https://www.porsche.com" :theme="theme">Some label</p-link>
    <p-link variant="primary" href="https://www.porsche.com" ally-label="Some action description" :theme="theme" />
  </template>
</Playground>

### Secondary (default)

<Playground :themeable="true" :childElementLayout="{spacing: 'inline'}">
  <template v-slot={theme}>
    <p-link :theme="theme">Some label</p-link>
    <p-link ally-label="Some action description" :theme="theme" />
  </template>
</Playground>

### Tertiary

<Playground :themeable="true" :childElementLayout="{spacing: 'inline'}">
  <template v-slot={theme}>
    <p-link variant="tertiary" :theme="theme">Some label</p-link>
    <p-link variant="tertiary" ally-label="Some action description" :theme="theme" />
  </template>
</Playground>

---

## Link with dynamic labeling
In some cases (e.g. on smaller viewports) it might be necessary to show/hide the label programmatically and render the link as icon only. This can be achieved by changing the `hide-label` property with a boolean.

<Playground :themeable="true">
    <template #configurator>
      <select @change="toggleLabel = $event.target.value">
        <option selected value="true">Hide label</option>
        <option value="false">Show label</option>
      </select>
    </template>
    <template v-slot={theme}>
      <p-link :hide-label="toggleLabel" :theme="theme">Some label</p-link>
    </template>
</Playground>

---

## Link with specific icon
If another icon needs to be implemented, just replace the default icon with your new icon. Per default, all icons are fetched from the Porsche UI Kit CDN. Just choose an icon name from the `icon` property. If you need to link to another icon hosted somewhere else, just set the whole icon path to the `icon` prop.

<Playground :themeable="true" :childElementLayout="{spacing: 'inline'}">
  <template v-slot={theme}>
    <p-link icon="phone" :theme="theme">Some label</p-link>
    <p-link :icon-source="require(`@/assets/web/icon-custom-kaixin.svg`)" :theme="theme">Some label</p-link>
    <br>
    <p-link icon="phone" ally-label="Some action description" :theme="theme" />
    <p-link :icon-source="require(`@/assets/web/icon-custom-kaixin.svg`)" ally-label="Some action description" :theme="theme" />
  </template>
</Playground>

## Bind events to the Link
You can use native `click`, `focus`, `focusin`, `blur` and `focusout` events on the button.

<Playground :themeable="true" :childElementLayout="{spacing: 'inline'}">
  <template v-slot={theme}>
    <p-link
        onclick="alert('click')"
        onfocus="console.log('focus')"
        onfocusin="console.log('focusin')"
        onblur="console.log('blur')"
        onfocusout="console.log('focusout')"
        ally-label="Some action description"
        :theme="theme"
    />
  </template>
</Playground>

## Remove Link from tab order
With setting the `tabbable` property to `false` you can remove the link from the tab order.

<Playground :themeable="true" :childElementLayout="{spacing: 'inline'}">
  <template v-slot={theme}>
    <p-link tabbable="true" ally-label="Some action description" :theme="theme" />
    <p-link tabbable="false" ally-label="Some action description" :theme="theme" />
  </template>
</Playground>


<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  
  @Component
  export default class PlaygroundTypography extends Vue {
    public toggleLabel: boolean = true;
    
  }
</script>