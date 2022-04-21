import { getComponentCss } from './tag-dismissible-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['background-default', true],
    ['background-default', false],
    ['background-surface', true],
  ])('should return correct css for color: %s and hasLabel: %s', (...args) => {
    expect(getComponentCss(...args)).toMatchSnapshot();
  });
});
