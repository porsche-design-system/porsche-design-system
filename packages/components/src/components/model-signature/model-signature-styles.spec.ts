import { getComponentCss } from './model-signature-styles';

xdescribe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([['718', 'small', 'light']])(
    'should return correct css for size: %s and theme: %s',
    (...args) => {
      expect(getComponentCss(...args)).toMatchSnapshot();
    }
  );
});
