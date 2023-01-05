import { getFunctionalComponentRequiredStyles } from './required-styles';

xdescribe('getFunctionalComponentRequiredStyles()', () => {
  it.each<Parameters<typeof getFunctionalComponentRequiredStyles>>([['light'], ['dark']])(
    'should return correct styles for theme: %s',
    (theme) => {
      expect(getFunctionalComponentRequiredStyles(theme)).toMatchSnapshot();
    }
  );
});
