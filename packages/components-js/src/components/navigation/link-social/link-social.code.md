# Link Social

The `<p-link-social>` component is a set of pre defined social icons for various fields of application like linking to social media platforms or social sharing dialogs.

## Variants

Choose between a set of pre defined social icons.

<Playground :themeable="true" :childElementLayout="{spacing: 'inline'}">
  <template #configurator>
    <select v-model="icon" @change="getLabel">
      <option selected value="logo-facebook">Facebook</option>
      <option selected value="logo-google">Google</option>
      <option value="logo-instagram">Instagram</option>
      <option value="logo-linkedin">Linkedin</option>
      <option value="logo-pinterest">Pinterest</option>
      <option value="logo-twitter">Twitter</option>
      <option value="logo-wechat">WeChat</option>
      <option value="logo-whatsapp">WhatsApp</option>
      <option value="logo-xing">Xing</option>
      <option value="logo-youtube">YouTube</option>
    </select>
  </template>
  <template v-slot={theme}>
    <p-link-social href="#linkToSocialMedia" :icon="icon" :theme="theme">{{ label }}</p-link-social>
    <p-link-social href="#linkToSocialMedia" hide-label="true" :icon="icon" :theme="theme">{{ label }}</p-link-social>
  </template>
</Playground>

### Responsive

<Playground :themeable="true" :childElementLayout="{spacing: 'inline'}">
  <template v-slot={theme}>
    <p-link-social href="#linkToSocialMedia" hide-label="{ base: true, s: false }" :theme="theme">{{ label }}</p-link-social>
  </template>
</Playground>

---

## Wrapped with an anchor tag 

<Playground :themeable="true" :childElementLayout="{spacing: 'inline'}">
  <template v-slot={theme}>
    <a href="https://www.facebook.com/" class="example-link" target="_blank" rel="nofollow noopener">
      <p-link-social icon="logo-facebook" :theme="theme">Facebook</p-link-social>
    </a>
  </template>
</Playground>

---

## Specific icon
If another icon needs to be implemented, just replace the default icon with another predefined icon. Per default, all icons are fetched from the Porsche Design System CDN. Just choose an icon name from the `icon` property. If you need to link to another icon hosted somewhere else, just set the whole icon path to the `iconSource` prop.

<Playground :themeable="true" :childElementLayout="{spacing: 'inline'}">
  <template v-slot={theme}>
    <p-link-social href="#delicious" icon="logo-delicious" :theme="theme">Delicious</p-link-social>
    <p-link-social href="#kaixin" :icon-source="require(`./assets/icon-custom-kaixin.svg`)" :theme="theme">Kaixin</p-link-social>
  </template>
</Playground>

--- 

## Pattern of grouped components 

<Playground :themeable="true">
  <template v-slot={theme}>
    <div class="example-grouped">
      <p-link-social href="https://www.facebook.com/" icon="logo-facebook" hide-label="true" :theme="theme" class="">Facebook</p-link-social>
      <p-link-social href="https://www.google.com/" icon="logo-google" hide-label="true" :theme="theme" class="">Google</p-link-social>
      <p-link-social href="https://www.instagram.com/" icon="logo-instagram" hide-label="true" :theme="theme" class="">Instagram</p-link-social>
      <p-link-social href="https://www.linkedin.com/" icon="logo-linkedin" hide-label="true" :theme="theme">Linkedin</p-link-social>
      <p-link-social href="https://www.pinterest.com/" icon="logo-pinterest" hide-label="true" :theme="theme">Pinterest</p-link-social>
      <p-link-social href="https://www.twitter.com/" icon="logo-twitter" hide-label="true" :theme="theme">Twitter</p-link-social>
      <p-link-social href="https://www.wechat.com/" icon="logo-wechat" hide-label="true" :theme="theme">Wechat</p-link-social>
      <p-link-social href="https://wa.me/491525557912" icon="logo-whatsapp" hide-label="true" :theme="theme">Whatsapp</p-link-social>
      <p-link-social href="https://www.xing.com" icon="logo-xing" hide-label="true" :theme="theme">Xing</p-link-social>
      <p-link-social href="https://www.youtube.com" icon="logo-youtube" hide-label="true" :theme="theme">Youtube</p-link-social>
    </div>
  </template>
</Playground>

### SCSS code example how to achieve a grouped pattern

```scss  

// With CSS Grid (not suppoerted by IE11)
.example-grouped {
  display: grid;
  grid-template-columns: repeat( auto-fit, p-rem(48px) );
  grid-column-gap: p-rem(8px);
  grid-row-gap: p-rem(8px);
}

// Fallback with IE11 support
.example-grouped {
  &::before {
    content: "";
    display: block;
    margin-top: p-rem(-8px);
  }
  > * {
    margin-top: p-rem(8px);
    &:not(:last-child) {
      margin-right: p-rem(8px);
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
      this.label =  selectedOption.textContent;
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
      margin-top: p-rem(-8px);
    }
    > * {
      margin-top: p-rem(8px);
      &:not(:last-child) {
        margin-right: p-rem(8px);
      }
    }
  }
</style>