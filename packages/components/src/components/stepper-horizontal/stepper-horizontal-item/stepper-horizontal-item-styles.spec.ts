import { getComponentCss } from './stepper-horizontal-item-styles';
import { validateCssAndMatchSnapshot } from '../../../../tests/unit/helpers';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [undefined, true, 'light'],
    [undefined, false, 'light'],
    [undefined, true, 'dark'],
    [undefined, false, 'dark'],
    ['current', true, 'light'],
    ['current', false, 'light'],
    ['current', true, 'dark'],
    ['current', false, 'dark'],
    ['complete', true, 'light'],
    ['complete', false, 'light'],
    ['complete', true, 'dark'],
    ['complete', false, 'dark'],
    ['warning', true, 'light'],
    ['warning', false, 'light'],
    ['warning', true, 'dark'],
    ['warning', false, 'dark'],
  ])('should return correct css for state: %s, isDisabled: %s and theme: %s', (...args) => {
    validateCssAndMatchSnapshot(getComponentCss(...args));
  });
});
