import { describe, it } from 'vitest';
import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';
import { getComponentCss } from './accordion-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['start', 'frosted', false, false, false, false, false],
    ['start', 'frosted', true, false, false, false, false],
    ['start', 'frosted', true, true, false, false, false],
    ['start', 'frosted', true, true, true, false, false],
    ['end', 'frosted', true, true, true, false, false],
    ['start', 'frosted', true, true, true, true, false],
    ['start', 'frosted', true, true, true, true, true],
    ['start', 'frosted', false, false, false, false, false],
    ['start', 'canvas', false, false, false, false, false],
    ['start', 'canvas', false, false, true, false, false],
    ['start', 'canvas', false, true, true, false, false],
    ['start', 'surface', false, true, true, false, false],
    ['start', 'none', false, false, false, false, false],
  ])(
    'should return correct css for alignMarker: %s, background: %s, isCompact: %s, isOpen: %s, isSticky: %s, hasSummaryBefore: %s, hasSummaryAfter: %s',
    (...args) => {
      validateCssAndMatchSnapshot(getComponentCss(...args));
    }
  );
});
