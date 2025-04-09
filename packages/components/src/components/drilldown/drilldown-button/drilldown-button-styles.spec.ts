// import { validateCssAndMatchSnapshot } from '../../../../tests/unit/helpers';
import { getComponentCss } from './drilldown-button-styles';
import { expect } from '@jest/globals';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [true, 'light'],
    [false, 'light'],
    [false, 'dark'],
    [false, 'auto'],
  ])('should return correct css for isActive: %s and theme: %s', (...args) => {
    // validateCssAndMatchSnapshot(getComponentCss(...args));
    expect(getComponentCss(...args)).toMatchSnapshot();
  });
});
