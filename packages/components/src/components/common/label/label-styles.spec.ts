import { validateCssAndMatchSnapshot } from '../../../../tests/unit/helpers';
import { getCss } from '../../../utils';
import { getFunctionalComponentLabelStyles } from './label-styles';

describe('getLabelStyles()', () => {
  it.each<Parameters<typeof getFunctionalComponentLabelStyles>>([
    [false, false, false, undefined, undefined],
    [true, false, false, undefined, undefined],
    [false, true, false, undefined, undefined],
    [false, false, true, undefined, undefined],
    [false, false, false, { position: 'absolute' }, { padding: 0 }],
    [false, false, false, undefined, undefined],
    [true, false, false, undefined, undefined],
    [false, true, false, undefined, undefined],
    [false, false, true, undefined, undefined],
    [false, false, false, { position: 'absolute' }, { padding: 0 }],
    [false, false, { base: true, xs: false, s: true, m: false, l: true, xl: false }, undefined, undefined],
  ])(
    'should return correct css for isDisabled: %s, isLoading: %s, hideLabel: %o, additionalDefaultJssStyle: %o and additionalIsShownJssStyle: %o',
    (...args) => {
      validateCssAndMatchSnapshot(getCss(getFunctionalComponentLabelStyles(...args)));
    }
  );
});
