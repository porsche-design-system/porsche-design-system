import { getComponentCss } from './segmented-control-item-styles';
import { validateCssAndMatchSnapshot } from '../../../../tests/unit/helpers';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [false, false, true, true, false, 'light'],
    [false, false, true, true, true, 'light'],
    [true, false, true, true, false, 'light'],
    [true, true, true, true, false, 'light'],
    [false, true, true, true, false, 'light'],
    [false, false, false, true, false, 'light'],
    [false, false, false, true, false, 'dark'],
    [false, false, false, true, true, 'dark'],
    [false, false, true, false, false, 'light'],
    [true, false, true, false, false, 'light'],
    [true, true, true, false, false, 'light'],
    [false, true, true, false, false, 'light'],
    [false, false, false, false, false, 'light'],
    [false, false, false, false, false, 'dark'],
  ])(
    'should return correct css for isDisabled: %s, isSelected: %s, hasIcon: %s, hasSlottedContent: %s, compact: %s and theme: %s',
    (...args) => {
      validateCssAndMatchSnapshot(getComponentCss(...args));
    }
  );
});
