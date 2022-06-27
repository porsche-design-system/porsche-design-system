import { getCss } from '../utils';
import { getLinkButtonStyles } from './link-button-styles';

it.each([/\.root:hover > \.label/, /\.root:hover > \.icon/, /\.root:active > \.label/, /\.root:active > \.icon/])(
  'should have ">" combinator for %s',
  (regex) => {
    const css = getCss(getLinkButtonStyles('tertiary', false, false, false, 'light'));

    // Direct child selector fixes https://github.com/porscheui/porsche-design-system/pull/1941 in safari < v15.5 for variant tertiary
    expect(css).toMatch(regex);
  }
);
