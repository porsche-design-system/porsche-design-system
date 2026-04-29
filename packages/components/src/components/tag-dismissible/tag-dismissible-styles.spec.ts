import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';
import { getComponentCss } from './tag-dismissible-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [true, true],
    [false, true],
    [true, false],
    [true, false],
    [false, false],
    [true, true],
  ])('should return correct css for hasLabel: %s and compact: %s', (...args) => {
    validateCssAndMatchSnapshot(getComponentCss(...args));
  });

  // Direct child selector fixes https://github.com/porsche-design-system/porsche-design-system/pull/1941 in safari < v15.5
  it('should have ">" combinator on .button:hover for .icon', () => {
    expect(getComponentCss(true, false)).toMatch('button:hover > .icon');
  });
});
