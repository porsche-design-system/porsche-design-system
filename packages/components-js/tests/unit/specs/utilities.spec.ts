import * as jssUtilities from '@porsche-design-system/components-js/utilities/js';

it.each<keyof typeof jssUtilities>(['fontFamily', 'fontVariant'])('should be of type string: %s', (util) => {
  expect(typeof jssUtilities[util]).toBe('string');
});

it.each<keyof typeof jssUtilities>(['colorExternal', 'themeLight', 'themeDark', 'headingLarge', 'textSmall'])(
  'should be of type object: %s',
  (util) => {
    expect(typeof jssUtilities[util]).toBe('object');
  }
);

it.each<keyof typeof jssUtilities>(['getFocus', 'mediaQueryMin'])('should be of type function: %s', (util) => {
  expect(typeof jssUtilities[util]).toBe('function');
});
