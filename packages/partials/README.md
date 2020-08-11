# Porsche Design System - Partials

This package provides partials for the Porsche Design System.

## Install
It's necessary to have access to the Porsche Design System private NPM registry to be able to install the `@porsche-design-system/partials` NPM package. 
If you don't have an account yet, please first [read more about getting started as developer](#/start-coding/introduction).

```
// install with npm:
npm install @porsche-design-system/partials --save-dev

// install with yarn:
yarn add @porsche-design-system/partials --dev
```

## Usage

Use the partials with require in the `<head>` of your application.
The functions return html snippets. You find detailed documentation [here](#/helpers/flash-of-unstyled-content)

```
<head>
  <%= require('@porsche-design-system/partials').getFontFaceCSS() %>
  <%= require('@porsche-design-system/partials').getPorscheDesignSystemCoreStyles() %>
</head>
```

## Test

Run `yarn test` to test the provided partials.

## Build

Bundle partials with `yarn build`

