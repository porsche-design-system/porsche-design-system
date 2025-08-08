import { validateCssAndMatchSnapshot } from '../../../../tests/unit/helpers';
import { getCss } from '../../../utils';
import { getFunctionalComponentNoResultsOptionStyles } from './no-results-option-styles';

describe('getFunctionalComponentNoResultsOptionStyles()', () => {
  it.each<Parameters<typeof getFunctionalComponentNoResultsOptionStyles>>([
    ['select-option', `var(--p-internal-select-scaling, 1)`, 'light'],
    ['select-option', `var(--p-internal-select-scaling, 1)`, 'dark'],
    ['multi-select-option', `var(--p-internal-multi-select-scaling, 1)`, 'light'],
    ['multi-select-option', `var(--p-internal-multi-select-scaling, 1)`, 'dark'],
    ['select-wrapper', 1, 'light'],
    ['select-wrapper', 1, 'dark'],
  ])('should return correct css for componentName: %s, cssVarScaling: %s and theme: %s', (...args) => {
    validateCssAndMatchSnapshot(getCss(getFunctionalComponentNoResultsOptionStyles(...args)));
  });
});
