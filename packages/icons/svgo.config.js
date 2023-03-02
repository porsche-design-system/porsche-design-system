/**
 * @type {import('svgo').Config}
 */
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
    'removeDimensions', // add viewBox and set width and height to 100%
    {
      name: 'removeAttrs', // remove attributes by pattern
      params: {
        elemSeparator: '>',
        attrs: '(stroke|fill|xml:space)', // ensures coloring is applicable by CSS
      },
    },
    {
      name: 'addAttributesToSVGElement', // adds attributes to an outer <svg> element
      params: {
        attributes: [
          { width: '100%' }, // ensures optimal scaling behaviour
          { height: '100%' }, // ensures optimal scaling behaviour
        ],
      },
    },
  ],
};
