import { getThemedIconFilters } from './icon-filters';

describe('getThemedIconFilters()', () => {
  it.each<Parameters<typeof getThemedIconFilters>>([['light'], ['dark']])(
    'should return correct colors for theme: %s',
    (theme) => {
      expect(getThemedIconFilters(theme)).toMatchSnapshot();
    }
  );
});
