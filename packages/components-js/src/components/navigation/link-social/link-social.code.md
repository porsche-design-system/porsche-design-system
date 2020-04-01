# Link Social

The `<p-link-social>` component is a set of pre defined social icons for various fields of application like linking to social media platforms or social sharing dialogs.

## Variants

Choose between a set of different social icons or use a custom one.

<Playground :themeable="true" :childElementLayout="{spacing: 'inline'}">
  <template #configurator>
    <select v-model="icon">
      <option selected value="logo-facebook">Facebook</option>
      <option value="logo-linkedin">Linkedin</option>
      <option value="logo-instagram">Instagram</option>
    </select>
  </template>
  <template v-slot={theme}>
    <p-link-icon href="#linkToSocialMedia" :icon="icon">Facebook</p-link-icon>
  </template>
</Playground>

---

## Wrapped with an anchor tag (e.g. for framework routing)
If the component is used within a JS framework, it might be applied within a framework specific router component. 
In this case the router component must be wrapped around `<p-link>`. Please take care of the correct styling of the rendered router `<a>` tag like in the example below (in most cases `outline` and `text-decoration` must be set to `none`).


<Playground :themeable="true" :childElementLayout="{spacing: 'inline'}">
  <template v-slot={theme}>
    <a href="#" class="example-link" target="_blank" rel="nofollow noopener">
      <p-link-social icon="logo-facebook" :theme="theme">Facebook</p-link-social>
    </a>
  </template>
</Playground>

---

## Link with specific icon
If another icon needs to be implemented, just replace the default icon with another predefined icon. Per default, all icons are fetched from the Porsche Design System CDN. Just choose an icon name from the `icon` property. If you need to link to another icon hosted somewhere else, just set the whole icon path to the `iconSource` prop.

<Playground :themeable="true" :childElementLayout="{spacing: 'inline'}">
  <template v-slot={theme}>
    <p-link href="#kaixin" :icon-source="require(`./assets/icon-custom-kaixin.svg`)" :theme="theme">Kaixin</p-link>
  </template>
</Playground>

## Bind events to the Link
You can use native `click`, `focus`, `focusin`, `blur` and `focusout` events on the link.

<Playground :themeable="true" :childElementLayout="{spacing: 'inline'}">
  <template v-slot={theme}>
    <p-link-social
        href="#facebook"
        onclick="alert('click'); return false;"
        onfocus="console.log('focus')"
        onfocusin="console.log('focusin')"
        onblur="console.log('blur')"
        onfocusout="console.log('focusout')"
        :theme="theme"
    >Facebook</p-link-social>
  </template>
</Playground>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  
  @Component
  export default class PlaygroundLinkSocial extends Vue {
    public icon: string = 'facebook';
  }
</script>

<style scoped lang="scss">
  .example-link {
    display: inline-block;
    outline: none;
    text-decoration: none;
  }
</style>