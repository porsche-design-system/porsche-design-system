# Js

<TableOfContents></TableOfContents>

## Color

A light (default) and dark theme is available depending on which background it's used.

<br>
<select id="theme-selector" v-model="theme" :data-selected="theme">
  <option disabled>Select a theme</option>
  <option value="light">Theme light</option>
  <option value="dark">Theme dark</option>
</select>

### Theme {{theme}}

#### Brand colors

|                                            |           |                                                        |
| ------------------------------------------ | --------- | ------------------------------------------------------ |
| <ColorBadge :theme="theme" color="brand"/> | **Brand** | `color{{theme === 'dark' ? '.darkTheme.' : '.'}}brand` |

#### Background colors

|                                                 |                |                                                             |
| ----------------------------------------------- | -------------- | ----------------------------------------------------------- |
| <ColorBadge :theme="theme" color="background-default"/>    | **Default**    | `color{{theme === 'dark' ? '.darkTheme.' : '.'}}background.default` |
| <ColorBadge :theme="theme" color="background-surface"/>    | **Surface**    | `color{{theme === 'dark' ? '.darkTheme.' : '.'}}background.surface`    |
| <ColorBadge :theme="theme" color="background-shading"/>    | **Shading**    | `color{{theme === 'dark' ? '.darkTheme.' : '.'}}background.shading`    |

#### Background notification colors

|                                                   |                |      	             |
|---------------------------------------------------|----------------|--------------------| 
| <ColorBadge :theme="theme" color="notification-error-soft"/>   | **Error Soft**   | `color{{theme === 'dark' ? '.darkTheme.' : '.'}}notification.errorSoft`   |
| <ColorBadge :theme="theme" color="notification-success-soft"/>   | **Success Soft**   | `color{{theme === 'dark' ? '.darkTheme.' : '.'}}notification.successSoft`   |
| <ColorBadge :theme="theme" color="notification-warning-soft"/>   | **Warning Soft**   | `color{{theme === 'dark' ? '.darkTheme.' : '.'}}notification.warningSoft`   |
| <ColorBadge :theme="theme" color="notification-neutral-soft"/>   | **Neutral Soft**   | `color{{theme === 'dark' ? '.darkTheme.' : '.'}}notification.neutralSoft`   |

#### Base color

|                                              |             |                                                          |
| -------------------------------------------- | ----------- | -------------------------------------------------------- |
| <ColorBadge :theme="theme" color="default"/> | **Default** | `color{{theme === 'dark' ? '.darkTheme.' : '.'}}default` |

#### Neutral colors

|                                                              |                             |                                                                         |
| ------------------------------------------------------------ | --------------------------- | ----------------------------------------------------------------------- |
| <ColorBadge :theme="theme" color="neutral-contrast-high"/>   | **Neutral Contrast High**   | `color{{theme === 'dark' ? '.darkTheme.' : '.'}}neutralContrast.high`   |
| <ColorBadge :theme="theme" color="neutral-contrast-medium"/> | **Neutral Contrast Medium** | `color{{theme === 'dark' ? '.darkTheme.' : '.'}}neutralContrast.medium` |
| <ColorBadge :theme="theme" color="neutral-contrast-low"/>    | **Neutral Contrast Low**    | `color{{theme === 'dark' ? '.darkTheme.' : '.'}}neutralContrast.low`    |

#### Notification colors

|                                                          |             |                                                                       |
| -------------------------------------------------------- | ----------- | --------------------------------------------------------------------- |
| <ColorBadge :theme="theme" color="notification-error"/>   | **Error**   | `color{{theme === 'dark' ? '.darkTheme.' : '.'}}notification.error`   |
| <ColorBadge :theme="theme" color="notification-success"/> | **Success** | `color{{theme === 'dark' ? '.darkTheme.' : '.'}}notification.success` |
| <ColorBadge :theme="theme" color="notification-warning"/> | **Warning** | `color{{theme === 'dark' ? '.darkTheme.' : '.'}}notification.warning` |
| <ColorBadge :theme="theme" color="notification-neutral"/> | **Neutral** | `color{{theme === 'dark' ? '.darkTheme.' : '.'}}notification.neutral` |

#### State colors

|                                                     |               |                                                                 |
| --------------------------------------------------- | ------------- | --------------------------------------------------------------- |
| <ColorBadge :theme="theme" color="state-hover"/>    | **:hover**    | `color{{theme === 'dark' ? '.darkTheme.' : '.'}}state.hover`    |
| <ColorBadge :theme="theme" color="state-active"/>   | **:active**   | `color{{theme === 'dark' ? '.darkTheme.' : '.'}}state.active`   |
| <ColorBadge :theme="theme" color="state-focus"/>    | **:focus**    | `color{{theme === 'dark' ? '.darkTheme.' : '.'}}state.focus`    |
| <ColorBadge :theme="theme" color="state-disabled"/> | **:disabled** | `color{{theme === 'dark' ? '.darkTheme.' : '.'}}state.disabled` |

---

### External brand colors

|                                           |               |                            |
| ----------------------------------------- | ------------- | -------------------------- |
| <ColorBadge color="external-facebook"/>   | **Facebook**  | `color.external.facebook`  |
| <ColorBadge color="external-google"/>     | **Google**    | `color.external.google`    |
| <ColorBadge color="external-instagram"/>  | **Instagram** | `color.external.instagram` |
| <ColorBadge color="external-kakaotalk"/> | **KakaoTalk** | `color.external.kakaotalk` |
| <ColorBadge color="external-linkedin"/>   | **LinkedIn**  | `color.external.linkedin`  |
| <ColorBadge color="external-naver"/>      | **Naver**     | `color.external.naver`     |
| <ColorBadge color="external-pinterest"/>  | **Pinterest** | `color.external.pinterest` |
| <ColorBadge color="external-reddit"/>     | **Reddit**    | `color.external.reddit`    |
| <ColorBadge color="external-tiktok"/>     | **TikTok**    | `color.external.tiktok`    |
| <ColorBadge color="external-twitter"/>    | **Twitter**   | `color.external.twitter`   |
| <ColorBadge color="external-wechat"/>     | **WeChat**    | `color.external.wechat`    |
| <ColorBadge color="external-whatsapp"/>   | **WhatsApp**  | `color.external.whatsapp`  |
| <ColorBadge color="external-xing"/>       | **XING**      | `color.external.xing`      |
| <ColorBadge color="external-youtube"/>    | **YouTube**   | `color.external.youtube`   |

---

## Spacing

Given values are:  
`4 | 8 | 16 | 24 | 32 | 40 | 48 | 56 | 64 | 72 | 80`

**Example:**

```
import { spacing } from '@porsche-design-system/utilities';

// 'v' is the spacing value
spacing[v]
```

Or the reduced set of spacings which should be used as main layout spacings for spacings between elements:

Given values are:  
`xSmall | small | medium | large | xLarge | xxLarge`

**Example:**

```
import { layout } from '@porsche-design-system/utilities';

// 'v' is the layout value
layout[v]
```

---

## Font

For font styling it's recommended to use the [`<p-headline>`](components/typography/headline)/[`<p-text>`](components/typography/text) component or [text/headline js functions](utilities/js/functions).

### Family

Contains Porsche Next and predefined fallback fonts:

```
import { font } from '@porsche-design-system/utilities';

font.family
```

### Weight

Given values are:  
`thin | regular | semibold | bold`

**Example:**

```
import { font } from '@porsche-design-system/utilities';

// 'v' is the spacing value
font.weight[v]
```

### Size

#### Font scaling system

By selecting a specific size you will get the according `lineHeight` and `fontSize`.

Given values are:

`12 | 16 | 18 | 20 | 24 | 28 | 30 | 32 | 36 | 42 | 44 | 48 | 52 | 60 | 62 | 72 | 84`

Predefined text sizes are also provided:

`xSmall | small | medium | large | xLarge`

**Example general:**

```
import { font } from '@porsche-design-system/utilities';

// 'v' is the spacing value
font.size[v]
```

**Example specific:**
```
import { font } from '@porsche-design-system/utilities';

font.size['16']
```

**Result:**

```
lineHeight: 1.5;
fontSize: '1rem';
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