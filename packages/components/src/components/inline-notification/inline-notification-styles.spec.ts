import { getComponentCss } from './inline-notification-styles';
import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['info', false, false, 'light'],
    ['neutral', false, false, 'light'],
    ['warning', false, false, 'light'],
    ['success', false, false, 'light'],
    ['error', false, false, 'light'],
    ['info', true, false, 'light'],
    ['info', false, true, 'light'],
    ['info', true, true, 'light'],
    ['neutral', true, false, 'light'],
    ['neutral', false, true, 'light'],
    ['neutral', true, true, 'light'],
    ['neutral', false, false, 'dark'],
    ['warning', false, false, 'dark'],
    ['success', false, false, 'dark'],
    ['error', false, false, 'dark'],
    ['info', false, false, 'dark'],
    ['info', true, false, 'dark'],
    ['info', false, true, 'dark'],
    ['info', true, true, 'dark'],
    ['neutral', true, false, 'dark'],
    ['neutral', false, true, 'dark'],
    ['neutral', true, true, 'dark'],
  ])('should return correct css for state: %s, hasAction: %s, hasClose: %s and theme: %s', (...args) => {
    validateCssAndMatchSnapshot(getComponentCss(...args));
  });
});
