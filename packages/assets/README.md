# Porsche Design System - Assets

This package provides manifests and CDN URLs for fonts, icons and marque.

## Usage

```
import { MARQUE_CDN_BASE_URL, MARQUES_MANIFEST } from '@porsche-design-system/assets';
import { ICONS_CDN_BASE_URL, ICONS_MANIFEST } from '@porsche-design-system/assets';

const maraqueUrl = `${MARQUE_CDN_BASE_URL}/${MARQUES_MANIFEST.porscheMarque.medium}`;
const iconUrl = `${ICONS_CDN_BASE_URL}/${ICONS_MANIFEST.car}`;
```

## Build

Bundle manifests and CDN URLs of fonts, icons and marque.

```
yarn build
```
