import { validateCssAndMatchSnapshot } from '../../../../tests/unit/helpers';
import { getComponentCss } from './text-list-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['unordered'],
    ['numbered'],
    ['alphabetically'],
    ['unordered'],
    ['numbered'],
    ['alphabetically'],
  ])('should return correct css for type: %s and theme: %s', (...args) => {
    validateCssAndMatchSnapshot(getComponentCss(...args));
  });
});
