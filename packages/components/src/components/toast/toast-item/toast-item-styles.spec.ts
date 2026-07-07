import { describe, it } from 'vitest';
import { validateCssAndMatchSnapshot } from '../../../../tests/unit/helpers';
import { getComponentCss } from './toast-item-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['info'],
    ['success'],
    ['warning'],
    ['error'],
  ])('should return correct css for state: %s', async (...args) => {
    await validateCssAndMatchSnapshot(getComponentCss(...args));
  });
});
