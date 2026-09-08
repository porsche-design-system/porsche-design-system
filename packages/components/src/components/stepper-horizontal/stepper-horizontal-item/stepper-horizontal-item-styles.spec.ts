import { validateCssAndMatchSnapshot } from '../../../../tests/unit/helpers';
import { getComponentCss } from './stepper-horizontal-item-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [undefined, true],
    [undefined, false],
    ['current', true],
    ['current', false],
    ['complete', true],
    ['complete', false],
    ['warning', true],
    ['warning', false],
  ])('should return correct css for state: %s, isDisabled: %s', (...args) => {
    validateCssAndMatchSnapshot(getComponentCss(...args));
  });
});
