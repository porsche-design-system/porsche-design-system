# Link Social

The Link Social component enables the user to link to social media platforms or social sharing dialogs.
For an optimal user guidance and dedicated pursuit of goals different types of links can be used.


---

## Variants

### Icon and text

<p-link-social href="https://www.facebook.com/" icon="logo-facebook">Facebook</p-link-social>

Due to better comprehensibility and accessibility, you should preferably go for this variant. The length of the link always adapts to the length of the text label. As for the icon, you can either choose between one of the social platform icons provided in the Porsche icon set or also use a specific icon, whereas it must refer (which should be clear) to a social platform.

### Icon only

<p-link-social href="https://www.facebook.com/" icon="logo-facebook" hide-label="true">Facebook</p-link-social>

This variant contains an icon only with no further text information. It should preferably be used e.g. for social sharing links, when the user is totally aware of the button functionality due to a clear context.

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
The icon refers to the logo of the respective social platform. For the specific social icons the corresponding icon must be used.

### Text label
The text label within a link should always be short and descriptive.

### Hover state
As for the social icons that are currently provided in the Porsche Design System, the background changes to the specific corporate social platform color on hover. For specific social icons, for which no brand color is currently provided in the Porsche Design System, a dark grey must be used as hover color instead (as defined for the standard [Button](#/components/action/button)/[Link](#/components/navigation/link)).


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