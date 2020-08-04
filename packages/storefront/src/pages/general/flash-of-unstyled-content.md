# Flash Of Unstyled Content

Unstyled components or text when opening an application or website create a bad first impression.
To prevent this, the Porsche Design System offers various solutions to ensure all necessary Porsche Design System fonts and components are fully loaded.

## Wait for event

As mentioned, we provide different approaches. The simplest solution is by waiting for the `porscheDesignSystemReady` event.
We provide it as constant `PORSCHE_DESIGN_SYSTEM_READY_EVENT` to make sure you always listen to the correct event.
The event is fired as soon as all our components are ready and it checks if the web-fonts are fully loaded from the cdn.

### Example usage

Hide your application until you receive the event.

``` 
index.html

<body>
  <div id="app"><div/>
  <script type="text/javascript">
    document.getElementById('app').style.visibility = "hidden";
    document.addEventListener('porscheDesignSystemReady', () => document.getElementById('app').style.visibility = "visible";);
  </script>
</body>
```

## Preloading web-fonts 

The second approach is via preloading. If you want all fonts to be loaded directly and as fast as possible you have to
*preload* all needed web-fonts to guarantee no flash of unstyled text.

### Example usage

While installing the `@porsche-design-system/components-js` we list all current cdn paths to the webfonts in your console.
Copy and paste them into the `<head>` of your application. 

**NOTE:** It is still necessary to wait for the `porscheDesignSystemReady` event to recall if all components are loaded.

```
index.js
<head>
// Porsche Design System stylesheet which contains all paths to the webfonts, has to be in this format.
<link rel="preload" href="path/to/stylesheet" as="style" onload="this.rel='stylesheet'">

// All of the Porsche Design System web-fonts have to be in this format.
<link rel="preload" href="path/to/webfont" as="font" type="font/woff2" crossorigin>
</head>
<body>
  <div id="app"><div/>
  <script type="text/javascript">
        document.getElementById('app').style.visibility = "hidden";
        document.addEventListener('porscheDesignSystemReady', () => document.getElementById('app').style.visibility = "visible";);
  </script>
</body>
```

## Usage without Porsche Design System Components

In case you only care for flash of unstyled text, because you dont use any of our components,
you have to preload all webfonts in the head of your application.

It is possible to import the URLs required for the link tag and build them within the project using a script. 
In our package `@porsche-design-system/assets` we provide `FONTS_CDN_CSS_FILE_URL` which contains the URL to the style file as well as 
`FONTS_CDN_BASE_URL` and `FONTS_MANIFEST` to reach the actual fonts. The manifest contains the file name of the desired font and together with the base URL it leads
to the file on the CDN.

**Note:** Make sure while building your `Link` tags you keep the structure as in the example.
The preload of the CSS file needs `rel="preload"` and `onload="this.rel="stylesheet"` to be loaded properly.

Alternatively, you can copy all tags you need from the example beneath. Those are valid url´s and we will updated the example if anything changes.

**Note:** In this case you have to check our changelog and update your `preload links` if the cdn-address or the fonts change.

```
index.js
<head>
// Porsche Design System stylesheet which contains all paths to the webfonts
<link rel="preload" href="https://cdn.ui.porsche.com/porsche-design-system/style/font-face.min.677d41d9905a04aadcb253f71e5f71e9.css" as="style" onload="this.rel='stylesheet'">

// All of the Porsche Design System web-fonts. Pick all you need!
<link rel="preload" href="https://cdn.ui.porsche.com/porsche-design-system/fonts/porsche-next-w-cy-bold.min.7cdedd410a2c4d5eff06f422dd91f17f.woff" as="font" type="font/woff" crossorigin>
<link rel="preload" href="https://cdn.ui.porsche.com/porsche-design-system/fonts/porsche-next-w-cy-bold.min.0ac00809c450f03d979c9880d9bac8d5.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="https://cdn.ui.porsche.com/porsche-design-system/fonts/porsche-next-w-cy-regular.min.15a059a5cb66ae52ef50bc5a7b682e5e.woff" as="font" type="font/woff" crossorigin>
<link rel="preload" href="https://cdn.ui.porsche.com/porsche-design-system/fonts/porsche-next-w-cy-regular.min.55de106262f6ca384ffd47d3c7bafa72.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="https://cdn.ui.porsche.com/porsche-design-system/fonts/porsche-next-w-cy-semi-bold.min.f62d70671810191bbf1e62d5ef8ff650.woff" as="font" type="font/woff" crossorigin>
<link rel="preload" href="https://cdn.ui.porsche.com/porsche-design-system/fonts/porsche-next-w-cy-semi-bold.min.c8e7952de2dd408b531fd4f65cfef779.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="https://cdn.ui.porsche.com/porsche-design-system/fonts/porsche-next-w-cy-thin.min.8031071403f0a7abe75253e74fb5c9e5.woff" as="font" type="font/woff" crossorigin>
<link rel="preload" href="https://cdn.ui.porsche.com/porsche-design-system/fonts/porsche-next-w-cy-thin.min.bb8916ec087455512d06285219552380.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="https://cdn.ui.porsche.com/porsche-design-system/fonts/porsche-next-w-gr-bold.min.870d2b04a828a5a5b143dd4e133459bc.woff" as="font" type="font/woff" crossorigin>
<link rel="preload" href="https://cdn.ui.porsche.com/porsche-design-system/fonts/porsche-next-w-gr-bold.min.1432bec38ec3a9a177e69866c4731379.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="https://cdn.ui.porsche.com/porsche-design-system/fonts/porsche-next-w-gr-regular.min.8a53f011968865488fd12487346a269e.woff" as="font" type="font/woff" crossorigin>
<link rel="preload" href="https://cdn.ui.porsche.com/porsche-design-system/fonts/porsche-next-w-gr-regular.min.edae5100c766fc03349d97628ea19a41.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="https://cdn.ui.porsche.com/porsche-design-system/fonts/porsche-next-w-gr-semi-bold.min.30441ea9bc5ca88558d7233d15c9d59b.woff" as="font" type="font/woff" crossorigin>
<link rel="preload" href="https://cdn.ui.porsche.com/porsche-design-system/fonts/porsche-next-w-gr-semi-bold.min.29b741a0f8c53e50f0c3f70dbaff0746.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="https://cdn.ui.porsche.com/porsche-design-system/fonts/porsche-next-w-gr-thin.min.8375ae0c13874373956106261ccc4560.woff" as="font" type="font/woff" crossorigin>
<link rel="preload" href="https://cdn.ui.porsche.com/porsche-design-system/fonts/porsche-next-w-gr-thin.min.64ca0f5f95ffb2931058271e4e2ebaad.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="https://cdn.ui.porsche.com/porsche-design-system/fonts/porsche-next-w-la-bold.min.d7a769e25c499039363825694211d103.woff" as="font" type="font/woff" crossorigin>
<link rel="preload" href="https://cdn.ui.porsche.com/porsche-design-system/fonts/porsche-next-w-la-bold.min.a2b8bddadf87ab229724de45b3c81788.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="https://cdn.ui.porsche.com/porsche-design-system/fonts/porsche-next-w-la-regular.min.314aeb122ecbd00b542440e3cfeed1ae.woff" as="font" type="font/woff" crossorigin>
<link rel="preload" href="https://cdn.ui.porsche.com/porsche-design-system/fonts/porsche-next-w-la-regular.min.1263496c6f00026b958f812a963a424c.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="https://cdn.ui.porsche.com/porsche-design-system/fonts/porsche-next-w-la-semi-bold.min.0bc2fac61123dd3accc735996033d286.woff" as="font" type="font/woff" crossorigin>
<link rel="preload" href="https://cdn.ui.porsche.com/porsche-design-system/fonts/porsche-next-w-la-semi-bold.min.f196c38e31df69088e8d6934dbf32ba5.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="https://cdn.ui.porsche.com/porsche-design-system/fonts/porsche-next-w-la-thin.min.bd904ad79a4507e1ddabe089de9241da.woff" as="font" type="font/woff" crossorigin>
<link rel="preload" href="https://cdn.ui.porsche.com/porsche-design-system/fonts/porsche-next-w-la-thin.min.80d6d2d71edf4b00d5dc3dc22ffed418.woff2" as="font" type="font/woff2" crossorigin>
</head>
```