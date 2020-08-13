# Flash Of Unstyled Content

Unstyled content when opening an application or website creates a bad first impression.
To prevent this, the Porsche Design System offers various solutions to ensure all necessary Porsche Design System fonts and components are fully loaded.

On this page you find detailed instructions on how to prevent Flash of Unstyled Content and Flash of Unstyled Text where we provide options to
boost your application, so make sure to keep reading.

## Unstyled Porsche Design System Components

If you use `Porsche Design System` components, we take care that your application only renders a component if it is fully styled.
But there is a blink until our core is loaded and we can take action. This short timespan has to be covered.

There are two ways to get rid of FOUC. We provide partials in our `@porsche-design-system/partials` package for you to import into the `<head>` of your `index.html`.
The example shows how to implement a partial in a webpack project. 

If you are not able to use partials use the second, static solution. Just copy the whole `<style>` tag from the second example and put it into the `<head>`
of the `index.html` of your application. While using the static solution, make sure to list every component you use and 
update the list when you upgrade the version of the `Porsche Design Sytem` with new components introduced.

### Example usage with template 

``` 
// index.html

<head>
  <%= require('@porsche-design-system/partials').getPorscheDesignSystemCoreStyles() %>
</head>
``` 

### Example usage static

**Note:** If you implement this static solution you have to keep track of the list and add every new component you use.

```
// index.html

<head>
  {{coreStyles}}
</head>
```

## Flash of Unstyled Text

The Porsche Design System provides font face definitions and loads all needed fonts dynamically from our CDN. Until the fonts are fully loaded
the components use the fallback font and you can see a little change as soon as loading is finished.

### Inject Porsche Design System Stylesheet

So far, if you use the Porsche Design System components we inject the stylesheet with all font face definitions into the head of your application as soon as our core is loaded.
We recommend that you load the stylesheet on your own. We don't want to interfere with you application if we don't have to. Also you got more
control over resources that are loaded.

We provide the URL to our stylesheet in our `@porsche-design-system/assets` package with the name `FONT_FACE_CDN_URL`. We also
provide a ready to use partial in the `@porsche-design-system/partials` package called `getFontFaceCSS()`.

If you use the static solution you have to update the `<Link>` if changes are made in our font face definitions. But don't worry, we don't remove old files
to grant you a valid fallback.

#### Example

```
// index.html
// Using template syntax
<head>
  <%= require('@porsche-design-system/partials').getFontFaceCSS() %>
</head>

// Static solution
// If you use the static solution watch your console output. We notify if changes happen.
<head>
  {{fontFaceCSS}}
</head>
```

### Preload specific Fonts

Fonts should be loaded as soon as possible but only those which are needed. The Porsche Design System is not able to determine which components
you use on the site and which fonts we have to provide initially but we export all resources you need to preload fonts and solve 'Flash of Unstyled Text' in your application

We provide all URL´s you need in the `@porsche-design-system/assets` package.
Use the const `FONTS_CDN_BASE_URL` which is the basic path to the CDN and the object `FONTS_MANIFEST` which contains the filenames of all `fonts` 
and according `weights` in either `woff` or `woff2` file format. Combine the path and filename to preload them as `href` in a `<Link>` at the head of your `index.html`.

#### Example preload

```
<head>
 <link
   rel="preload"
   href="path/to/webfont/nameOfWebFontFile"
   as="font"
   type="font/woff2"
   crossorigin
 />
</head>
```

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { getFontFaceCSS, getPorscheDesignSystemCoreStyles } from '@porsche-design-system/partials';
  
  @Component
  export default class FlashOfUnstyledContent extends Vue {
    public fontFaceCSS = getFontFaceCSS();
    public coreStyles = getPorscheDesignSystemCoreStyles().replace('>', '>\n    ').replace(/,/g, ',\n    ').replace('}', '}\n  ');
  }
</script>