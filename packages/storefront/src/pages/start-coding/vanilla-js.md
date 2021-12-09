# Vanilla Js

<TableOfContents></TableOfContents>

## Quick start
To build your own (non framework specific) application with **Native Web Components** of the Porsche Design System, follow these steps:

* Follow the instructions at [Introduction](start-coding/introduction) to get the required npm package
* Install the Porsche Design System

```shell script
// install with npm:
npm install @porsche-design-system/components-js

// install with yarn:
yarn add @porsche-design-system/components-js
```

After adding the `@porsche-design-system/components-js` package to your project, the following page setup is recommended (assuming a web server is running).

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title>Porsche Design System</title>
    <script src="PATH/TO/PACKAGE/@porsche-design-system/components-js/index.js"></script>
  </head>
  <body>
    <script type="text/javascript">
      porscheDesignSystem.load();
    </script>
    <p-headline variant="headline-1">Some text</p-headline>
  </body>
</html>
``` 

## Advanced usage

### When are Porsche Design System Components initialized?
See [componentsReady()](helpers/components-ready) for further information.

### Prefixing
You can load the Porsche Design System with a custom unique prefix to prevent conflicts. Just pass the prefix as a parameter to the `load` method.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title>Porsche Design System</title>
    <script src="PATH/TO/PACKAGE/@porsche-design-system/components-js/index.js"></script>
  </head>
  <body>
    <script type="text/javascript">
      porscheDesignSystem.load({ prefix: 'sample-prefix' });
    </script>
    <sample-prefix-p-headline variant="headline-1">Some text</sample-prefix-p-headline>
  </body>
</html>
```

## Sample integration
We provide a public Github repository with a basic sample project setup to show how it is managed in real code.
You can find the repository of the Vanilla-JS example project here: [Sample integration Vanilla-JS](https://github.com/porscheui/sample-integration-vanillajs)

### Get the project up and running
* Clone the repository by executing  
`git clone https://github.com/porscheui/sample-integration-vanillajs.git`
* Follow the installation guidelines in the README.md file