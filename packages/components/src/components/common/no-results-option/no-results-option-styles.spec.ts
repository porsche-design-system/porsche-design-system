import { validateCssAndMatchSnapshot } from '../../../../tests/unit/helpers';
import { getCss } from '../../../utils';
import { getFunctionalComponentNoResultsOptionStyles } from './no-results-option-styles';

describe('getFunctionalComponentNoResultsOptionStyles()', () => {
  it.each<Parameters<typeof getFunctionalComponentNoResultsOptionStyles>>([
    ['select-option', `var(--_p-select-a, 1)`],
    ['select-option', `var(--_p-select-a, 1)`],
    ['multi-select-option', `var(--_p-multi-select-a, 1)`],
    ['multi-select-option', `var(--_p-multi-select-a, 1)`],
  ])('should return correct css for componentName: %s and cssVarScaling: %s', (...args) => {
    validateCssAndMatchSnapshot(getCss(getFunctionalComponentNoResultsOptionStyles(...args)));
  });
});
