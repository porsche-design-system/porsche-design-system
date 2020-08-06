# Flash Of Unstyled Content

Unstyled content when opening an application or website creates a bad first impression.
To prevent this, the Porsche Design System offers various solutions to ensure all necessary Porsche Design System fonts and components are fully loaded.

On this page you find detailed instructions on how to prevent Flash of Unstyled Components and Flash of Unstyled Text where we provide options to
boost your application performance, so make sure to keep reading.

## Flash of Unstyled Components

The Porsche Design System fires the `porscheDesignSystemReady` event as soon as our core is loaded.
We export the event as constant called `PORSCHE_DESIGN_SYSTEM_READY_EVENT` to make sure you always listen to the correct event.

While waiting for the Event you should show a loading spinner which also hides the content of the page.
You can access a template called `loaderAllFonts` in our `@porsche-design-system/assets` package. Have a look at the examples to see how to use the
loader with template syntax. We provide a more detailed description of the provided loader at the end of the page.

### Example usage without Framework

The following example shows a spinner until the `porscheDesignSystemReady` event is fired and removes the style and loader afterwards.

```
<style>
index.html

<head>
  <style id="pdsLoaderStyle">
    .loader {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background:  #fff;
      z-index: 10000;
      font-family: "Porsche Next","Arial Narrow", Arial, sans-serif;
    }
    .spinner {
      position: absolute;
      width: 72px;
      top: 50%;
      left: 50%;
      margin: -36px 0 0 -36px;
      fill: none;
      transform: translate3d(0, 0, 0);
      stroke-width: 1px;
      stroke: #323639;
    }
    .fg {
      stroke-linecap: round;
      transform-origin: center center;
      stroke-dashoffset: 0;
      stroke-dasharray: 40, 200;
      animation: rotate 2s linear infinite, dash 2s ease-in-out infinite;
    }
    .bg {
      opacity: 0.4;
    }
    @keyframes rotate {
      100% {
        transform: rotate(360deg);
      }
    }
    @keyframes dash {
      0% {
        stroke-dasharray: 3, 1000;
      }
      50% {
        stroke-dasharray: 42, 1000;
      }
      100% {
        stroke-dasharray: 30, 1000;
        stroke-dashoffset: -52;
      }
    }
    .loader--all::before {
      content:'';
      font-weight: 100;
    }
    .loader--all::after {
      content: '';
      font-weight: 600;
    }
    .loader--all::first-line {
      font-weight: 700;
    }
  </style>
</head>
<body>
  <div class="loader loader--all" id="pdsLoader">
    <div class="spinner">
      <svg viewBox="0 0 32 32">
        <circle class="fg" cx="16" cy="16" r="9" />
        <circle class="bg" cx="16" cy="16" r="9" /
      </svg>
    </div>
  </div>
<script>
  document.addEventListener('porscheDesignSystemReady', () => {
     document.body.removeChild(document.getElementById('pdsLoader'));
     document.head.removeChild(document.getElementById('pdsLoaderStyle'));
  }, { once: true });
  </script>
</body>
``` 

### Example usage with Frameworks

If you use a framework like `react`, `vue`, `angular` ... there are two different approaches on how to handle the display of the Spinner.

First, implement the spinner and the style in the `<div id="root">` (react) / `<app-root>` (angular). While doing so the spinner is shown until your
application is bootstrapped and hides any flash.

For this example we use loadash template syntax which works in most frameworks. We recommend using templates to keep your workload at a minimum
and ensure you are always using the latest styles. If you have no option of using templates, you can copy the style and spinner from the example above and
put it there instead.

``` 
index.html

<div id="root">
  <%= require('@porsche-design-system/assets').loaderAllFonts %>
</div>
``` 

The second approach is similar to the very first example. You can do it as shown and place the loading spinner before the `root` element and remove
it as soon as your application is bootstrapped and got the `porscheDesignSystemReady` event.

``` 
App.tsx (react)

useEffect(() => {
 document.addEventListener(PORSCHE_DESIGN_SYSTEM_READY_EVENT, () => {
   document.body.removeChild(document.getElementById('pdsLoader'));
   document.body.removeChild(document.getElementById('pdsLoaderStyle'));
 });
}, []);

app.components.ts (angular)

ngOnInit(){
 document.addEventListener(PORSCHE_DESIGN_SYSTEM_READY_EVENT, () => {
   document.body.removeChild(document.getElementById('pdsLoader'));
   document.head.removeChild(document.getElementById('pdsLoaderStyle'));
 });
}
```

## Flash of unstyled Text

The Porsche Design System provides font face definitions and loads all needed fonts dynamically from our cdn. Until the fonts are fully loaded
the components use the fallback and you can see a little change as soon as loading is finished.

### Inject Porsche Design System Stylesheet

So far, if you use the Porsche Design System components we inject the stylesheet into the head of your application as soon as our core is loaded.
We recommend that you load the stylesheet on your own. We dont wont to interfere with you application if we dont have to. Also you got more
control over resources that are loaded.

We provide the URL to our stylesheet in our `@porsche-design-system/assets` package with the name `FONTS_STYLESHEET_CDN_URL`. We also
provide a ready to use html template `fontFaceCssElement` there.

#### Example

```
index.html
<head>
  <link rel="stylesheet" href="http://path/to/cdn/font-face.css"/>
</head>

Using template syntax
<head>
  <%= require('@porsche-design-system/assets').fontFaceCssElement %>
</head>
```

### Preload specific Fonts

Fonts should be loaded as soon as possible but only those which are needed. The Porsche Design System is not able to determine which components
you use on the site and which fonts we have to provide initially but we provide two solutions on how you can preload fonts on starting your application.
This will help you boost the performance of your application.

First approach via the `pdsLoader`. Maybe you already wondered why there is a `before`, `after` and  `first-line` in the loader style. If you use the
`loaderAllFonts` from the `@porsche-design-system/assets` package and you statically inject the stylesheet in the head of your application, the `pdsLoader` triggers
the loading of our latin webfont in all different weights that we provide.
If you dont want all weights to be loaded we provide the `loaderRegular` which only loads the regular font per default. Add `loaderThin`, `loaderSemibold` or `loaderBold`
to customize which font-weights you want to load.

The second solution works with manually preloading the fonts. If you choose this way, we provide all necessary URL´s in the `@porsche-design-system/assets` package.
Use the `FONTS_CDN_BASE_URL` and the `FONTS_MANIFEST` which contains all filenames for all the different fonts. Combine both
and preload it as the second example shows.

#### Example with loader

Use only the font-weights you also use on your site. 
**Note:** Make sure the `laoderRegular` is on the last position otherwise you wont see the spinner.

```
index.html

<div id="root">
  <%= require('@porsche-design-system/assets').loaderThin %>
  <%= require('@porsche-design-system/assets').loaderSemibold %>
  <%= require('@porsche-design-system/assets').loaderBold %>
  <%= require('@porsche-design-system/assets').loaderRegular %>
</head>
```

#### Example with preload

```
<head>
 <link
   rel="preload"
   href="path/to/webfont"
   as="font"
   type="font/woff2"
   crossorigin
 />
</head>
```