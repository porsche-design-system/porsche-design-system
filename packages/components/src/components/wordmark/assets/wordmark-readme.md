The Wordmark SVG `wordmark-raw.svg` was optimized with SVGO and stored as `wordmark-optimized.svg` (it's also used as
inline SVG within `p-wordmark`) using following SVGO configuration:

```js
module.exports = {
  multipass: true,
  floatPrecision: 3,
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          removeViewBox: false, // ensures view box is not changed
        },
      },
    },
    'sortAttrs', // sort element attributes for epic readability
    'convertStyleToAttrs', // convert styles into attributes
    {
      name: 'removeAttrs', // remove attributes by pattern
      params: {
        elemSeparator: '>',
        attrs: '(stroke|fill|xml:space)', // ensures coloring is applicable by CSS
      },
    },
  ],
};
```
