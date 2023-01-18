import { getComponentCss } from './tag-dismissible-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['background-default', 'light', true],
    ['background-default', 'light', false],
    ['background-surface', 'light', true],
    ['background-default', 'dark', true],
    ['background-default', 'dark', false],
    ['background-surface', 'dark', true],
  ])('should return correct css for color: %s and hasLabel: %s', (...args) => {
    expect(getComponentCss(...args)).toMatchSnapshot();
  });

  // Direct child selector fixes https://github.com/porsche-design-system/porsche-design-system/pull/1941 in safari < v15.5
  it('should have ">" combinator on .button:hover for .icon', () => {
    expect(getComponentCss('background-default', 'light', true)).toMatch('button:hover > .icon');
  });
});
