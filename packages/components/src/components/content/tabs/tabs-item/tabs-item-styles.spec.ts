import { getComponentCss } from './tabs-item-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([['light'], ['dark'], ['light-electric']])(
    'should return correct css for theme: %s',
    (...args) => {
      expect(getComponentCss(...args)).toMatchSnapshot();
    }
  );
});
