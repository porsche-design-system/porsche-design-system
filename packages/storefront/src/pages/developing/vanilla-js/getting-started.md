# Vanilla Js

<TableOfContents></TableOfContents>

## Quick start

To build your own (non framework specific) application with **Native Web Components** of the Porsche Design System,
follow these steps:

- Follow the instructions at [Introduction](developing/introduction) to get the required npm package
- Install the Porsche Design System

```shell script
// install with npm:
npm install @porsche-design-system/components-js

// install with yarn:
yarn add @porsche-design-system/components-js
```

## Integration

After adding the `@porsche-design-system/components-js` package to your project, the following page setup is recommended
(assuming a web server is running).

```html
<!doctype html>
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
    <p-heading>Welcome to Vanilla JS</p-heading>
  </body>
</html>
```

<Notification heading="Attention" heading-tag="h3" state="warning">
  Now, when you look at the result in your browser you should see an error message like 
  <code>The Porsche Design System is used without using the getInitialStyles() partial.</code><br>
  To fix this, you have to apply the <a href="partials/initial-styles">getInitialStyles() partial</a> which is mandatory since v3.7.0.
</Notification>

## When are Porsche Design System components initialized?

See [componentsReady()](developing/components-ready) for further information.

## How do Porsche Design System components work in detail?

See [Initialization](must-know/initialization/introduction) for further information.

## Sample integration

We provide a public GitHub repository with a basic sample project setup to show how it is managed in real code.  
You can find the repository of the Vanilla-JS example project here:
[Sample integration Vanilla-JS](https://github.com/porsche-design-system/sample-integration-vanillajs)

### Get the project up and running

- Clone the repository by executing  
  `git clone https://github.com/porsche-design-system/sample-integration-vanillajs.git`
- Follow the installation guidelines in the `README.md` file
