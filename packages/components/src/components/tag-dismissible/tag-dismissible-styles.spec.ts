import { getComponentCss } from './tag-dismissible-styles';
import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['background-base', true, 'light'],
    ['background-base', false, 'light'],
    ['background-surface', true, 'light'],
    ['background-base', true, 'dark'],
    ['background-base', false, 'dark'],
    ['background-surface', true, 'dark'],
  ])('should return correct css for color: %s, hasLabel: %s and theme: %s', (...args) => {
    validateCssAndMatchSnapshot(getComponentCss(...args));
  });

  // Direct child selector fixes https://github.com/porsche-design-system/porsche-design-system/pull/1941 in safari < v15.5
  it('should have ">" combinator on .button:hover for .icon', () => {
    expect(getComponentCss('background-base', true, 'light')).toMatch('button:hover > .icon');
  });
});
