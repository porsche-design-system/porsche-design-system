import { getComponentCss } from './crest-styles';
import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';
import { describe, it } from 'vitest';

describe('getComponentCss()', () => {
  it('should return correct css', () => {
    validateCssAndMatchSnapshot(getComponentCss());
  });
});
