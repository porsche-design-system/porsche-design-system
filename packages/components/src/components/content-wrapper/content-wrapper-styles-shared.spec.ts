import { getContentWrapperStyle } from './content-wrapper-styles-shared';

describe('getContentWrapperStyle()', () => {
  it.each<Parameters<typeof getContentWrapperStyle>>([['basic'], ['extended'], ['fluid']])(
    'should return correct css for width: %s',
    (...args) => {
      expect(getContentWrapperStyle(...args)).toMatchSnapshot();
    }
  );
});
