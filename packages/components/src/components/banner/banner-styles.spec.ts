import { describe, it } from 'vitest';
import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';
import { getComponentCss } from './banner-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [true, 'top', 'info', false, false, false],
    [false, 'bottom', 'success', false, false, false],
    [false, 'bottom', 'warning', true, false, false],
    [false, 'bottom', 'error', true, true, false],
    [true, 'top', 'info', true, true, true],
  ])(
    'should return correct css for open: %s, position: %s, state: %s, hasDismissButton: %s, hasHeadingOrHeadingSlot: %s, skipEntryTransition: %s',
    (...args) => {
      validateCssAndMatchSnapshot(getComponentCss(...args));
    }
  );
});
