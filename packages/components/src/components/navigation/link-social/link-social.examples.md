# Link Social

The `<p-link-social>` component is a set of pre-defined social icons for various fields of application like linking to social media platforms or social sharing dialogs.

## Variants

Choose between a set of pre-defined social icons.

<Playground :markup="variants" :config="config">
  <select v-model="icon" @change="setLabel">
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
</Playground>

### Responsive

<Playground :markup="responsive" :config="config"></Playground>

---

## Framework routing (anchor nesting)

To support custom anchor tags (e.g. framework specific routing) you can provide them as a **slotted element** of the component. 

<Playground :markup="routing" :config="config"></Playground>

---

## Specific icon
If another icon needs to be implemented, just replace the default icon with another pre-defined icon. Per default, all icons are fetched from the Porsche Design System CDN. Just choose an icon name from the `icon` property. If you need to link to another icon hosted somewhere else, just set the whole icon path to the `iconSource` prop.

<Playground :markup="iconMarkup" :config="config"></Playground>

--- 

## Pattern of grouped components 

<Playground :markup="grouped" :config="config"></Playground>

### SCSS code example how to achieve a grouped pattern

```scss  
// With CSS Grid (The more elegant way but not suppoerted by IE11)
.example-grouped {
  display: grid;
  grid-template-columns: repeat(auto-fit, p-px-to-rem(48px));
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

<Playground :markup="events" :config="config"></Playground>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  
  @Component
  export default class Code extends Vue {
    config = { themeable: true, spacing: 'inline' };
    
    icon = 'logo-facebook';
    label = 'Facebook';
    
    get variants() {
      return `<p-link-social href="https://example.com" icon="${this.icon}" target="_blank" rel="nofollow noopener">${this.label}</p-link-social>
<p-link-social href="https://example.com" hide-label="true" icon="${this.icon}" target="_blank" rel="nofollow noopener">${this.label}</p-link-social>`;
    }
    
    responsive =
`<p-link-social href="https://www.facebook.com/" icon="logo-facebook" hide-label="{ base: true, l: false }" target="_blank" rel="nofollow noopener">Facebook</p-link-social>`;
    
    routing =
`<p-link-social icon="logo-facebook">
  <a href="https://www.facebook.com/" target="_blank" rel="nofollow noopener">Facebook</a>
</p-link-social>`;

    iconMarkup =
`<p-link-social href="https://example.com" icon="logo-tumblr" target="_blank" rel="nofollow noopener">Tumblr</p-link-social>
<p-link-social href="https://example.com" icon-source="${require('./assets/icon-custom-kaixin.svg')}" hide-label="true" target="_blank" rel="nofollow noopener">Kaixin</p-link-social>`;

    grouped =
`<div class="example-grouped">
<p-link-social href="https://www.facebook.com/" icon="logo-facebook" hide-label="true" target="_blank" rel="nofollow noopener">Facebook</p-link-social>
<p-link-social href="https://www.google.com/" icon="logo-google" hide-label="true" target="_blank" rel="nofollow noopener">Google</p-link-social>
<p-link-social href="https://www.instagram.com/" icon="logo-instagram" hide-label="true" target="_blank" rel="nofollow noopener">Instagram</p-link-social>
<p-link-social href="https://www.linkedin.com/" icon="logo-linkedin" hide-label="true" target="_blank" rel="nofollow noopener">LinkedIn</p-link-social>
<p-link-social href="https://www.pinterest.com/" icon="logo-pinterest" hide-label="true" target="_blank" rel="nofollow noopener">Pinterest</p-link-social>
<p-link-social href="https://www.twitter.com/" icon="logo-twitter" hide-label="true" target="_blank" rel="nofollow noopener">Twitter</p-link-social>
<p-link-social href="https://www.wechat.com/" icon="logo-wechat" hide-label="true" target="_blank" rel="nofollow noopener">Wechat</p-link-social>
<p-link-social href="https://wa.me/491525557912" icon="logo-whatsapp" hide-label="true" target="_blank" rel="nofollow noopener">Whatsapp</p-link-social>
<p-link-social href="https://www.xing.com" icon="logo-xing" hide-label="true" target="_blank" rel="nofollow noopener">XING</p-link-social>
<p-link-social href="https://www.youtube.com" icon="logo-youtube" hide-label="true" target="_blank" rel="nofollow noopener">Youtube</p-link-social>
</div>`;

    events =
`<p-link-social
  href="https://www.facebook.com/"
  icon="logo-facebook"
  onclick="alert('click'); return false;"
  onfocus="console.log('focus')"
  onfocusin="console.log('focusin')"
  onblur="console.log('blur')"
  onfocusout="console.log('focusout')"
  target="_blank" 
  rel="nofollow noopener"
>Facebook</p-link-social>`;

    setLabel(event: ChangeEvent) {
      const { options } = event.target;
      this.label = options[options.selectedIndex].textContent;
    };
  }
</script>

<style scoped lang="scss">
  @import "~@porsche-design-system/utilities/scss";
  
  ::v-deep .example-link {
    display: inline-block;
    outline: none;
    text-decoration: none;
  }
  
  ::v-deep .example-grouped {
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