import * as jssUtilities from '@porsche-design-system/components-js/utilities/js';

it.each<keyof typeof jssUtilities>(['fontFamily', 'fontVariant'])('should be of type string: %s', (util) => {
  expect(typeof jssUtilities[util]).toBe('string');
});

it.each<keyof typeof jssUtilities>(['themeLight', 'themeDark', 'headingLargeStyle', 'textSmallStyle'])(
  'should be of type object: %s',
  (util) => {
    expect(typeof jssUtilities[util]).toBe('object');
  }
);

it.each<keyof typeof jssUtilities>(['getFocusStyle', 'getMediaQueryMin'])('should be of type function: %s', (util) => {
  expect(typeof jssUtilities[util]).toBe('function');
});
