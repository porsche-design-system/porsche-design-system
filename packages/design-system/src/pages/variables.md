# Variables

## Color

### Brand colors

|                                               |                      	         |
|-----------------------------------------------|--------------------------------|
| <ColorBadge color="porsche-red"/>  	          | `$p-color-porsche-red`         |
| <ColorBadge color="porsche-dark-red"/> 	      | `$p-color-porsche-dark-red`    |
| <ColorBadge color="porsche-light"/> 	        | `$p-color-porsche-light`       |
| <ColorBadge color="porsche-dark"/> 	          | `$p-color-porsche-dark`        |
| <ColorBadge color="porsche-black"/> 	        | `$p-color-porsche-black`       |

### Surface colors

|                                               |                      	         |
|-----------------------------------------------|--------------------------------|
| <ColorBadge color="surface-light"/>  	        | `$p-color-surface-light`       |
| <ColorBadge color="surface-dark"/> 	          | `$p-color-surface-dark`        |

### Neutral colors

|                                               |                      	         |
|-----------------------------------------------|--------------------------------|
| <ColorBadge color="neutral-grey-1"/>  	      | `$p-color-neutral-grey-1`      |
| <ColorBadge color="neutral-grey-2"/>  	      | `$p-color-neutral-grey-2`      |
| <ColorBadge color="neutral-grey-3"/>  	      | `$p-color-neutral-grey-3`      |
| <ColorBadge color="neutral-grey-4"/>  	      | `$p-color-neutral-grey-4`      |
| <ColorBadge color="neutral-grey-5"/>  	      | `$p-color-neutral-grey-5`      |
| <ColorBadge color="neutral-grey-6"/>  	      | `$p-color-neutral-grey-6`      |
| <ColorBadge color="neutral-grey-7"/>  	      | `$p-color-neutral-grey-7`      |
| <ColorBadge color="neutral-grey-8"/>  	      | `$p-color-neutral-grey-8`      |

### Status colors

|                                               |                      	         |
|-----------------------------------------------|--------------------------------|
| <ColorBadge color="status-red"/>  	          | `$p-color-status-red`          |
| <ColorBadge color="status-green"/> 	          | `$p-color-status-green`        |
| <ColorBadge color="status-yellow"/> 	        | `$p-color-status-yellow`       |

### State colors

|                                               |                      	         |
|-----------------------------------------------|--------------------------------|
| <ColorBadge color="state-focus"/>  	          | `$p-color-state-focus`         |

---

## Spacing
Also checkout pre-compiled [CSS margin/padding spacing classes](#/components/layout/spacing#code).

Given values are:  
`0 | 4 | 8 | 16 | 24 | 32 | 40 | 48 | 56 | 64 | 72 | 80`

Possible variable for usage with SCSS (where {v} is the spacing value):
```
$p-spacing-{v};
```

---

## Font
For font-styling it's recommended to use [`<p-headline>`](#/components/basic/typography#code)/[`<p-text>`](#/components/basic/typography#code) component or [text/headline scss mixins](#/scss-utils/mixins).

### Family
Contains Porsche Next and predefined fallback fonts.

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
Given values are:  
`12 | 16 | 18 | 20 | 24 | 28 | 30 | 32 | 36 | 42 | 44 | 48 | 52 | 60 | 62 | 72 | 84`

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