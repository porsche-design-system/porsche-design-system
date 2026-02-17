import { describe, it } from 'vitest';
import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';
import { getComponentCss } from './accordion-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['start', 'frosted', false, false, false],
    ['start', 'frosted', true, false, false],
    ['start', 'frosted', true, true, false],
    ['start', 'frosted', true, true, true],
    ['end', 'frosted', true, true, true],
    ['start', 'frosted', false, false, false],
    ['start', 'canvas', false, false, false],
    ['start', 'canvas', false, false, true],
    ['start', 'canvas', false, true, true],
    ['start', 'surface', false, true, true],
    ['start', 'none', false, false, false],
  ])(
    'should return correct css for alignIcon: %s, background: %s, isCompact: %s, isOpen: %s and isSticky: %s',
    (...args) => {
      validateCssAndMatchSnapshot(getComponentCss(...args));
    }
  );
});
