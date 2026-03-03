import { describe, it } from 'vitest';
import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';
import { getComponentCss } from './accordion-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['start', 'frosted', false, false, false, false, false, 'small'],
    ['start', 'frosted', true, false, false, false, false, 'medium'],
    ['start', 'frosted', true, true, false, false, false, 'small'],
    ['start', 'frosted', true, true, true, false, false, 'small'],
    ['end', 'frosted', true, true, true, false, false, 'small'],
    ['start', 'frosted', true, true, true, true, false, 'small'],
    ['start', 'frosted', true, true, true, true, true, 'small'],
    ['start', 'frosted', false, false, false, false, false, 'small'],
    ['start', 'canvas', false, false, false, false, false, 'small'],
    ['start', 'canvas', false, false, true, false, false, 'small'],
    ['start', 'canvas', false, true, true, false, false, 'small'],
    ['start', 'surface', false, true, true, false, false, 'small'],
    ['start', 'none', false, false, false, false, false, 'small'],
  ])(
    'should return correct css for alignMarker: %s, background: %s, isCompact: %s, isOpen: %s, isSticky: %s, hasSummaryBefore: %s, hasSummaryAfter: %s, size: %s',
    (...args) => {
      validateCssAndMatchSnapshot(getComponentCss(...args));
    }
  );
});
