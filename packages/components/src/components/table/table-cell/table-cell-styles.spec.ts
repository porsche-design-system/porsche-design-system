import { getComponentCss } from './table-cell-styles';
import { validateCssAndMatchSnapshot } from '../../../../tests/unit/helpers';
import { describe, it } from 'vitest';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([[true], [false]])(
    'should return correct css for multiline: %s',
    (...args) => {
      validateCssAndMatchSnapshot(getComponentCss(...args));
    }
  );
});
