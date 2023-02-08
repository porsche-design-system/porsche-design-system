import { getContentWrapperStyle } from './content-wrapper-styles-shared';

describe('getContentWrapperStyle()', () => {
  it.each<Parameters<typeof getContentWrapperStyle>>([['full'], ['fluid'], ['basic'], ['extended'], ['narrow']])(
    'should return correct css for width: %s',
    (...args) => {
      expect(getContentWrapperStyle(...args)).toMatchSnapshot();
    }
  );
});
