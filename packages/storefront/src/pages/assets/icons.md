# Icons

<TableOfContents></TableOfContents>

## Introduction
If a team can't use the "Icon Component" or needs the Porsche icon SVG images to build something new, we provide a manifest file to easily reference to the different icon images.

## Usage 
Once the `@porsche-design-system/assets` package [is installed](assets/introduction) you have access to the CDN path and the corresponding file names, e.g.:

```ts
import { ICONS_CDN_BASE_URL, ICONS_MANIFEST } from '@porsche-design-system/assets';

const iconUrl = `${ICONS_CDN_BASE_URL}/${ICONS_MANIFEST.arrowRight}`;
```
