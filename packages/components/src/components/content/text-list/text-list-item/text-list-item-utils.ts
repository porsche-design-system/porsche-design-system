import { attachCss, buildHostStyles, getCss, mergeDeep, pxToRemWithUnit } from '../../../../utils';
import type { GetStylesFunction, JssStyle } from '../../../../utils';
import type { ListType, OrderType } from '../text-list/text-list-utils';

import { text } from '@porsche-design-system/utilities';

const baseCss: string = getCss(
  buildHostStyles({
    position: 'relative !important',
    display: 'list-item !important',
    color: 'inherit !important',
    listStyleType: 'none !important',
    paddingLeft: `${pxToRemWithUnit(24)} !important`,
    '&:before': {
      position: 'absolute !important',
    },
  })
);
const getNestedListStyles = (isNestedList: boolean, listType: ListType): JssStyle => {
  return isNestedList && listType === 'unordered'
    ? {
        '&:before': {
          height: '1px !important',
          width: `${pxToRemWithUnit(8)} !important`,
          top: 'calc(1.5em / 2) !important',
        },
      }
    : {};
};
const getOrderedStyles: GetStylesFunction = (): JssStyle => ({
  paddingLeft: `${pxToRemWithUnit(40)} !important`,

  '&:before': {
    right: 'calc(100% - 24px) !important',
    top: '0 !important',
    width: 'auto !important',
    height: 'auto !important',
    counterIncrement: 'section !important',
    textAlign: 'right !important',
    backgroundColor: 'transparent !important',
    ...text.small,
  },
});

const getUnorderedStyles: GetStylesFunction = (): JssStyle => ({
  '&:before': {
    content: '"" !important',
    left: '0 !important',
    top: 'calc(1.5em / 2 - 0.125em) !important',
    width: `${pxToRemWithUnit(4)} !important`,
    height: `${pxToRemWithUnit(4)} !important`,
    backgroundColor: 'currentColor !important',
  },
});

const getNumberedStyles: GetStylesFunction = (isNestedList: boolean): JssStyle => ({
  '&:before': {
    content: `counters(section, ".", decimal) ${isNestedList ? '' : '"."'} !important`,
  },
});
const getAlphabeticallyStyles: GetStylesFunction = (isNestedList: boolean): JssStyle => ({
  '&:before': {
    content: `counters(section, ".", lower-latin) ${isNestedList ? '' : '"."'} !important`,
  },
});

const getTypeStyles = (listType: ListType, orderType: OrderType, isNestedList: boolean): JssStyle => {
  const isOrderedList = listType === 'ordered';

  return mergeDeep(
    isOrderedList
      ? mergeDeep(
          getOrderedStyles(),
          orderType === 'numbered' ? getNumberedStyles(isNestedList) : getAlphabeticallyStyles(isNestedList)
        )
      : getUnorderedStyles()
  );
};

export const getDynamicCss = (listType: ListType, orderType: OrderType, isNestedList: boolean): string => {
  return getCss(
    buildHostStyles(
      mergeDeep(getTypeStyles(listType, orderType, isNestedList), getNestedListStyles(isNestedList, listType))
    )
  );
};

export const addCss = (host: HTMLElement, listType: ListType, orderType: OrderType, isNestedList: boolean): void => {
  attachCss(host, baseCss + getDynamicCss(listType, orderType, isNestedList));
};
