# Porsche Design System - Partials

This package provides partials for the Porsche Design System.

## Install
```
// install with npm:
npm install @porsche-design-system/partials --save-dev

// install with yarn:
yarn add @porsche-design-system/partials --dev
```

## Usage

Use the partials by including them in the `<head>` of your application.
The functions return html snippets. You find detailed documentation [here](https://designsystem.porsche.com/v2/#/helpers/flash-of-unstyled-content)

```
Example within Webpack projects

<head>
  <%= require('@porsche-design-system/partials').getFontFaceCSS() %>
  <%= require('@porsche-design-system/partials').getPorscheDesignSystemCoreStyles() %>
</head>
```

## Test

Run `yarn test` to test the provided partials.

## Build

Bundle partials with `yarn build`

