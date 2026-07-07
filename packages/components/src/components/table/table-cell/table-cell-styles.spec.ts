import { getComponentCss } from './table-cell-styles';
import { validateCssAndMatchSnapshot } from '../../../../tests/unit/helpers';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([[true], [false]])(
    'should return correct css for multiline: %s',
    async (...args) => {
      await validateCssAndMatchSnapshot(getComponentCss(...args));
    }
  );
});
