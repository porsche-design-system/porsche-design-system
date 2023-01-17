import { getCss } from '../utils';
import { getLinkButtonStyles } from './link-button-styles';

it('should have ">" combinator on .root:hover for .icon/.label', () => {
  const css = getCss(getLinkButtonStyles('none', '','tertiary', false, false, false, 'light'));

  // Direct child selector fixes https://github.com/porsche-design-system/porsche-design-system/pull/1941 in safari < v15.5 for variant tertiary
  expect(css).toMatch('.root:hover > .label');
  expect(css).toMatch('.root:hover > .icon');
});
