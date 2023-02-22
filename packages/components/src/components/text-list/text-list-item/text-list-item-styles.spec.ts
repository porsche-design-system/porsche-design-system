import { getComponentCss } from './text-list-item-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([[]])('should return correct css', (...args) => {
    expect(getComponentCss(...args)).toMatchSnapshot();
  });
});
