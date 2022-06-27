import { getComponentCss } from './tag-dismissible-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['background-default', true],
    ['background-default', false],
    ['background-surface', true],
  ])('should return correct css for color: %s and hasLabel: %s', (...args) => {
    expect(getComponentCss(...args)).toMatchSnapshot();
  });

  // Direct child selector fixes https://github.com/porscheui/porsche-design-system/pull/1941 in safari < v15.5
  it('should have ">" combinator for .icon on button:hover', () => {
    expect(getComponentCss('background-default', true)).toMatch(/button:hover > \.icon/);
  });
});
