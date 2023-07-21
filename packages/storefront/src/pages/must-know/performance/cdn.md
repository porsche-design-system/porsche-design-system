# Performance

The Porsche Design System **components**, **marque**, **icons**, **fonts** and **styles** are delivered by CDN
(cdn.ui.porsche.com). This way all digital Porsche products share and use the cached and versioned assets independently.

<TableOfContents></TableOfContents>

## Explanation

Let's have a look at following applications and assume that all of these applications have integrated a Porsche Design
System Button:

- [Porsche.com](https://www.porsche.com) created with Vanilla JS
- [Porsche Finder](https://finder.porsche.com) created with React
- [My Porsche](https://login.porsche.com/login) created with Angular

When e.g. a user visits **Porsche.com** then the Porsche Design System Button gets loaded for the first time and will be
automatically stored in browser cache. Imagine the same user switches to the **Porsche Finder** or **My Porsche**
application which uses the same button then it will instantly be available because it's already in browser cache. Which
means for the second and any further application less network requests and loading time.

This way performance and consistency can be dramatically increased across all digital Porsche products using the Porsche
Design System.

## China CDN

When requests are made from China the CDN (cdn.ui.porsche.**com**) is configured to automatically forward those requests
to a CDN hosted in China (cdn.ui.porsche.**cn**) which finally responses the request. Why? Because it's local law.
Anyway this way we provide an easy way to use the Porsche Design System assets without worrying about performance in
China or the rest of world with zero configuration.

Because of the automatic forwarding strategy the amount of requests increases in China and the forwarding itself also
costs each time some milliseconds. That's why the Porsche Design System provides the optional possibility to define from
which CDN those assets shall be loaded to get maximum performance in China.

To achieve this, a global browser variable `PORSCHE_DESIGN_SYSTEM_CDN` was introduced which needs to be defined before
initializing the Porsche Design System.  
Possible values that can be assigned:

- `auto` (default - using RoW CDN and redirects to Chinese CDN automatically when necessary)
- `cn` (forces using Chinese CDN directly) This gives the possibility for the consuming application to have either two
  dedicated builds for their application, one for China and one for RoW (rest of world) or following the build once,
  deploy many principle, it can be configured at start-up time.

Since handling the global configuration variable `PORSCHE_DESIGN_SYSTEM_CDN` isn't very nice, the
`porscheDesignSystem.load()` function accepts a `cdn: 'auto' | 'cn'` option which will then set the
`PORSCHE_DESIGN_SYSTEM_CDN` for backwards compatibility and therefore affecting other micro frontends within the same
website or app.

The same can be achieved in all supported frameworks via the respective module or provider like

- Angular: `PorscheDesignSystemModule.load({ cdn: 'cn' })`
- React: `<PorscheDesignSystemProvider cdn="cn" />`
- Vue: `<PorscheDesignSystemProvider cdn="cn" />`

### Example (index.html)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Porsche Design System</title>
    <script type="text/javascript" src="path-to-porsche-design-system.js"></script>
  </head>
  <body>
    <script>
      // all requests to the Porsche Design System CDN are forced to use the Chinese CDN directly
      porscheDesignSystem.load({ cdn: 'cn' });
    </script>
  </body>
</html>
```

Also, all CDN related partials of the `@porsche-design-system/components-{js|angular|react|vue}/partials` packages have
an option `{ cdn: 'auto' | 'cn' }` to force preloading assets from Chinese CDN directly, e.g.:

```html
<head>
  <%= require('@porsche-design-system/components-{js|angular|react|vue}/partials').getFontFaceStylesheet({ cdn: 'cn' })
  %>
</head>
```
