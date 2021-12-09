# Fonts

<TableOfContents></TableOfContents>

## Introduction
If a team can't use the Design System components, we provide a manifest file to easily reference to the different webfont files.

## Usage 
Once the `@porsche-design-system/assets` package [is installed](assets/introduction) you have access to the CDN path and the corresponding file names, e.g.:

```ts
import { FONTS_CDN_BASE_URL, FONTS_MANIFEST } from '@porsche-design-system/assets';

const fontUrl = `${FONTS_CDN_BASE_URL}/${FONTS_MANIFEST.porscheNextWLaRegular.woff2}`;
```
