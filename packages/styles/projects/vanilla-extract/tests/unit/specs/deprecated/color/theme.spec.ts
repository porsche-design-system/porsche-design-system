import * as fromDeprecated from '../../../../../src/color/generated/deprecated';
// theme, themeDark and themeLight are hand-written (handWritten: true in color.meta.ts)
// and live outside generated/, but still belong to the deprecated color exports.
import { theme } from '../../../../../src/color/theme';
import { themeDark } from '../../../../../src/color/themeDark';
import { themeLight } from '../../../../../src/color/themeLight';

const fromTheme = { ...fromDeprecated, theme, themeDark, themeLight };

it('should provide all exports', () => {
  expect(Object.keys(fromTheme).length).toBe(43);
});

it.each<keyof typeof fromTheme>(
  Object.keys(fromTheme) as (keyof typeof fromTheme)[]
)('should contain correct values for %s', (item) => {
  expect(fromTheme[item]).toMatchSnapshot();
});
