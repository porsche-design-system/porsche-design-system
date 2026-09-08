import { describe, it } from 'vitest';
import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';
import { getComponentCss } from './inline-notification-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['info', false, false, false],
    ['warning', false, false, false],
    ['success', false, false, false],
    ['error', false, false, false],
    ['info', true, false, false],
    ['info', false, true, false],
    ['info', true, true, false],
    ['info', true, true, true],
  ])('should return correct css for state: %s, hasAction: %s, hasDismissButton: %s, hasHeadingOrHeadingSlot: %s', (...args) => {
    validateCssAndMatchSnapshot(getComponentCss(...args));
  });
});
