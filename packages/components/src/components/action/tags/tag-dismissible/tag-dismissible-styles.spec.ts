import { getComponentCss } from './tag-dismissible-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['default', true],
    ['default', false],
    ['neutral-contrast-high', true],
    ['background-surface', true],
  ])('should return correct css for color: %s and label: %s', (...args) => {
    expect(getComponentCss(...args)).toMatchSnapshot();
  });
});
