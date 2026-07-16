import { validateCssAndMatchSnapshot } from '../../../../tests/unit/helpers';
import { getCss } from '../../../utils';
import { getFunctionalComponentNoResultsOptionStyles } from './no-results-option-styles';

describe('getFunctionalComponentNoResultsOptionStyles()', () => {
  it.each<Parameters<typeof getFunctionalComponentNoResultsOptionStyles>>([
    ['select-option', `--_p-select-a`],
    ['select-option', `--_p-select-a`],
    ['multi-select-option', `--_p-multi-select-a`],
    ['multi-select-option', `--_p-multi-select-a`],
  ])('should return correct css for componentName: %s and cssVarScaling: %s', (...args) => {
    validateCssAndMatchSnapshot(getCss(getFunctionalComponentNoResultsOptionStyles(...args)));
  });
});
