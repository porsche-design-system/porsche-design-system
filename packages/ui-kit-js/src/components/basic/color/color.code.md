# Color

There is no color web component available but predefined SCSS variables which has to be additionally installed with the `SCSS utility package` provided in an npm package.
**[Read installation instructions for the Porsche UI Kit SCSS utils package](#/web/scss-utils/introduction)**

## Themes

A light and dark theme is available depending on usage.

<br>
<select id="theme-selector" @change="theme = $event.target.value" :data-selected="theme">
  <option disabled>Select a theme</option>
  <option value="light">Theme light</option>
  <option value="dark">Theme dark</option>
</select>

<div id="theme-light-colors"></div>

## Theme light

### Brand colors

|                                                   |                      	             |
|---------------------------------------------------|------------------------------------|
| <ColorBadge theme="light" color="brand"/>  	    | `$p-color-theme-light-brand`       |

### Default colors

|                                                   |                      	             |
|---------------------------------------------------|------------------------------------|
| <ColorBadge theme="light" color="default"/>  	    | `$p-color-theme-light-default`     |

### Surface colors

|                                                   |                      	             |
|---------------------------------------------------|------------------------------------|
| <ColorBadge theme="light" color="surface"/>  	    | `$p-color-theme-light-surface`     |

### Background colors

|                                                   |                      	             |
|---------------------------------------------------|------------------------------------|
| <ColorBadge theme="light" color="background"/>    | `$p-color-theme-light-background`  |


### Neutral colors

|                                                   |                      	             |
|---------------------------------------------------|------------------------------------|
| <ColorBadge theme="light" color="neutral-1"/>  	| `$p-color-theme-light-neutral-1`   |
| <ColorBadge theme="light" color="neutral-2"/>  	| `$p-color-theme-light-neutral-2`   |
| <ColorBadge theme="light" color="neutral-3"/>  	| `$p-color-theme-light-neutral-3`   |

### Notification colors

|                                                           |                      	                        |
|-----------------------------------------------------------|-----------------------------------------------|
| <ColorBadge theme="light" color="notification-success"/>  | `$p-color-theme-light-notification-success`   |
| <ColorBadge theme="light" color="notification-warning"/>  | `$p-color-theme-light-notification-warning`   |
| <ColorBadge theme="light" color="notification-error"/>  	| `$p-color-theme-light-notification-error`     |

### State colors

|                                                     |                      	              |
|-----------------------------------------------------|---------------------------------------|
| <ColorBadge theme="light" color="state-focus"/>  	  | `$p-color-theme-light-state-focus`    |
| <ColorBadge theme="light" color="state-disabled"/>  | `$p-color-theme-light-state-disabled` |

---

<div id="theme-dark-colors"></div>

## Theme dark

### Brand colors

|                                                   |                      	             |
|---------------------------------------------------|------------------------------------|
| <ColorBadge theme="dark" color="brand"/>  	    | `$p-color-theme-dark-brand`       |

### Default colors

|                                                   |                      	             |
|---------------------------------------------------|------------------------------------|
| <ColorBadge theme="dark" color="default"/>  	    | `$p-color-theme-dark-default`     |

### Surface colors

|                                                   |                      	             |
|---------------------------------------------------|------------------------------------|
| <ColorBadge theme="dark" color="surface"/>  	    | `$p-color-theme-dark-surface`     |

### Background colors

|                                                   |                      	             |
|---------------------------------------------------|------------------------------------|
| <ColorBadge theme="dark" color="background"/>    | `$p-color-theme-dark-background`  |


### Neutral colors

|                                                   |                      	             |
|---------------------------------------------------|------------------------------------|
| <ColorBadge theme="dark" color="neutral-1"/>  	| `$p-color-theme-dark-neutral-1`   |
| <ColorBadge theme="dark" color="neutral-2"/>  	| `$p-color-theme-dark-neutral-2`   |
| <ColorBadge theme="dark" color="neutral-3"/>  	| `$p-color-theme-dark-neutral-3`   |

### Notification colors

|                                                           |                      	                        |
|-----------------------------------------------------------|-----------------------------------------------|
| <ColorBadge theme="dark" color="notification-success"/>  | `$p-color-theme-dark-notification-success`   |
| <ColorBadge theme="dark" color="notification-warning"/>  | `$p-color-theme-dark-notification-warning`   |
| <ColorBadge theme="dark" color="notification-error"/>  	| `$p-color-theme-dark-notification-error`     |

### State colors

|                                                     |                      	              |
|-----------------------------------------------------|---------------------------------------|
| <ColorBadge theme="dark" color="state-focus"/>  	  | `$p-color-theme-dark-state-focus`    |
| <ColorBadge theme="dark" color="state-disabled"/>  | `$p-color-theme-dark-state-disabled` |

---

<select @change="theme = $event.target.value">
  <option disabled>Select a theme</option>
  <option value="light">Theme light</option>
  <option value="dark">Theme dark</option>
</select>

<div id="external-brand-colors"></div>

## External brand colors

|                                               |                      	         |
|-----------------------------------------------|--------------------------------|
| <ColorBadge color="external-facebook"/>  	    | `$p-color-external-facebook`   |
| <ColorBadge color="external-google"/>  	    | `$p-color-external-google`     |
| <ColorBadge color="external-instagram"/>  	| `$p-color-external-instagram`  |
| <ColorBadge color="external-linkedin"/>  	    | `$p-color-external-linkedin`   |
| <ColorBadge color="external-twitter"/>  	    | `$p-color-external-twitter`    |
| <ColorBadge color="external-wechat"/>  	    | `$p-color-external-wechat`     |
| <ColorBadge color="external-youtube"/>  	    | `$p-color-external-youtube`    |

<style scoped lang="scss">
  #theme-selector[data-selected="light"] {
    & ~ #theme-light-colors {
      & ~ h2, 
      & ~ h3, 
      & ~ table, 
      & ~ hr {
        display: block;
      }
    }
    
    & ~ #theme-dark-colors {
      & ~ h2, 
      & ~ h3, 
      & ~ table, 
      & ~ hr {
        display: none;
      }
    }
    
    & ~ #external-brand-colors {
      & ~ h2, 
      & ~ h3, 
      & ~ table, 
      & ~ hr {
        display: block;
      }
    }
  }
  
  #theme-selector[data-selected="dark"] {
    & ~ #theme-light-colors {
      & ~ h2, 
      & ~ h3, 
      & ~ table, 
      & ~ hr {
        display: none;
      }
    }
    
    & ~ #theme-dark-colors {
      & ~ h2, 
      & ~ h3, 
      & ~ table, 
      & ~ hr {
        display: block;
      }
    }
    
    & ~ #external-brand-colors {
      & ~ h2, 
      & ~ h3, 
      & ~ table, 
      & ~ hr {
        display: block;
      }
    }
  }
</style>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  
  @Component
  export default class PlaygroundColor extends Vue {
    public theme: 'light' | 'dark' = 'light';
  }
</script>
