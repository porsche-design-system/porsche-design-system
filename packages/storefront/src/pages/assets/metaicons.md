# Metaicons

## Introduction
Metaicons are a set of icons to be used for the following purposes: **Favicon**, **Apple Touch Icons**, **Android Touch Icons**, **Microsoft Windows Tiles** and **Apple Pinned Tab Icon**.

## Usage
Once the `@porsche-design-system/assets` [is installed](#/sassets/introduction) you have access to the CDN path and the corresponding file names, e.g.:

```
import { METAICONS_CDN_BASE_URL, METAICONS_MANIFEST } from '@porsche-design-system/assets';

const metaiconsUrl = `${METAICONS_CDN_BASE_URL}/${METAICONS_MANIFEST.favicon.favicon_32x32}`;
```

## Site Manifest
Android devices need a `site.manifest` file in the root of the application where the corresponding references to the Android Touch Icons and colors are stored.
The Manifest must be declared in the `<head>` of your document and can be something like this:

```
{
    "name": "",
    "short_name": "",
    "icons": [
        {
            "src": "${METAICONS_CDN_BASE_URL}/${METAICONS_MANIFEST.touchicon.androidChrome_192x192}",
            "sizes": "192x192",
            "type": "image/png"
        },
        {
            "src": "${METAICONS_CDN_BASE_URL}/${METAICONS_MANIFEST.touchicon.androidChrome_512x512}",
            "sizes": "512x512",
            "type": "image/png"
          }
    ],
    "theme_color": "#ffffff",
    "background_color": "#ffffff",
    "display": "standalone"
}

```

## Browserconfig xml
Microsoft Tile images are served by referencing the corresponding images in the `browserconfig.xml` file which must be placed in the root of  your application.

```
<?xml version="1.0" encoding="utf-8"?>
<browserconfig>
  <msapplication>
    <tile>
      <square128x128logo src="${METAICONS_CDN_BASE_URL}/${METAICONS_MANIFEST.mstile.mstile_128x128}"/>
      <square144x144logo src="${METAICONS_CDN_BASE_URL}/${METAICONS_MANIFEST.mstile.mstile_144x144}"/>
      <square270x270logo src="${METAICONS_CDN_BASE_URL}/${METAICONS_MANIFEST.mstile.mstile_270x270}"/>
      <wide585x270logo src="${METAICONS_CDN_BASE_URL}/${METAICONS_MANIFEST.mstile.mstile_585x270}"/>
      <wide585x585logo src="${METAICONS_CDN_BASE_URL}/${METAICONS_MANIFEST.mstile.mstile_585x585}"/>
      <TileColor>#FFFFFF</TileColor>
    </tile>
  </msapplication>
</browserconfig>
```

