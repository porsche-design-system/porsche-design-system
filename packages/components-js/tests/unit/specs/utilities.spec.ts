import * as jssUtilities from '@porsche-design-system/components-js/utilities/jss';

it.each<keyof typeof jssUtilities>(['color', 'font', 'themeLight', 'themeDark'])(
  'should be of type object: %s',
  (util) => {
    expect(typeof jssUtilities[util]).toBe('object');
  }
);

it.each<keyof typeof jssUtilities>([
  'getContentWrapperJssStyle',
  'getFocusJssStyle',
  'mediaQueryMin',
  'getScreenReaderOnlyJssStyle',
])('should be of type function: %s', (util) => {
  expect(typeof jssUtilities[util]).toBe('function');
});
