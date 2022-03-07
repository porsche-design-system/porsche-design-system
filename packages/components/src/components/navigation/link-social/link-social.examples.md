# Link Social

The `p-link-social` component is a set of pre-defined social icons for various fields of application like linking to social media platforms or social sharing dialogs.

<TableOfContents></TableOfContents>

## Variants

Choose between a set of pre-defined social icons.

<Playground :markup="variants" :config="config">
  <select v-model="platform" aria-label="Select social platform">
    <option disabled>Select social platform</option>
    <option value="Facebook">Facebook</option>
    <option value="Google">Google</option>
    <option value="Instagram">Instagram</option>
    <option value="KakaoTalk">KakaoTalk</option>
    <option value="LinkedIn">LinkedIn</option>
    <option value="Naver">Naver</option>
    <option value="Pinterest">Pinterest</option>
    <option value="Reddit">Reddit</option>
    <option value="TikTok">TikTok</option>
    <option value="Twitter">Twitter</option>
    <option value="WeChat">WeChat</option>
    <option value="WhatsApp">WhatsApp</option>
    <option value="XING">XING</option>
    <option value="YouTube">YouTube</option>
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

## Bind events to the link

You can use native `click`, `focus`, `focusin`, `blur` and `focusout` events on the link.

<Playground :markup="events" :config="config"></Playground>

---

## Remove Link Social from tab order

By setting the `tabindex` attribute to `-1` you can remove the **Link Social** from the tab order.

<Playground :markup="taborder" :config="config"></Playground>


<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class Code extends Vue {
  config = { themeable: true, spacing: 'inline' };
  platform = 'Facebook';

  get icon() {
    return `logo-${this.platform.toLowerCase()}`;
  }
  
  get variants() {
    return `<p-link-social href="https://example.com" icon="${this.icon}" target="_blank" rel="nofollow noopener">${this.platform}</p-link-social>
<p-link-social href="https://example.com" hide-label="true" icon="${this.icon}" target="_blank" rel="nofollow noopener">${this.platform}</p-link-social>`;
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
<p-link-social href="https://www.kakaocorp.com/" icon="logo-kakaotalk" hide-label="true" target="_blank" rel="nofollow noopener">KakaoTalk</p-link-social>
<p-link-social href="https://www.linkedin.com/" icon="logo-linkedin" hide-label="true" target="_blank" rel="nofollow noopener">LinkedIn</p-link-social>
<p-link-social href="https://www.naver.com/" icon="logo-naver" hide-label="true" target="_blank" rel="nofollow noopener">Naver</p-link-social>
<p-link-social href="https://www.pinterest.com/" icon="logo-pinterest" hide-label="true" target="_blank" rel="nofollow noopener">Pinterest</p-link-social>
<p-link-social href="https://www.reddit.com/" icon="logo-reddit" hide-label="true" target="_blank" rel="nofollow noopener">Reddit</p-link-social>
<p-link-social href="https://www.tiktok.com/" icon="logo-tiktok" hide-label="true" target="_blank" rel="nofollow noopener">TikTok</p-link-social>
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

  taborder =
`<p-link-social href="https://www.porsche.com">Some label</p-link-social>
<p-link-social href="https://www.porsche.com" tabindex="-1">Some label</p-link-social>
<p-link-social href="https://www.porsche.com">Some label</p-link-social>`;
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