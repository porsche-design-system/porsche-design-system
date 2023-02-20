import { isListTypeOrdered, isOrderTypeNumbered } from './text-list-utils';

describe('isListTypeOrdered()', () => {
  it.each<Parameters<typeof isListTypeOrdered>>([['ordered'], ['unordered']])(
    'should return correct boolean for list type: %s',
    (...args) => {
      expect(isListTypeOrdered(...args)).toMatchSnapshot();
    }
  );
});

describe('isOrderTypeNumbered()', () => {
  it.each<Parameters<typeof isOrderTypeNumbered>>([['numbered'], ['alphabetically']])(
    'should return correct boolean for order type: %s',
    (...args) => {
      expect(isOrderTypeNumbered(...args)).toMatchSnapshot();
    }
  );
});
