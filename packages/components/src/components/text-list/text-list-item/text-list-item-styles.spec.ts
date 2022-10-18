import { getComponentCss } from './text-list-item-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['unordered', 'numbered', false],
    ['unordered', 'numbered', true],
    ['unordered', 'alphabetically', false],
    ['unordered', 'alphabetically', true],
    ['ordered', 'numbered', false],
    ['ordered', 'numbered', true],
    ['ordered', 'alphabetically', false],
    ['ordered', 'alphabetically', true],
  ])('should return correct css for listType: %s, orderType: %s and isNestedList: %s', (...args) => {
    expect(getComponentCss(...args)).toMatchSnapshot();
  });
});
