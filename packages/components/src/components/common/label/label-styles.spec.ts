import { validateCssAndMatchSnapshot } from '../../../../tests/unit/helpers';
import { getCss } from '../../../utils';
import { getFunctionalComponentLabelStyles } from './label-styles';

describe('getLabelStyles()', () => {
  it.each<Parameters<typeof getFunctionalComponentLabelStyles>>([
    [false, false, undefined, undefined],
    [true, false, undefined, undefined],
    [false, true, undefined, undefined],
    [false, false, { position: 'absolute' }, { padding: 0 }],
    [false, false, undefined, undefined],
    [true, false, undefined, undefined],
    [false, true, undefined, undefined],
    [false, false, { position: 'absolute' }, { padding: 0 }],
    [false, { base: true, xs: false, s: true, m: false, l: true, xl: false }, undefined, undefined],
  ])(
    'should return correct css for isDisabledOrLoading: %s, hideLabel: %o, theme: %s, additionalDefaultJssStyle: %o and additionalIsShownJssStyle: %o',
    (...args) => {
      validateCssAndMatchSnapshot(getCss(getFunctionalComponentLabelStyles(...args)));
    }
  );
});
