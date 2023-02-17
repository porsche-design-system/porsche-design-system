import { getSpacingForWidth } from './content-wrapper-spacings-shared';

describe('getSpacingForWidth()', () => {
  it.each<Parameters<typeof getSpacingForWidth>>([['narrow'], ['basic'], ['extended']])(
    'should return correct spacing for width: %s',
    (...args) => {
      expect(getSpacingForWidth(...args)).toMatchSnapshot();
    }
  );
});
