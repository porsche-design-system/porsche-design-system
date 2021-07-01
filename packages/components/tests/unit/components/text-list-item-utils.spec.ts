import { baseCss, getDynamicCss } from '../../../src/components/content/text-list/text-list-item/text-list-item-utils';
import { ListType, OrderType } from '../../../src/components/content/text-list/text-list/text-list-utils';

it('should match snapshot for baseCss', () => {
  expect(baseCss).toMatchSnapshot();
});

describe('getDynamicCss()', () => {
  it.each([
    ['unordered', 'numbered', false],
    ['unordered', 'numbered', true],
    ['unordered', 'alphabetically', false],
    ['unordered', 'alphabetically', true],
    ['ordered', 'numbered', false],
    ['ordered', 'numbered', true],
    ['ordered', 'alphabetically', false],
    ['ordered', 'alphabetically', true],
  ])(
    'should match snapshot for getDynamicCss %s',
    (listType: ListType, orderType: OrderType, isNestedList: boolean) => {
      expect(getDynamicCss(listType, orderType, isNestedList)).toMatchSnapshot();
    }
  );
});
