# Troubleshooting

If you experience any problems with the Porsche Design System, it's always a good idea to check here
first, if there is a known solution for it.

<TableOfContents></TableOfContents>

## Components are not working in IE11
1. With old New Relic snippets, there might be incompatibilities with the loaded polyfills. This might break the components in IE11. Please try to update your New Relic snippet to the latest version.
1. There might be polyfill conflicts with other libraries that you use. Please check if there are any libs that load polyfills, especially ones that provide web components. For example if the widely used [`document-register-element`](https://github.com/WebReflection/document-register-element) polyfill is loaded in parallel to the Porsche Design System or other Stencil based libraries, Stencil will fail to load. Be sure to use the polyfills that Stencil provides and don't load the ones from other libraries, or load Stencil compatible polyfills before the other libraries are loaded.
