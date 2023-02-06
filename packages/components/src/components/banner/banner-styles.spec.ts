import { getComponentCss } from './banner-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([['basic'], ['extended'], ['fluid']])(
    'should return correct css for width: %s',
    (...args) => {
      expect(getComponentCss(...args)).toMatchSnapshot();
    }
  );
});
