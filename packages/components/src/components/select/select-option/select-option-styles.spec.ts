import { getComponentCss } from './select-option-styles';
import { validateCssAndMatchSnapshot } from '../../../../tests/unit/helpers';
import { describe, it } from 'vitest';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([[false], [true]])(
    'should return correct css for isDisabled: %s',
    (...args) => {
      validateCssAndMatchSnapshot(getComponentCss(...args));
    }
  );
});