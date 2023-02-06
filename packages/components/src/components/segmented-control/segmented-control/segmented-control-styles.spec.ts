import { getComponentCss } from './segmented-control-styles';

xdescribe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([[20], [80], [230]])(
    'should return correct css for maxWidth: %s',
    (...args) => {
      expect(getComponentCss(...args)).toMatchSnapshot();
    }
  );
});
