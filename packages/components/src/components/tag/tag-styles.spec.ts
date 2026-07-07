import { describe, it } from 'vitest';
import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';
import { getComponentCss } from './tag-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['primary', false, true, true],
    ['secondary', false, false, true],
    ['info', true, false, true],
    ['info-frosted', true, false, true],
    ['warning', true, false, false],
    ['warning-frosted', true, false, false],
    ['success', false, true, true],
    ['success-frosted', false, true, true],
    ['error', false, true, true],
    ['error-frosted', false, true, true],
  ])('should return correct css for variant: %s, compact: %s, isFocusable: %s and hasIcon: %s', async (...args) => {
    await validateCssAndMatchSnapshot(getComponentCss(...args));
  });
});
