# Meta Tags / Icon Links

To simplify cross device fav and meta icons implementation we provide a `getMetaTagsAndIconLinks` partial.

##### Options:
- **appTitle:** string
- **cdn:** 'auto' | 'cn' = 'auto'

#### Example usage with dynamic template 

The example shows how to implement the partial in a webpack (or similar) project.


```html
// index.html

<head>  
  // with appTitle only
  <%= require('@porsche-design-system/components-{js|angular|react}/partials').getMetaTagsAndIconLinks({ appTitle: 'TITLE_OF_YOUR_APP' }) %>
</head>

<head>
  // force using China CDN
  <%= require('@porsche-design-system/components-{js|angular|react}/partials').getMetaTagsAndIconLinks({ appTitle: 'TITLE_OF_YOUR_APP', cdn: 'cn' }) %>
</head>

```


#### Alternative: Example usage with placeholder

If your bundler (webpack or similar) does not work with the syntax of the previous example you can put a placeholder in your markup and replace its content with a script.

```html
// index.html

<head>
  <!--PLACEHOLDER_PORSCHE_DESIGN_SYSTEM_META_TAGS_AND_ICON_LINKS-->
</head>
``` 

```json
// package.json (tested on macOS, the script may need to be adjusted depending on the operating system used)

"scripts": {
  "prestart": "yarn replace",
  "replace": "placeholder='<!--PLACEHOLDER_PORSCHE_DESIGN_SYSTEM_META_TAGS_AND_ICON_LINKS-->' && partial=$placeholder$(node -e 'console.log(require(\"@porsche-design-system/components-js/partials\").getMetaTagsAndIconLinks({ appTitle: 'TITLE_OF_YOUR_APP' }))') && regex=$placeholder'.*' && sed -i '' -E -e \"s@$regex@$partial@\" index.html",
}
``` 
