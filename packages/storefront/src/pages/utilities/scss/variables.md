# Scss

<TableOfContents></TableOfContents>

## Color

<p-inline-notification heading="Important note" state="error" persistent="true">
  <code>Color</code> is <strong>deprecated</strong> and the values have <strong>changed</strong>.<br>
  Please use the provided <code>colors</code> at <a href="/styles/theme">theme</a>.
</p-inline-notification>

A light and dark theme is available depending on which background it's used.

<br>
<select id="theme-selector" v-model="theme" :data-selected="theme" aria-label="Select theme">
  <option disabled>Select theme</option>
  <option value="light">Theme light</option>
  <option value="dark">Theme dark</option>
</select>

### Theme {{theme}}

#### Brand colors

|                                            |           |                                                            |
| ------------------------------------------ | --------- | ---------------------------------------------------------- |
| <ColorBadge :theme="theme" color="brand"/> | **Brand** | `$p-color{{theme === 'dark' ? '-theme-dark-' : '-'}}brand` |

#### Background colors

|                                                         |             |                                                                         |
| ------------------------------------------------------- | ----------- | ----------------------------------------------------------------------- |
| <ColorBadge :theme="theme" color="background-default"/> | **Default** | `$p-color{{theme === 'dark' ? '-theme-dark-' : '-'}}background-default` |
| <ColorBadge :theme="theme" color="background-surface"/> | **Surface** | `$p-color{{theme === 'dark' ? '-theme-dark-' : '-'}}background-surface` |
| <ColorBadge :theme="theme" color="background-shading"/> | **Shading** | `$p-color{{theme === 'dark' ? '-theme-dark-' : '-'}}background-shading` |

#### Background notification colors

|                                                                |                  |                                                                                |
| -------------------------------------------------------------- | ---------------- | ------------------------------------------------------------------------------ |
| <ColorBadge :theme="theme" color="notification-error-soft"/>   | **Error Soft**   | `$p-color{{theme === 'dark' ? '-theme-dark-' : '-'}}notification-error-soft`   |
| <ColorBadge :theme="theme" color="notification-success-soft"/> | **Success Soft** | `$p-color{{theme === 'dark' ? '-theme-dark-' : '-'}}notification-success-soft` |
| <ColorBadge :theme="theme" color="notification-warning-soft"/> | **Warning Soft** | `$p-color{{theme === 'dark' ? '-theme-dark-' : '-'}}notification-warning-soft` |
| <ColorBadge :theme="theme" color="notification-neutral-soft"/> | **Neutral Soft** | `$p-color{{theme === 'dark' ? '-theme-dark-' : '-'}}notification-neutral-soft` |

#### Base color

|                                              |             |                                                              |
| -------------------------------------------- | ----------- | ------------------------------------------------------------ |
| <ColorBadge :theme="theme" color="default"/> | **Default** | `$p-color{{theme === 'dark' ? '-theme-dark-' : '-'}}default` |

#### Neutral colors

|                                                              |                             |                                                                              |
| ------------------------------------------------------------ | --------------------------- | ---------------------------------------------------------------------------- |
| <ColorBadge :theme="theme" color="neutral-contrast-high"/>   | **Neutral Contrast High**   | `$p-color{{theme === 'dark' ? '-theme-dark-' : '-'}}neutral-contrast-high`   |
| <ColorBadge :theme="theme" color="neutral-contrast-medium"/> | **Neutral Contrast Medium** | `$p-color{{theme === 'dark' ? '-theme-dark-' : '-'}}neutral-contrast-medium` |
| <ColorBadge :theme="theme" color="neutral-contrast-low"/>    | **Neutral Contrast Low**    | `$p-color{{theme === 'dark' ? '-theme-dark-' : '-'}}neutral-contrast-low`    |

#### Notification colors

|                                                           |             |                                                                           |
| --------------------------------------------------------- | ----------- | ------------------------------------------------------------------------- |
| <ColorBadge :theme="theme" color="notification-error"/>   | **Error**   | `$p-color{{theme === 'dark' ? '-theme-dark-' : '-'}}notification-error`   |
| <ColorBadge :theme="theme" color="notification-success"/> | **Success** | `$p-color{{theme === 'dark' ? '-theme-dark-' : '-'}}notification-success` |
| <ColorBadge :theme="theme" color="notification-warning"/> | **Warning** | `$p-color{{theme === 'dark' ? '-theme-dark-' : '-'}}notification-warning` |
| <ColorBadge :theme="theme" color="notification-neutral"/> | **Neutral** | `$p-color{{theme === 'dark' ? '-theme-dark-' : '-'}}notification-neutral` |

#### State colors

|                                                     |               |                                                                     |
| --------------------------------------------------- | ------------- | ------------------------------------------------------------------- |
| <ColorBadge :theme="theme" color="state-hover"/>    | **:hover**    | `$p-color{{theme === 'dark' ? '-theme-dark-' : '-'}}state-hover`    |
| <ColorBadge :theme="theme" color="state-active"/>   | **:active**   | `$p-color{{theme === 'dark' ? '-theme-dark-' : '-'}}state-active`   |
| <ColorBadge :theme="theme" color="state-focus"/>    | **:focus**    | `$p-color{{theme === 'dark' ? '-theme-dark-' : '-'}}state-focus`    |
| <ColorBadge :theme="theme" color="state-disabled"/> | **:disabled** | `$p-color{{theme === 'dark' ? '-theme-dark-' : '-'}}state-disabled` |

---

### External brand colors

|                                          |               |                               |
| ---------------------------------------- | ------------- | ----------------------------- |
| <ColorBadge color="external-facebook"/>  | **Facebook**  | `$p-color-external-facebook`  |
| <ColorBadge color="external-google"/>    | **Google**    | `$p-color-external-google`    |
| <ColorBadge color="external-instagram"/> | **Instagram** | `$p-color-external-instagram` |
| <ColorBadge color="external-kakaotalk"/> | **KakaoTalk** | `$p-color-external-kakaotalk` |
| <ColorBadge color="external-linkedin"/>  | **LinkedIn**  | `$p-color-external-linkedin`  |
| <ColorBadge color="external-naver"/>     | **Naver**     | `$p-color-external-naver`     |
| <ColorBadge color="external-pinterest"/> | **Pinterest** | `$p-color-external-pinterest` |
| <ColorBadge color="external-reddit"/>    | **Reddit**    | `$p-color-external-reddit`    |
| <ColorBadge color="external-tiktok"/>    | **TikTok**    | `$p-color-external-tiktok`    |
| <ColorBadge color="external-twitter"/>   | **Twitter**   | `$p-color-external-twitter`   |
| <ColorBadge color="external-wechat"/>    | **WeChat**    | `$p-color-external-wechat`    |
| <ColorBadge color="external-whatsapp"/>  | **WhatsApp**  | `$p-color-external-whatsapp`  |
| <ColorBadge color="external-xing"/>      | **XING**      | `$p-color-external-xing`      |
| <ColorBadge color="external-youtube"/>   | **YouTube**   | `$p-color-external-youtube`   |

---

## Spacing

<p-inline-notification heading="Important note" state="error" persistent="true">
  <code>Spacing</code> is <strong>deprecated</strong>.<br>
  Please use the provided <code>spacings</code> at <a href="/styles/spacing">spacing</a>.
</p-inline-notification>

Given values are:  
`4 | 8 | 16 | 24 | 32 | 40 | 48 | 56 | 64 | 72 | 80`

Possible variable for usage with SCSS (where {v} is the spacing value):

```scss
$p-spacing-{v};
```

Or the reduced set of spacings which should be used as main layout spacings for spacings between elements:

Given values are:  
`x-small | small | medium | large | x-large | xx-large`

Possible variable for usage with SCSS (where {v} is the spacing value):

```scss
$p-layout-{v};
```

---

## Font

For font styling it's recommended to use the
[`<p-headline>`](components/typography/headline)/[`<p-text>`](components/typography/text) component or
[text/headline scss mixins](utilities-deprecated/scss/functions).

### Family

<p-inline-notification heading="Important note" state="error" persistent="true">
  <code>Font Family</code> is <strong>deprecated</strong>.<br>
  Please use the provided <code>$pds-font-family</code> variable provided at <a href="/styles/typography">typography</a>.
</p-inline-notification>

Contains Porsche Next and predefined fallback fonts:

```scss
$p-font-family
```

### Weight

<p-inline-notification heading="Important note" state="error" persistent="true">
  <code>Font Weight</code> is <strong>deprecated</strong>.<br>
  Please use the provided <code>$pds-font-weight-{regular|bold}</code> variable provided at <a href="/styles/typography">typography</a>.
</p-inline-notification>

Given values are:  
`thin | regular | semibold | bold`

Possible variable for usage with SCSS (where {v} is the font weight value):

```scss
$p-font-weight-{v};
```

### Size

<p-inline-notification heading="Important note" state="error" persistent="true">
  <code>$p-font-size-{v}</code> is <strong>deprecated</strong>.<br>
  To recreate the result, use the provided <code>$pds-font-line-height</code> variable and one of the <code>font sizes</code>  provided at <a href="/styles/typography">typography</a>.
</p-inline-notification>

#### Font scaling system

Given values are:

`12 | 16 | 18 | 20 | 24 | 28 | 30 | 32 | 36 | 42 | 44 | 48 | 52 | 60 | 62 | 72 | 84`

Possible variable for usage with SCSS (where {v} is the font size value):

```scss
$p-font-size-{v};
```

#### Predefined font sizes

Given values are:

`x-small | small | medium | large | x-large`

Possible variable for usage with SCSS (where {v} is the font size value):

```scss
$p-font-size-{v};
```

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Theme } from '@/models';

@Component
export default class Variables extends Vue {
  public theme: Theme = 'light';
}
</script>
