import { getCheckboxRadioLabelJssStyle } from './checkbox-radio-styles';

it.each<Parameters<typeof getCheckboxRadioLabelJssStyle>>([
  [true, true, 'light'],
  [true, true, 'dark'],
  [false, true, 'light'],
  [false, true, 'dark'],
  [true, false, 'light'],
  [true, false, 'light'],
  [false, false, 'dark'],
  [false, false, 'dark'],
  [true, { base: true, xs: false, s: true, m: false, l: true, xl: false }, 'light'],
])('should return correct css for child: %s, state: %s, theme: %s and additionalDefaultJssStyle: %o', (...args) => {
  expect(getCheckboxRadioLabelJssStyle(...args)).toMatchSnapshot();
});
