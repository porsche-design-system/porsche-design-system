import { validateCssAndMatchSnapshot } from '../../../../tests/unit/helpers';
import { getComponentCss } from './segmented-control-item-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [false, false, true, 'none', true, false],
    [false, false, true, 'success', true, false],
    [false, false, true, 'error', true, false],
    [false, false, true, 'none', true, true],
    [true, false, true, 'none', true, false],
    [true, true, true, 'none', true, false],
    [false, true, true, 'none', true, false],
    [false, false, false, 'none', true, false],
    [false, false, false, 'none', true, false],
    [false, false, false, 'none', true, true],
    [false, false, true, 'none', false, false],
    [true, false, true, 'none', false, false],
    [true, true, true, 'none', false, false],
    [false, true, true, 'none', false, false],
    [false, false, false, 'none', false, false],
    [false, false, false, 'none', false, false],
  ])(
    'should return correct css for isDisabled: %s, isSelected: %s, hasIcon: %s, state: %s, hasSlottedContent: %s and compact: %s',
    (...args) => {
      validateCssAndMatchSnapshot(getComponentCss(...args));
    }
  );
});
