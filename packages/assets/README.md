# Porsche Design System - Assets

This package provides manifests and CDN URLs of Porsche assets like fonts, icons, marques, etc. Visit the
[Porsche Design System](https://designsystem.porsche.com) to learn more.

## Using the Porsche Design System Assets

### Installation

Run the following command using [npm](https://www.npmjs.com):

```bash
npm install @porsche-design-system/assets
```

If you prefer [Yarn](https://yarnpkg.com), use the following command instead:

```bash
yarn add @porsche-design-system/assets
```

### Usage

```js
import { EMAIL_CDN_BASE_URL, EMAIL_MANIFEST } from '@porsche-design-system/assets';
import { MARQUES_CDN_BASE_URL, MARQUES_MANIFEST } from '@porsche-design-system/assets';
import { META_ICONS_CDN_BASE_URL, META_ICONS_MANIFEST } from '@porsche-design-system/assets';
import { ICONS_CDN_BASE_URL, ICONS_MANIFEST } from '@porsche-design-system/assets';

const emailMarqueUrl = `${EMAIL_CDN_BASE_URL}/${EMAIL_MANIFEST.porscheMarque}`;
const marqueMediumUrl = `${MARQUES_CDN_BASE_URL}/${MARQUES_MANIFEST.porscheMarque.medium}`;
const metaFaviconUrl = `${META_ICONS_CDN_BASE_URL}/${META_ICONS_MANIFEST.favicon.favicon_16x16}`;
const iconCarUrl = `${ICONS_CDN_BASE_URL}/${ICONS_MANIFEST.car}`;
// …
```

## License

- See [Custom License](./LICENSE) within npm package
