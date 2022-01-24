import { getContentWrapperJssStyle } from './content-wrapper';

describe('getContentWrapperJssStyle()', () => {
  it.each<Parameters<typeof getContentWrapperJssStyle>>([['basic'], ['fluid'], ['extended']])(
    'should return correct css for width: %s',
    (...args) => {
      expect(getContentWrapperJssStyle(...args)).toMatchSnapshot();
    }
  );
});
