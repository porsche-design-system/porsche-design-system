# Variables

## Color

A light and dark theme is available depending on which background it's used. The porsche standard light theme is used as base of the variable, for darkTheme the color object variable gets extended.

<br>
<select id="theme-selector" @change="theme = $event.target.value" :data-selected="theme">
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
| <ColorBadge :theme="theme" color="background"/> | **Background** | `color{{theme === 'dark' ? '.darkTheme.' : '.'}}background` |
| <ColorBadge :theme="theme" color="surface"/>    | **Surface**    | `color{{theme === 'dark' ? '.darkTheme.' : '.'}}surface`    |

#### Text / icon color

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
| <ColorBadge :theme="theme" color="notification-error"/>   | **Error**   | `color{{theme === 'dark' ? '.darkTheme.' : '.'}}notifications.error`   |
| <ColorBadge :theme="theme" color="notification-success"/> | **Success** | `color{{theme === 'dark' ? '.darkTheme.' : '.'}}notifications.success` |
| <ColorBadge :theme="theme" color="notification-warning"/> | **Warning** | `color{{theme === 'dark' ? '.darkTheme.' : '.'}}notifications.warning` |

#### State colors

|                                                     |               |                                                                 |
| --------------------------------------------------- | ------------- | --------------------------------------------------------------- |
| <ColorBadge :theme="theme" color="state-hover"/>    | **:hover**    | `color{{theme === 'dark' ? '.darkTheme.' : '.'}}state.hover`    |
| <ColorBadge :theme="theme" color="state-active"/>   | **:active**   | `color{{theme === 'dark' ? '.darkTheme.' : '.'}}state.active`   |
| <ColorBadge :theme="theme" color="state-focus"/>    | **:focus**    | `color{{theme === 'dark' ? '.darkTheme.' : '.'}}state.focus`    |
| <ColorBadge :theme="theme" color="state-disabled"/> | **:disabled** | `color{{theme === 'dark' ? '.darkTheme.' : '.'}}state.disabled` |

---

### External brand colors

|                                          |               |                            |
| ---------------------------------------- | ------------- | -------------------------- |
| <ColorBadge color="external-facebook"/>  | **Facebook**  | `color.external.facebook`  |
| <ColorBadge color="external-google"/>    | **Google**    | `color.external.google`    |
| <ColorBadge color="external-instagram"/> | **Instagram** | `color.external.instagram` |
| <ColorBadge color="external-linkedin"/>  | **LinkedIn**  | `color.external.linkedin`  |
| <ColorBadge color="external-pinterest"/> | **Pinterest** | `color.external.pinterest` |
| <ColorBadge color="external-twitter"/>   | **Twitter**   | `color.external.twitter`   |
| <ColorBadge color="external-wechat"/>    | **WeChat**    | `color.external.wechat`    |
| <ColorBadge color="external-whatsapp"/>  | **WhatsApp**  | `color.external.whatsapp`  |
| <ColorBadge color="external-xing"/>      | **XING**      | `color.external.xing`      |
| <ColorBadge color="external-youtube"/>   | **YouTube**   | `color.external.youtube`   |

---

## Spacing

Given values are:  
`0 | 4 | 8 | 16 | 24 | 32 | 40 | 48 | 56 | 64 | 72 | 80`

Possible variable usage (where 'v' is the spacing value):

```
spacing[v];
```

Or the reduced set of spacings which should be used as main layout spacings for spacings between elements:

Given values are:  
`x-small | small | medium | large | x-large | xx-large`

Possible variable usage (where 'v' is the layout value):

```
layout[v];
```

---

## Font

For font styling it's recommended to use the [`<p-headline>`](#/components/typography#headline)/[`<p-text>`](#/components/typography#text) component or [text/headline js functions](#/utilities/js#functions).

### Family

Contains Porsche Next and predefined fallback fonts:

```
font.family
```

### Weight

Given values are:  
`thin | regular | bold`

Possible usage (where 'v' is the font weight value):

```
font.weight.v; (e.g. font.weight.thin)
```

### Size

#### Font scaling system

Given values are:

`12 | 16 | 18 | 20 | 24 | 28 | 30 | 32 | 36 | 42 | 44 | 48 | 52 | 60 | 62 | 72 | 84`

Predefined text sizes are also provided:

`x-small | small | medium | large | x-large`

Possible usage (where 'v' is the font size value):

```
font.size[v];
```

---

## Animation

### Hover

```
animation.hover.duration
animation.hover.bezier
```

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  
  @Component
  export default class PlaygroundColor extends Vue {
    public theme: 'light' | 'dark' = 'light';
  }
</script>
