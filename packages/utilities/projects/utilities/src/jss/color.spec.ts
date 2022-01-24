import { color, colorExternal, themeDark, themeDarkElectric, themeLight, themeLightElectric } from './color';

it('should contain correct values for themeLight', () => {
  expect(themeLight).toMatchSnapshot();
});

it('should contain correct values for themeDark', () => {
  expect(themeDark).toMatchSnapshot();
});

it('should contain correct values for themeLightElectric', () => {
  expect(themeLightElectric).toMatchSnapshot();
});

it('should contain correct values for themeDarkElectric', () => {
  expect(themeDarkElectric).toMatchSnapshot();
});

it('should contain correct values for colorExternal', () => {
  expect(colorExternal).toMatchSnapshot();
});

it('should contain correct values for color', () => {
  expect(color).toMatchSnapshot();
});
