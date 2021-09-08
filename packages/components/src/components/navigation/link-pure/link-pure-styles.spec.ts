import { getComponentCss, getSlottedCss } from './link-pure-styles';
import type { BreakpointCustomizable } from '../../../utils';
import { AlignLabel, LinkButtonPureIconName, TextSize, Theme } from '../../../types';

describe('getSlottedCss()', () => {
  it('should return correct css', () => {
    const host = document.createElement('p-link-pure');
    expect(getSlottedCss(host)).toMatchSnapshot();
  });

  it('should return correct css with prefix', () => {
    const host = document.createElement('prefixed-p-link-pure');
    expect(getSlottedCss(host)).toMatchSnapshot();
  });
});

describe('getComponentCss()', () => {
  it.each<
    [
      LinkButtonPureIconName,
      boolean,
      BreakpointCustomizable<boolean>,
      BreakpointCustomizable<TextSize>,
      BreakpointCustomizable<boolean>,
      AlignLabel,
      boolean,
      boolean,
      Theme
    ]
  >([['arrow-head-right', false, false, 'small', false, 'right', false, false, 'light']])(
    'should return correct css',
    (icon, active, stretch, size, hideLabel, alignLabel, hasSubline, hasHref, theme) => {
      expect(
        getComponentCss(icon, active, stretch, size, hideLabel, alignLabel, hasSubline, hasHref, theme)
      ).toMatchSnapshot();
    }
  );
});
