import { getComponentCss } from './table-cell-styles';

xdescribe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [true, 'dark'],
    [false, 'light'],
  ])('should return correct css for multiline: %s and theme: %s', (...args) => {
    expect(getComponentCss(...args)).toMatchSnapshot();
  });
});
