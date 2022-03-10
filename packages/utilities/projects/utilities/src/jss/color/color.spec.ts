import * as fromColor from './color';

it.each<keyof typeof fromColor>([
  'color',
  'themeLight',
  'themeDark',
  'themeLightElectric',
  'themeDarkElectric',
  'colorExternal',
])('should contain correct values for %s', (item) => {
  expect(fromColor[item]).toMatchSnapshot();
});
