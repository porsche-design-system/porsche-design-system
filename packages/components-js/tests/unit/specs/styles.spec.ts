import * as styles from '@porsche-design-system/components-js/emotion';

it.each<keyof typeof styles>(['fontFamily', 'fontVariant'])('should be of type string: %s', (util) => {
  expect(typeof styles[util]).toBe('string');
});

it.each<keyof typeof styles>(['themeLight', 'themeDark', 'headingLargeStyle', 'textSmallStyle'])(
  'should be of type object: %s',
  (util) => {
    expect(typeof styles[util]).toBe('object');
  }
);

it.each<keyof typeof styles>(['getFocusStyle', 'getMediaQueryMin'])('should be of type function: %s', (util) => {
  expect(typeof styles[util]).toBe('function');
});
