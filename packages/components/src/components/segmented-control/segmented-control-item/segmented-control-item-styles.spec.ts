import { validateCssAndMatchSnapshot } from '../../../../tests/unit/helpers';
import { getComponentCss } from './segmented-control-item-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [false, false, true, 'none', true, false, 'light'],
    [false, false, true, 'success', true, false, 'light'],
    [false, false, true, 'error', true, false, 'light'],
    [false, false, true, 'none', true, true, 'light'],
    [true, false, true, 'none', true, false, 'light'],
    [true, true, true, 'none', true, false, 'light'],
    [false, true, true, 'none', true, false, 'light'],
    [false, false, false, 'none', true, false, 'light'],
    [false, false, false, 'none', true, false, 'dark'],
    [false, false, false, 'none', true, true, 'dark'],
    [false, false, true, 'none', false, false, 'light'],
    [true, false, true, 'none', false, false, 'light'],
    [true, true, true, 'none', false, false, 'light'],
    [false, true, true, 'none', false, false, 'light'],
    [false, false, false, 'none', false, false, 'light'],
    [false, false, false, 'none', false, false, 'dark'],
  ])(
    'should return correct css for isDisabled: %s, isSelected: %s, hasIcon: %s, state: %s, hasSlottedContent: %s, compact: %s and theme: %s',
    (...args) => {
      validateCssAndMatchSnapshot(getComponentCss(...args));
    }
  );
});
