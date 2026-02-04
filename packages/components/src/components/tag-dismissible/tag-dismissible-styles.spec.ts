import { getComponentCss } from './tag-dismissible-styles';
import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['background-base', true, true, 'light'],
    ['background-base', false, true, 'light'],
    ['background-surface', true, false, 'light'],
    ['background-base', true, false, 'dark'],
    ['background-base', false, false, 'dark'],
    ['background-surface', true, true, 'dark'],
  ])('should return correct css for color: %s, hasLabel: %s, compact: %s and theme: %s', (...args) => {
    validateCssAndMatchSnapshot(getComponentCss(...args));
  });

  // Direct child selector fixes https://github.com/porsche-design-system/porsche-design-system/pull/1941 in safari < v15.5
  it('should have ">" combinator on .button:hover for .icon', () => {
    expect(getComponentCss('background-base', true, false, 'light')).toMatch('button:hover > .icon');
  });
});
