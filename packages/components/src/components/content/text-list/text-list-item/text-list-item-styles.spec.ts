import { addComponentCss, getComponentCss } from './text-list-item-styles';
import type { ListType, OrderType } from '../text-list/text-list-utils';
import * as jssUtils from './../../../../utils/jss';

describe('addComponentCss()', () => {
  it('should call getCachedComponentCss() to retrieve cached css', () => {
    const host = document.createElement('p-text-list-item');
    jest.spyOn(jssUtils, 'attachCss').mockImplementation(() => {});
    const spy = jest.spyOn(jssUtils, 'getCachedComponentCss').mockImplementation(() => '');

    addComponentCss(host, 'unordered', 'numbered', false);

    expect(spy).toHaveBeenCalledWith(host, expect.anything(), 'unordered', 'numbered', false);
  });
});

describe('getComponentCss()', () => {
  it.each<[ListType, OrderType, boolean]>([
    ['unordered', 'numbered', false],
    ['unordered', 'numbered', true],
    ['unordered', 'alphabetically', false],
    ['unordered', 'alphabetically', true],
    ['ordered', 'numbered', false],
    ['ordered', 'numbered', true],
    ['ordered', 'alphabetically', false],
    ['ordered', 'alphabetically', true],
  ])(
    'should return correct css for listType %s, orderType %s, isNestedList %s',
    (listType: ListType, orderType: OrderType, isNestedList: boolean) => {
      expect(getComponentCss(listType, orderType, isNestedList)).toMatchSnapshot();
    }
  );
});
