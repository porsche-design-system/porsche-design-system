# Link Social

The Link Social component enables the user to link to social media platforms or social sharing dialogs.
For an optimal user guidance and dedicated pursuit of goals different types of links can be used.


---

## Variants

### Icon and text

<p-link-social href="https://www.facebook.com/" icon="logo-facebook">Facebook</p-link-social>

Due to better comprehensibility and accessibility, you should preferably go for this variant.
The length of the link always adapts to the length of the text label. 

### Icon only

<p-link-social href="https://www.facebook.com/" icon="logo-facebook" hide-label="true">Facebook</p-link-social>

This variant contains an icon only with no further text information.

### Group

<p class="example-grouped">
  <p-link-social href="https://www.facebook.com/" icon="logo-facebook" hide-label="true">Facebook</p-link-social>
  <p-link-social href="https://www.google.com/" icon="logo-google" hide-label="true">Google</p-link-social>
  <p-link-social href="https://www.instagram.com/" icon="logo-instagram" hide-label="true">Instagram</p-link-social>
  <p-link-social href="https://www.linkedin.com/" icon="logo-linkedin" hide-label="true">LinkedIn</p-link-social>
  <p-link-social href="https://www.pinterest.com/" icon="logo-pinterest" hide-label="true">Pinterest</p-link-social>
  <p-link-social href="https://www.twitter.com/" icon="logo-twitter" hide-label="true">Twitter</p-link-social>
  <p-link-social href="https://www.wechat.com/" icon="logo-wechat" hide-label="true">Wechat</p-link-social>
  <p-link-social href="https://wa.me/491525557912" icon="logo-whatsapp" hide-label="true">Whatsapp</p-link-social>
  <p-link-social href="https://www.xing.com" icon="logo-xing" hide-label="true">XING</p-link-social>
  <p-link-social href="https://www.youtube.com" icon="logo-youtube" hide-label="true">Youtube</p-link-social>
</p>

The Link Social group contains the most used social icons that can be used as a group.

---

## States

The Social Link covers the following states:

* Default
* Hover
* Focus

---

## Styling

### Icon
The icon corresponds to the logo of the respective social platform. For the specific social icons the corresponding icon must be used.

### Text label
The text label within a link should always be short and descriptive.

### Hover
For the most used social icons, we use the brand color as hover state. For specific social icons, where we do not offer the brand color, the color #151718 must be used as hover (analogous to the link).


<style scoped lang="scss">
  @import "~@porsche-design-system/scss-utils/index";
  
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