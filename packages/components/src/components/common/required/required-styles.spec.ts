import { getFunctionalComponentRequiredStyles } from './required-styles';

describe('getFunctionalComponentRequiredStyles()', () => {
  it.each<Parameters<typeof getFunctionalComponentRequiredStyles>>([['light'], ['dark']])(
    'should return correct styles for theme: %s',
    (theme) => {
      expect(getFunctionalComponentRequiredStyles(theme)).toMatchSnapshot();
    }
  );
});
