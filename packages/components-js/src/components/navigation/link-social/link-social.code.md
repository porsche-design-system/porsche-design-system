# Link Social

The `<p-link-social>` component is a set of pre-defined social icons for various fields of application like linking to social media platforms or social sharing dialogs.

## Variants

Choose between a set of pre-defined social icons.

<Playground :themeable="true" :childElementLayout="{spacing: 'inline'}">
  <template #configurator>
    <select v-model="icon" @change="getLabel">
      <option disabled>Select a social platform</option>
      <option value="logo-facebook">Facebook</option>
      <option value="logo-google">Google</option>
      <option value="logo-instagram">Instagram</option>
      <option value="logo-linkedin">LinkedIn</option>
      <option value="logo-pinterest">Pinterest</option>
      <option value="logo-twitter">Twitter</option>
      <option value="logo-wechat">WeChat</option>
      <option value="logo-whatsapp">WhatsApp</option>
      <option value="logo-xing">XING</option>
      <option value="logo-youtube">YouTube</option>
    </select>
  </template>
  <template v-slot={theme}>
    <p-link-social href="#linkToSocialMedia" :icon="icon" :theme="theme" target="_blank" rel="nofollow noopener">{{ label }}</p-link-social>
    <p-link-social href="#linkToSocialMedia" hide-label="true" :icon="icon" :theme="theme" target="_blank" rel="nofollow noopener">{{ label }}</p-link-social>
  </template>
</Playground>

### Responsive

<Playground :themeable="true" :childElementLayout="{spacing: 'inline'}">
  <template v-slot={theme}>
    <p-link-social href="https://www.facebook.com/" icon="logo-facebook" hide-label="{ base: true, l: false }" :theme="theme" target="_blank" rel="nofollow noopener">Facebook</p-link-social>
  </template>
</Playground>

---

## Link used with an anchor tag as a slot (e.g. for framework routing)

The **link-social** component can also be used with an explicit anchor tag, in case you have to provide the link via a framework specific router.

<Playground :themeable="true" :childElementLayout="{spacing: 'inline'}">
  <template v-slot={theme}>
    <p-link-social :theme="theme" icon="logo-facebook"><a href="https://www.facebook.com/" target="_blank" rel="nofollow noopener">Facebook</a></p-link-social>
    <p-link-social :theme="theme" icon="logo-facebook" hide-label="true"><a href="https://www.facebook.com/" target="_blank" rel="nofollow noopener">Facebook</a></p-link-social>
  </template>
</Playground>

---

## Wrapped with an anchor tag (alternative for framework routing)

In case the router component must be wrapped around `<p-link-social>`, please take care of the correct styling of the rendered router `<a>` tag like in the example below (in most cases `outline` and `text-decoration` must be set to `none`).

<Playground :themeable="true" :childElementLayout="{spacing: 'inline'}">
  <template v-slot={theme}>
    <a href="https://www.facebook.com/" class="example-link" target="_blank" rel="nofollow noopener">
      <p-link-social icon="logo-facebook" :theme="theme">Facebook</p-link-social>
    </a>
    <a href="https://www.facebook.com/" class="example-link" target="_blank" rel="nofollow noopener">
      <p-link-social icon="logo-facebook" hide-label="true" :theme="theme">Facebook</p-link-social>
    </a>
  </template>
</Playground>

---

## Specific icon
If another icon needs to be implemented, just replace the default icon with another pre-defined icon. Per default, all icons are fetched from the Porsche Design System CDN. Just choose an icon name from the `icon` property. If you need to link to another icon hosted somewhere else, just set the whole icon path to the `iconSource` prop.

<Playground :themeable="true" :childElementLayout="{spacing: 'inline'}">
  <template v-slot={theme}>
    <p-link-social href="#tumblr" icon="logo-tumblr" :theme="theme" target="_blank" rel="nofollow noopener">Tumblr</p-link-social>
    <p-link-social href="#kaixin" :icon-source="require(`./assets/icon-custom-kaixin.svg`)" hide-label="true" :theme="theme" target="_blank" rel="nofollow noopener">Kaixin</p-link-social>
  </template>
</Playground>

--- 

## Pattern of grouped components 

<Playground :themeable="true">
  <template v-slot={theme}>
    <div class="example-grouped">
      <p-link-social href="https://www.facebook.com/" icon="logo-facebook" hide-label="true" :theme="theme" target="_blank" rel="nofollow noopener">Facebook</p-link-social>
      <p-link-social href="https://www.google.com/" icon="logo-google" hide-label="true" :theme="theme" target="_blank" rel="nofollow noopener">Google</p-link-social>
      <p-link-social href="https://www.instagram.com/" icon="logo-instagram" hide-label="true" :theme="theme" target="_blank" rel="nofollow noopener">Instagram</p-link-social>
      <p-link-social href="https://www.linkedin.com/" icon="logo-linkedin" hide-label="true" :theme="theme" target="_blank" rel="nofollow noopener">LinkedIn</p-link-social>
      <p-link-social href="https://www.pinterest.com/" icon="logo-pinterest" hide-label="true" :theme="theme" target="_blank" rel="nofollow noopener">Pinterest</p-link-social>
      <p-link-social href="https://www.twitter.com/" icon="logo-twitter" hide-label="true" :theme="theme" target="_blank" rel="nofollow noopener">Twitter</p-link-social>
      <p-link-social href="https://www.wechat.com/" icon="logo-wechat" hide-label="true" :theme="theme" target="_blank" rel="nofollow noopener">Wechat</p-link-social>
      <p-link-social href="https://wa.me/491525557912" icon="logo-whatsapp" hide-label="true" :theme="theme" target="_blank" rel="nofollow noopener">Whatsapp</p-link-social>
      <p-link-social href="https://www.xing.com" icon="logo-xing" hide-label="true" :theme="theme" target="_blank" rel="nofollow noopener">XING</p-link-social>
      <p-link-social href="https://www.youtube.com" icon="logo-youtube" hide-label="true" :theme="theme" target="_blank" rel="nofollow noopener">Youtube</p-link-social>
    </div>
  </template>
</Playground>

### SCSS code example how to achieve a grouped pattern

```scss  

// With CSS Grid (The more elegant way but not suppoerted by IE11)
.example-grouped {
  display: grid;
  grid-template-columns: repeat(auto-fit, p-rem(48px));
  grid-column-gap: $p-spacing-8;
  grid-row-gap: $p-spacing-8;
}

// Fallback with IE11 support
.example-grouped {
  &::before {
    content: "";
    display: block;
    margin-top: -$p-spacing-8;
  }
  > * {
    margin-top: $p-spacing-8;
    &:not(:last-child) {
      margin-right: $p-spacing-8;
    }
  }
}

``` 

---

## Bind events to the Link
You can use native `click`, `focus`, `focusin`, `blur` and `focusout` events on the link.

<Playground :themeable="true" :childElementLayout="{spacing: 'inline'}">
  <template v-slot={theme}>
    <p-link-social
        href="https://www.facebook.com/"
        icon="logo-facebook"
        onclick="alert('click'); return false;"
        onfocus="console.log('focus')"
        onfocusin="console.log('focusin')"
        onblur="console.log('blur')"
        onfocusout="console.log('focusout')"
        :theme="theme"
        target="_blank" 
        rel="nofollow noopener"
    >Facebook</p-link-social>
  </template>
</Playground>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  
  @Component
  export default class PlaygroundLinkSocial extends Vue {
    public icon: string = 'logo-facebook';
    public label: string = 'Facebook';
    
    public getLabel(event) {
      const options = event.target.options;
      const selectedOption = options[options.selectedIndex];
      this.label = selectedOption.textContent;
    };
  }
</script>

<style scoped lang="scss">
  @import "~@porsche-design-system/scss-utils/index";
  
  .example-link {
    display: inline-block;
    outline: none;
    text-decoration: none;
  }
  
  .example-grouped {
    &::before {
      content: "";
      display: block;
      margin-top: -$p-spacing-8;
    }
    > * {
      margin-top: $p-spacing-8;
      &:not(:last-child) {
        margin-right: $p-spacing-8;
      }
    }
  }
</style>