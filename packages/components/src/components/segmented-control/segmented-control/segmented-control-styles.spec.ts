import { getComponentCss } from './segmented-control-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([[20], [80], [230]])(
    'should return correct css for maxWidth: %s',
    (...args) => {
      expect(getComponentCss(...args)).toMatchSnapshot();
    }
  );
});
