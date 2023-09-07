import { getComponentCss } from './multi-select-option-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([['light'], ['dark']])(
    'should return correct css for theme: %s',
    (...args) => {
      expect(getComponentCss(...args)).toMatchSnapshot();
    }
  );
});
