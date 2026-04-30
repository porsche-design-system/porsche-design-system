import { describe, it } from 'vitest';
import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';
import { getComponentCss } from './banner-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [true, 'top', 'info', false, false],
    [false, 'bottom', 'success', false, false],
    [false, 'bottom', 'warning', true, false],
    [false, 'bottom', 'error', true, true],
  ])('should return correct css for open: %s, position: %s, state: %s, hasDismissButton: %s, hasHeadingOrHeadingSlot: %s', (...args) => {
    validateCssAndMatchSnapshot(getComponentCss(...args));
  });
});
