# Vanilla Js
## Sample integration

You can find the repository of the Vanilla-JS example project here: [Sample integration Vanilla-JS](https://github.com/porscheui/sample-integration-vanillajs)

## Get the project up and running
* Clone the repository by executing  
`git clone https://github.com/porscheui/sample-integration-vanillajs.git`
* Follow the installation guidelines in the README.md file

## Reproduce on your own

If you're using web components in a static website, the following page setup is recommended (assuming a web server is running):

``` 
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
### Prefixing
You can load the Porsche Design System with a custom unique prefix to prevent conflicts. Just pass the prefix as a parameter to the `load` method.
Keep in mind that prefixed versions only work with components that use shadow root. This means, that if you  do use prefixes, you can't use `p-grid`, `p-grid-item`, `p-flex` or `p-flex-item`.

``` 
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title>Porsche Design System</title>
    <script src="PATH/TO/PACKAGE/@porsche-design-system/components-js/index.js"></script>
    <script type="text/javascript">
      porscheDesignSystem.load({ prefix: 'sample-prefix' });
    </script>
  </head>
  <body>
    <sample-prefix-p-headline variant="headline-1">Some text</sample-prefix-p-headline>
  </body>
</html>
```
