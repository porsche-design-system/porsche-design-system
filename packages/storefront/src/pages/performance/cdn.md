# Cdn

The Porsche Design System **components**, **marque**, **icons**, **fonts** and **styles** are delivered by CDN (cdn.ui.porsche.com). 
This way all digital Porsche products share and use the cached and versioned assets independently. 

<TableOfContents></TableOfContents>

## Explanation
Let's have a look at following applications and assume that all of these applications have integrated a Porsche Design System Button:
* [Porsche.com](https://www.porsche.com) created with Vanilla JS
* [Porsche Finder](https://finder.porsche.com) created with React
* [My Porsche](https://login.porsche.com/login) created with Angular

When e.g. a user visits **Porsche.com** then the Porsche Design System Button gets loaded for the first time and will be automatically stored in browser cache.
Imagine the same user switches to the **Porsche Finder** or **My Porsche** application which uses the same button then it will instantly be available because it's already in browser cache.
Which means for the second and any further application less network requests and loading time.

This way performance and consistency can be dramatically increased across all digital Porsche products using the Porsche Design System.

## China CDN
When requests are made from China the CDN (cdn.ui.porsche.**com**) is configured to automatically forward those requests to a CDN hosted in China (cdn.ui.porsche.**cn**) which finally responses the request.
Why? Because it's local law. Anyway this way we provide an easy way to use the Porsche Design System assets without worrying about performance in China or the rest of world with zero configuration.

Because of the automatic forwarding strategy the amount of requests increases in China and the forwarding itself also costs each time some milliseconds. 
That's why the Porsche Design System provides the optional possibility to define from which CDN those assets shall be loaded to get maximum performance in China.

To achieve this, a global browser variable `PORSCHE_DESIGN_SYSTEM_CDN` was introduced which can be defined in the projects `index.html`.  
Possible values that can be assigned:
* `auto` (default - using RoW CDN and forwards to Chinese CDN automatically when necessary) 
* `cn` (forces using Chinese CDN only)
This gives the possibility for the consuming application to bundle to separate builds for their application. One for China and one for RoW (rest of world).

### Example (index.html)
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <title>Porsche Design System</title>
  <script type="text/javascript" src="path-to-porsche-design-system.js"></script>
</head>
<body>
<script>
  // All requests to the Porsche Design System CDN are forced to use the Chinese CDN directly.
  // It's very important that the variable is defined before the Porsche Design System get initialized!
  PORSCHE_DESIGN_SYSTEM_CDN = 'cn';
  porscheDesignSystem.load();
</script>
</body>
</html>
```

Also, the function `getFontFaceStylesheet()` of the `@porsche-design-system/components-{js|angular|react}/partials` packages was extended with the option `{ cdn: 'auto' | 'cn' }` to force loading the font-face style definitions from Chinese CDN only, e.g.:

```html
<head>
  <%= require('@porsche-design-system/components-{js|angular|react}/partials').getFontFaceStylesheet({ cdn: 'cn' }) %>
</head>
```