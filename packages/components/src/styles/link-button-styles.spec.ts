import { getCss } from '../utils';
import { getLinkButtonStyles } from './link-button-styles';

it('should have ">" combinator on .root:hover/.root:active for .icon/.label', () => {
  const css = getCss(getLinkButtonStyles('tertiary', false, false, false, 'light'));

  // Direct child selector fixes https://github.com/porscheui/porsche-design-system/pull/1941 in safari < v15.5 for variant tertiary
  expect(css).toMatch('.root:hover > span');
  expect(css).toMatch('.root:hover > .icon');
  expect(css).toMatch('.root:active > span');
  expect(css).toMatch('.root:active > .icon');
});
