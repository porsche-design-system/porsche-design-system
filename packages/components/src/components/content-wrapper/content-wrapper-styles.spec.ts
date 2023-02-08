import { getComponentCss } from './content-wrapper-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([['full'], ['fluid'], ['extended'], ['basic'], ['narrow']])(
    'should return correct css for width: %s',
    (...args) => {
      expect(getComponentCss(...args)).toMatchSnapshot();
    }
  );
});
