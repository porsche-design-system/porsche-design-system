import { getComponentCss } from './tabs-item-styles';

describe('getComponentCss()', () => {
  it('should return correct css ', () => {
    expect(getComponentCss()).toMatchSnapshot();
  });
});
