# Marque

<TableOfContents></TableOfContents>

## Introduction
If a team can't use the "Marque" component or needs the Porsche marque images to build something new, we provide a manifest file to easily reference to the different marque images.

## Usage 
Once the `@porsche-design-system/assets` package [is installed](assets/introduction) you have access to the CDN path and the corresponding file names, e.g.:

```ts
import { MARQUE_CDN_BASE_URL, MARQUE_MANIFEST } from '@porsche-design-system/assets';

const marqueUrl = `${MARQUE_CDN_BASE_URL}/${MARQUE_MANIFEST.porscheMarqueTrademark.medium.1x}`;
```
