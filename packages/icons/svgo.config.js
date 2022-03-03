module.exports = {
  floatPrecision: 3,
  plugins: [
    // { name: 'removeViewBox' }, // ensures view box is not changed
    { name: 'cleanupIDs' },
    { name: 'removeDimensions' }, // ensures custom width + height is settable by addAttributesToSVGElement plugin
    { name: 'sortAttrs' }, // sort element attributes for epic readability
    {
      name: 'removeAttrs',
      params: {
        attrs: '(stroke|fill)', // ensures coloring is applicable by CSS
      },
    },
    {
      name: 'addAttributesToSVGElement',
      params: {
        attributes: [
          { width: '100%' }, // ensures optimal scaling behaviour
          { height: '100%' }, // ensures optimal scaling behaviour
        ],
      },
    },
    { name: 'convertPathData', params: { noSpaceAfterFlags: false } },
    { name: 'mergePaths', params: { noSpaceAfterFlags: false } },
  ],
};
