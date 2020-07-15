# Scss

## Color

A light and dark theme is available depending on which background it's used.   

<br>
<select id="theme-selector" @change="theme = $event.target.value" :data-selected="theme">
  <option disabled>Select a theme</option>
  <option value="light">Theme light</option>
  <option value="dark">Theme dark</option>
</select>

### Theme {{theme}}

#### Brand colors

|                                                   |       |                     	             |
|---------------------------------------------------|------|------------------------------------|
| <ColorBadge :theme="theme" color="brand"/>  	    | **Brand** | `$p-color{{theme === 'dark' ? '-theme-dark-' : '-'}}brand`   |

#### Background colors

|                                                   |                |      	             |
|---------------------------------------------------|----------------|--------------------|
| <ColorBadge :theme="theme" color="background-default"/>      | **Default**    | `$p-color{{theme === 'dark' ? '-theme-dark-' : '-'}}background-default` |
| <ColorBadge :theme="theme" color="background-surface"/>      | **Surface**    | `$p-color{{theme === 'dark' ? '-theme-dark-' : '-'}}background-surface` |
| <ColorBadge :theme="theme" color="background-shading"/>      | **Shading**    | `$p-color{{theme === 'dark' ? '-theme-dark-' : '-'}}background-shading` |

#### Text / icon color

|                                                   |             |         	             |
|---------------------------------------------------|-------------|-----------------------|
| <ColorBadge :theme="theme" color="default"/>      | **Default** | `$p-color{{theme === 'dark' ? '-theme-dark-' : '-'}}default` |

#### Neutral colors

|                                                   |                      	                |                         |
|---------------------------------------------------|---------------------------------------|-------------------------|
| <ColorBadge :theme="theme" color="neutral-contrast-high"/>  	| **Neutral Contrast High** | `$p-color{{theme === 'dark' ? '-theme-dark-' : '-'}}neutral-contrast-high`   |
| <ColorBadge :theme="theme" color="neutral-contrast-medium"/>  | **Neutral Contrast Medium** | `$p-color{{theme === 'dark' ? '-theme-dark-' : '-'}}neutral-contrast-medium` |
| <ColorBadge :theme="theme" color="neutral-contrast-low"/>  	| **Neutral Contrast Low** | `$p-color{{theme === 'dark' ? '-theme-dark-' : '-'}}neutral-contrast-low`    |

#### Notification colors

|                                                           |            |          	                            |
|-----------------------------------------------------------|------------|---------------------------------------|
| <ColorBadge :theme="theme" color="notification-error"/>  	| **Error** | `$p-color{{theme === 'dark' ? '-theme-dark-' : '-'}}notification-error`     |
| <ColorBadge :theme="theme" color="notification-success"/> | **Success** | `$p-color{{theme === 'dark' ? '-theme-dark-' : '-'}}notification-success`   |
| <ColorBadge :theme="theme" color="notification-warning"/> | **Warning** | `$p-color{{theme === 'dark' ? '-theme-dark-' : '-'}}notification-warning`   |
| <ColorBadge :theme="theme" color="notification-neutral"/> | **Neutral** | `$p-color{{theme === 'dark' ? '-theme-dark-' : '-'}}notification-neutral`   |

#### State colors

|                                                     |           |                      	                  |
|-----------------------------------------------------|-----------|-------------------------------------------|
| <ColorBadge :theme="theme" color="state-hover"/>    | **:hover**    | `$p-color{{theme === 'dark' ? '-theme-dark-' : '-'}}state-hover`    |
| <ColorBadge :theme="theme" color="state-active"/>   | **:active**   | `$p-color{{theme === 'dark' ? '-theme-dark-' : '-'}}state-active`   |
| <ColorBadge :theme="theme" color="state-focus"/>    | **:focus**    | `$p-color{{theme === 'dark' ? '-theme-dark-' : '-'}}state-focus`    |
| <ColorBadge :theme="theme" color="state-disabled"/> | **:disabled** | `$p-color{{theme === 'dark' ? '-theme-dark-' : '-'}}state-disabled` |

---

### External brand colors

|                                               |     |                      	         |
|-----------------------------------------------|-----|--------------------------------|
| <ColorBadge color="external-facebook"/>  	    | **Facebook** | `$p-color-external-facebook`   |
| <ColorBadge color="external-google"/>  	    | **Google** | `$p-color-external-google`     |
| <ColorBadge color="external-instagram"/>  	| **Instagram** | `$p-color-external-instagram`  |
| <ColorBadge color="external-linkedin"/>  	    | **LinkedIn** | `$p-color-external-linkedin`   |
| <ColorBadge color="external-pinterest"/>  	| **Pinterest** | `$p-color-external-pinterest`   |
| <ColorBadge color="external-twitter"/>  	    | **Twitter** | `$p-color-external-twitter`    |
| <ColorBadge color="external-wechat"/>  	    | **WeChat** | `$p-color-external-wechat`     |
| <ColorBadge color="external-whatsapp"/>  	    | **WhatsApp** | `$p-color-external-whatsapp`     |
| <ColorBadge color="external-xing"/>  	        | **XING** | `$p-color-external-xing`     |
| <ColorBadge color="external-youtube"/>  	    | **YouTube** | `$p-color-external-youtube`    |

---

## Spacing

Given values are:  
`0 | 4 | 8 | 16 | 24 | 32 | 40 | 48 | 56 | 64 | 72 | 80`

Possible variable for usage with SCSS (where {v} is the spacing value):
```
$p-spacing-{v};
```

Or the reduced set of spacings which should be used as main layout spacings for spacings between elements:

Given values are:  
`x-small | small | medium | large | x-large | xx-large`

Possible variable for usage with SCSS (where {v} is the spacing value):
```
$p-layout-{v};
```

---

## Font
For font styling it's recommended to use the [`<p-headline>`](#/components/typography#headline)/[`<p-text>`](#/components/typography#text) component or [text/headline scss mixins](#/utilities/scss#mixins).

### Family
Contains Porsche Next and predefined fallback fonts:

```
$p-font-family
```

### Weight
Given values are:  
`thin | regular | semibold | bold`

Possible variable for usage with SCSS (where {v} is the font weight value):

```
$p-font-weight-{v};
```

### Size

#### Font scaling system
Given values are:  

`12 | 16 | 18 | 20 | 24 | 28 | 30 | 32 | 36 | 42 | 44 | 48 | 52 | 60 | 62 | 72 | 84`

Possible variable for usage with SCSS (where {v} is the font size value):
```
$p-font-size-{v};
```

#### Predefined font sizes
Given values are:  
 
`x-small | small | medium | large | x-large`

Possible variable for usage with SCSS (where {v} is the font size value):
```
$p-font-size-{v};
```

---

## Animation

### Hover
```
$p-animation-hover-duration
$p-animation-hover-bezier
```

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  
  @Component
  export default class PlaygroundColor extends Vue {
    public theme: 'light' | 'dark' = 'light';
  }
</script>