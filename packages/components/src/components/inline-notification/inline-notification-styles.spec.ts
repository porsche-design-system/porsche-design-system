import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';
import { getComponentCss } from './inline-notification-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['info', false, false],
    ['warning', false, false],
    ['success', false, false],
    ['error', false, false],
    ['info', true, false],
    ['info', false, true],
    ['info', true, true],
  ])('should return correct css for state: %s, hasAction: %s and hasClose: %s', (...args) => {
    validateCssAndMatchSnapshot(getComponentCss(...args));
  });
});
