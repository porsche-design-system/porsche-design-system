import { getComponentCss } from './text-list-item-styles';
import { validateCssAndMatchSnapshot } from '../../../../tests/unit/helpers';
import { describe, it } from 'vitest';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([[]])('should return correct css', (...args) => {
    validateCssAndMatchSnapshot(getComponentCss(...args));
  });
});
