# Porsche Design System - Components JS

Porsche Design System is a component library designed to help developers create the best experience for software or
services distributed by Dr. Ing. h.c. F. Porsche AG. Visit the [Porsche Design System](https://designsystem.porsche.com)
to learn more.

## Using the Porsche Design System

### Installation

Run the following command using [npm](https://www.npmjs.com):

```bash
npm install @porsche-design-system/components-js
```

If you prefer [Yarn](https://yarnpkg.com), use the following command instead:

```bash
yarn add @porsche-design-system/components-js
```

### Usage

After adding the `@porsche-design-system/components-js` package to your project, the following page setup is recommended
(assuming a web server is running).

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1.0" />
    <title>Porsche Design System</title>
    <script src="PATH/TO/PACKAGE/@porsche-design-system/components-js/index.js"></script>
  </head>
  <body>
    <script type="text/javascript">
      porscheDesignSystem.load();
    </script>
    <p-button>Some label</p-button>
  </body>
</html>
```

## Methodology

Our goal is to provide easy-to-use and well-documented components so that developers don’t need to worry about the
implementation but can focus on easily creating qualitative and consistent digital Porsche experiences. We ensure that
our components are made for everyone and meet latest quality standards of usability, accessibility, performance and
compatibility. In some points the components are built restrictive to define consistent standards for diverse Porsche
applications but ensure enough flexibility to meet different context requirements.

## License

- See **Custom License** within npm package
