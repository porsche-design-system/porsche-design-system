# Introduction

<TableOfContents></TableOfContents>

## Porsche Design System - Assets
Porsche Design System stores some files like icons, fonts, marque, etc. as versioned static assets on a CDN for fast delivery and improved caching. 
Most of these assets are used within our components (e.g. `<p-marque>`) but can also be used as standalone assets in projects which either can't use the Porsche Design System or it does not exist a corresponding component for the asset (e.g. favicons).

To give teams the possibility to get the versioned file paths to these static assets we provide an asset package which contains **manifest files** (not the assets itself) to easily reference to our global asset files.

**Actually we provide assets for:**
- [Icons](assets/icons)
- [Meta Icons](assets/meta-icons) (like favicon and touch icons)
- [Marque](assets/marque)
- [Fonts](assets/fonts)

### Install
It's necessary to have access to the Porsche Design System private npm registry to be able to install the `@porsche-design-system/assets` npm package. 
If you don't have an account yet, please first [read more about getting started as developer](start-coding/introduction).

```shell
// install with npm:
npm install @porsche-design-system/assets

// install with yarn:
yarn add @porsche-design-system/assets
```

### Usage
See corresponding section of [Icons](assets/icons), [Meta Icons](assets/meta-icons) (like favicon and touch icons), [Marque](assets/marque) and [Fonts](assets/fonts)