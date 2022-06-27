import { getCss } from '../utils';
import { getLinkButtonStyles } from './link-button-styles';

it('should have ">" combinator for .label & .icon on root:hover & root:active', () => {
  // Direct child selector fixes https://github.com/porscheui/porsche-design-system/pull/1941 in safari < v15.5 for variant tertiary
  expect(getCss(getLinkButtonStyles('tertiary', false, false, false, 'light'))).toMatch(
    /\.root:(?:hover|active) > \.(?:label|icon)/
  );
});
