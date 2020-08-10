# Flash Of Unstyled Content

Unstyled content when opening an application or website creates a bad first impression.
To prevent this, the Porsche Design System offers various solutions to ensure all necessary Porsche Design System fonts and components are fully loaded.

On this page you find detailed instructions on how to prevent Flash of Unstyled Components and Flash of Unstyled Text where we provide options to
boost your application performance, so make sure to keep reading.

## Flash of Unstyled Components


### Example usage with template 

We provide partials which you can use. Following example shows usage in a webpack project.

``` 
index.html

<head>
  <%= require('@porsche-design-system/components').getPorscheDesignSystemCoreStyles %>
</head>
``` 

### Example usage static

If you implement this static solution you have to keep track on the list and add every new component you use.

```

index.html

<head>
 <style>
    p-marque,p-button,p-button-pure,p-checkbox-wrapper,p-link,p-link-pure,p-link-social,p-select-wrapper,p-text-field-wrapper,p-pagination,p-radio-button-wrapper,p-textarea-wrapper,p-content-wrapper,p-divider,p-fieldset-wrapper,p-flex,p-flex-item,p-grid,
    p-grid-item,p-headline,p-marque,p-text-list,p-text-list-item,p-spinner,p-icon,p-text { visibility: hidden }
 </style>
</head>
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