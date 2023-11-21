import { getFunctionalComponentLabelStyles } from './label-styles';
import { getCss } from '../../../utils';

describe('getLabelStyles()', () => {
  it.each<Parameters<typeof getFunctionalComponentLabelStyles>>([
    [false, false, 'light', undefined, undefined],
    [true, false, 'light', undefined, undefined],
    [false, true, 'light', undefined, undefined],
    [false, false, 'light', { position: 'absolute' }, { padding: 0 }],
    [false, false, 'dark', undefined, undefined],
    [true, false, 'dark', undefined, undefined],
    [false, true, 'dark', undefined, undefined],
    [false, false, 'dark', { position: 'absolute' }, { padding: 0 }],
    [false, { base: true, xs: false, s: true, m: false, l: true, xl: false }, 'auto', undefined, undefined],
  ])(
    'should return correct css for isDisabledOrLoading: %s, hideLabel: %o, theme: %s, additionalDefaultJssStyle: %o and additionalIsShownJssStyle: %o',
    (...args) => {
      expect(getCss(getFunctionalComponentLabelStyles(...args))).toMatchSnapshot();
    }
  );
});
