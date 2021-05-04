# Meta Icons

## Introduction
Meta Icons are a set of icons to be used for the following purposes: **Favicon**, **Apple Touch Icons**, **Android Touch Icons** and **Microsoft Windows Tiles**.
To simplify the implementation process we provide a `getMetaTagsAndIconLinks` partial.

##### Options:
- **appTitle:** string
- **cdn:** 'auto' | 'cn' = 'auto'

#### Example usage with dynamic template

The example shows how to implement the partial in a webpack (or similar) project.

```html
// index.html

<head>  
  // with appTitle only
  <%= require('@porsche-design-system/components-{js|angular|react}/partials').getMetaTagsAndIconLinks({ appTitle: 'TITLE_OF_YOUR_APP' }) %>
</head>

<head>
  // force using China CDN
  <%= require('@porsche-design-system/components-{js|angular|react}/partials').getMetaTagsAndIconLinks({ appTitle: 'TITLE_OF_YOUR_APP', cdn: 'cn' }) %>
</head>
```


#### Alternative: Example usage with placeholder

If your bundler (webpack or similar) does not work with the syntax of the previous example you can put a placeholder in your markup and replace its content with a script.

```html
// index.html

<head>
  <!--PLACEHOLDER_PORSCHE_DESIGN_SYSTEM_META_TAGS_AND_ICON_LINKS-->
</head>
``` 

```json
// package.json (tested on macOS, the script may need to be adjusted depending on the operating system used)

"scripts": {
  "prestart": "yarn replace",
  "replace": "placeholder='<!--PLACEHOLDER_PORSCHE_DESIGN_SYSTEM_META_TAGS_AND_ICON_LINKS-->' && partial=$placeholder$(node -e 'console.log(require(\"@porsche-design-system/components-js/partials\").getMetaTagsAndIconLinks({ appTitle: 'TITLE_OF_YOUR_APP' }))') && regex=$placeholder'.*' && sed -i '' -E -e \"s@$regex@$partial@\" index.html",
}
``` 

## Manual Implementation
Once the `@porsche-design-system/assets` package [is installed](assets/introduction) you have access to the CDN path and the corresponding file names, e.g.:

```ts
import { META_ICONS_CDN_BASE_URL, META_ICONS_MANIFEST } from '@porsche-design-system/assets';

const metaIconsUrl = `${META_ICONS_CDN_BASE_URL}/${META_ICONS_MANIFEST.favicon.favicon_32x32}`;
```

## Site Manifest
Android devices need a `manifest.webmanifest` file in the root of the application where the corresponding references to the Android Touch Icons and colors are stored.
The Manifest must be declared in the `<head>` of your document and can be something like this:

```json
{
    "name": "",
    "short_name": "",
    "icons": [
        {
            "src": "${META_ICONS_CDN_BASE_URL}/${META_ICONS_MANIFEST.touchIcon.androidChrome_192x192}",
            "sizes": "192x192",
            "type": "image/png"
        },
        {
            "src": "${META_ICONS_CDN_BASE_URL}/${META_ICONS_MANIFEST.touchIcon.androidChrome_512x512}",
            "sizes": "512x512",
            "type": "image/png"
          }
    ],
    "theme_color": "#ffffff",
    "background_color": "#ffffff",
    "display": "standalone"
}
```

## Browserconfig.xml
Microsoft Tile images are served by referencing the corresponding images in the `browserconfig.xml` file which must be placed in the root of your application.

```xml
<?xml version="1.0" encoding="utf-8"?>
<browserconfig>
  <msapplication>
    <tile>
      <square128x128logo src="${META_ICONS_CDN_BASE_URL}/${META_ICONS_MANIFEST.mstile.mstile_128x128}"/>
      <square144x144logo src="${META_ICONS_CDN_BASE_URL}/${META_ICONS_MANIFEST.mstile.mstile_144x144}"/>
      <square270x270logo src="${META_ICONS_CDN_BASE_URL}/${META_ICONS_MANIFEST.mstile.mstile_270x270}"/>
      <wide585x270logo src="${META_ICONS_CDN_BASE_URL}/${META_ICONS_MANIFEST.mstile.mstile_585x270}"/>
      <wide585x585logo src="${META_ICONS_CDN_BASE_URL}/${META_ICONS_MANIFEST.mstile.mstile_585x585}"/>
      <TileColor>#FFFFFF</TileColor>
    </tile>
  </msapplication>
</browserconfig>
```

