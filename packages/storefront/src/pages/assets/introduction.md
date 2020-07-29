# Introduction

## Porsche Design System - Assets

Porsche Design System stores some files like icons, fonts, marque, etc. as versioned static assets on CDN for fast delivery and improved caching. 
Most of these assets are used within our components (e.g. `<p-marque>`) but can also be used as standalone assets in projects which either do not use the Porsche Design System or we can't deliver a corresponding component for the asset (e.g. favicons).

To give teams the possibility to get the versioned file paths to these static assets we provide an asset package which contains manifest files and CDN URLs for easy reference to our global asset files.

**Actually we provide assets for:**
- [Icons](#/assets/icons)
- [Metaicons like favicon and touch icons](#/assets/metaicons)
- [Marque](#/assets/marque)
- [Porsche Next Webfonts](#/assets/fonts)

### Install
It's necessary to have access to the Porsche Design System private npm registry to be able to install the `@porsche-design-system/assets` npm package. 
If you don't have an account yet, please first [read more about getting started as developer](#/start-coding/introduction).

```
// install with npm:
npm install @porsche-design-system/assets

// install with yarn:
yarn add @porsche-design-system/assets
```

### Usage
See corresponding section...