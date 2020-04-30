# Variables

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
| <ColorBadge :theme="theme" color="brand"/>  	    | **Brand** | `$p-color-theme-{{theme}}-brand`   |

#### Background colors

|                                                   |                |      	             |
|---------------------------------------------------|----------------|--------------------|
| <ColorBadge :theme="theme" color="background"/>   | **Background** | `$p-color-theme-{{theme}}-background` |
| <ColorBadge :theme="theme" color="surface"/>      | **Surface**    | `$p-color-theme-{{theme}}-surface` |

#### Text / icon color

|                                                   |             |         	             |
|---------------------------------------------------|-------------|-----------------------|
| <ColorBadge :theme="theme" color="default"/>      | **Default** | `$p-color-theme-{{theme}}-default` |

#### Neutral colors

|                                                   |                      	                |                         |
|---------------------------------------------------|---------------------------------------|-------------------------|
| <ColorBadge :theme="theme" color="neutral-contrast-high"/>  	| **Neutral Contrast High** | `$p-color-theme-{{theme}}-neutral-contrast-high`   |
| <ColorBadge :theme="theme" color="neutral-contrast-medium"/>  | **Neutral Contrast Medium** | `$p-color-theme-{{theme}}-neutral-contrast-medium` |
| <ColorBadge :theme="theme" color="neutral-contrast-low"/>  	| **Neutral Contrast Low** | `$p-color-theme-{{theme}}-neutral-contrast-low`    |

#### Notification colors

|                                                           |            |          	                            |
|-----------------------------------------------------------|------------|---------------------------------------|
| <ColorBadge :theme="theme" color="notification-error"/>  	| **Error** | `$p-color-theme-{{theme}}-notification-error`     |
| <ColorBadge :theme="theme" color="notification-success"/> | **Success** | `$p-color-theme-{{theme}}-notification-success`   |
| <ColorBadge :theme="theme" color="notification-warning"/> | **Warning** | `$p-color-theme-{{theme}}-notification-warning`   |

#### State colors

|                                                     |           |                      	                  |
|-----------------------------------------------------|-----------|-------------------------------------------|
| <ColorBadge :theme="theme" color="state-hover"/>    | **:hover**    | `$p-color-theme-{{theme}}-state-hover`    |
| <ColorBadge :theme="theme" color="state-active"/>   | **:active**   | `$p-color-theme-{{theme}}-state-active`   |
| <ColorBadge :theme="theme" color="state-focus"/>    | **:focus**    | `$p-color-theme-{{theme}}-state-focus`    |
| <ColorBadge :theme="theme" color="state-disabled"/> | **:disabled** | `$p-color-theme-{{theme}}-state-disabled` |

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
For font styling it's recommended to use the [`<p-headline>`](#/components/basic/typography#code)/[`<p-text>`](#/components/basic/typography#code) component or [text/headline scss mixins](#/scss-utils/mixins).

### Family
Contains Porsche Next and predefined fallback fonts:

```
$p-font-primary
```

### Weight
Given values are:  
`thin | regular | bold`

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

#### Predefined text sizes
Given values are:  
 
`x-small | small | medium | large | x-large`

Possible variable for usage with SCSS (where {v} is the font size value):
```
$p-text-size-{v};
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