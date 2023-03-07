import { getComponentCss } from './table-cell-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([[true], [false]])(
    'should return correct css for multiline: %s',
    (...args) => {
      expect(getComponentCss(...args)).toMatchSnapshot();
    }
  );
});
