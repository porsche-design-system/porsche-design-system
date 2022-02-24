import { getThemedColors } from './colors';

describe('getThemedColors()', () => {
  it.each<Parameters<typeof getThemedColors>>([['light'], ['dark'], ['light-electric'], ['dark-electric']])(
    'should return correct colors for theme: %s',
    (theme) => {
      expect(getThemedColors(theme)).toMatchSnapshot();
    }
  );
});
