# Vanilla Js

<TableOfContents></TableOfContents>

## Prefixing
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
