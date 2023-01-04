import { getComponentCss } from './text-list-item-styles';

xdescribe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['unordered', 'numbered'],
    ['unordered', 'alphabetically'],
    ['ordered', 'numbered'],
    ['ordered', 'alphabetically'],
  ])('should return correct css for listType: %s and orderType: %s', (...args) => {
    expect(getComponentCss(...args)).toMatchSnapshot();
  });
});
