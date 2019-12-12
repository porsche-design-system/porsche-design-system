# Color

There is no color web component available but predefined SCSS variables which has to be additionally installed with the `SCSS utility package` provided in an npm package.
**[Read installation instructions for the Porsche UI Kit SCSS utils package](#/web/scss-utils/introduction)**

## Themes

A light and dark theme is available depending on which background it's used.  

<br>
<select id="theme-selector" @change="theme = $event.target.value" :data-selected="theme">
  <option disabled>Select a theme</option>
  <option value="light">Theme light</option>
  <option value="dark">Theme dark</option>
</select>

### Theme {{theme}}

#### Brand colors

|                                                   |                      	             |
|---------------------------------------------------|------------------------------------|
| <ColorBadge :theme="theme" color="brand"/>  	    | `$p-color-theme-{{theme}}-brand`   |

#### Default colors

|                                                   |                      	             |
|---------------------------------------------------|------------------------------------|
| <ColorBadge :theme="theme" color="default"/>      | `$p-color-theme-{{theme}}-default` |

#### Surface colors

|                                                   |                      	             |
|---------------------------------------------------|------------------------------------|
| <ColorBadge :theme="theme" color="surface"/>      | `$p-color-theme-{{theme}}-surface` |

#### Background colors

|                                                   |                      	                |
|---------------------------------------------------|---------------------------------------|
| <ColorBadge :theme="theme" color="background"/>   | `$p-color-theme-{{theme}}-background` |


#### Neutral colors

|                                                   |                      	                 |
|---------------------------------------------------|----------------------------------------|
| <ColorBadge :theme="theme" color="neutral-1"/>  	| `$p-color-theme-{{theme}}-neutral-1`   |
| <ColorBadge :theme="theme" color="neutral-2"/>  	| `$p-color-theme-{{theme}}-neutral-2`   |
| <ColorBadge :theme="theme" color="neutral-3"/>  	| `$p-color-theme-{{theme}}-neutral-3`   |

#### Notification colors

|                                                           |                      	                            |
|-----------------------------------------------------------|---------------------------------------------------|
| <ColorBadge :theme="theme" color="notification-success"/> | `$p-color-theme-{{theme}}-notification-success`   |
| <ColorBadge :theme="theme" color="notification-warning"/> | `$p-color-theme-{{theme}}-notification-warning`   |
| <ColorBadge :theme="theme" color="notification-error"/>  	| `$p-color-theme-{{theme}}-notification-error`     |

#### State colors

|                                                     |                      	                  |
|-----------------------------------------------------|-------------------------------------------|
| <ColorBadge :theme="theme" color="state-focus"/>    | `$p-color-theme-{{theme}}-state-focus`    |
| <ColorBadge :theme="theme" color="state-disabled"/> | `$p-color-theme-{{theme}}-state-disabled` |

---

### External brand colors

|                                               |                      	         |
|-----------------------------------------------|--------------------------------|
| <ColorBadge color="external-facebook"/>  	    | `$p-color-external-facebook`   |
| <ColorBadge color="external-google"/>  	    | `$p-color-external-google`     |
| <ColorBadge color="external-instagram"/>  	| `$p-color-external-instagram`  |
| <ColorBadge color="external-linkedin"/>  	    | `$p-color-external-linkedin`   |
| <ColorBadge color="external-twitter"/>  	    | `$p-color-external-twitter`    |
| <ColorBadge color="external-wechat"/>  	    | `$p-color-external-wechat`     |
| <ColorBadge color="external-youtube"/>  	    | `$p-color-external-youtube`    |

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  
  @Component
  export default class PlaygroundColor extends Vue {
    public theme: 'light' | 'dark' = 'light';
  }
</script>
