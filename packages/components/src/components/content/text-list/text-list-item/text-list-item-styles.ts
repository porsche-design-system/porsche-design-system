import type { JssStyle } from 'jss';
import type { GetStyleFunction } from '../../../../utils';
import type { ListType, OrderType } from '../text-list/text-list-utils';
import { getCss, mergeDeep } from '../../../../utils';
import { addImportantToEachRule, pxToRemWithUnit } from '../../../../styles';
import { textSmall } from '@porsche-design-system/utilities-v2';

const getNestedListStyle = (isNestedList: boolean, listType: ListType): JssStyle =>
  isNestedList &&
  listType === 'unordered' && {
    '&:before': {
      height: '1px',
      width: pxToRemWithUnit(8),
      top: 'calc(1.5em / 2)',
    },
  };

const getOrderedStyle: GetStyleFunction = (): JssStyle => ({
  paddingLeft: pxToRemWithUnit(40),
  '&:before': {
    right: 'calc(100% - 24px)',
    top: 0,
    width: 'auto',
    height: 'auto',
    counterIncrement: 'section',
    textAlign: 'right',
    backgroundColor: 'transparent',
    ...textSmall,
  },
});

const getUnorderedStyle: GetStyleFunction = (): JssStyle => ({
  '&:before': {
    content: '""',
    left: 0,
    top: 'calc(1.5em / 2 - 0.125em)',
    width: pxToRemWithUnit(4),
    height: pxToRemWithUnit(4),
    backgroundColor: 'currentColor',
  },
});

const getNumberedStyle: GetStyleFunction = (isNestedList: boolean): JssStyle => ({
  '&:before': {
    content: `counters(section, ".", decimal) ${isNestedList ? '' : '"."'}`,
  },
});

const getAlphabeticallyStyle: GetStyleFunction = (isNestedList: boolean): JssStyle => ({
  '&:before': {
    content: `counters(section, ".", lower-latin) ${isNestedList ? '' : '"."'}`,
  },
});

const getTypeStyle = (listType: ListType, orderType: OrderType, isNestedList: boolean): JssStyle => {
  const isOrderedList = listType === 'ordered';

  return mergeDeep(
    isOrderedList
      ? mergeDeep(
          getOrderedStyle(),
          orderType === 'numbered' ? getNumberedStyle(isNestedList) : getAlphabeticallyStyle(isNestedList)
        )
      : getUnorderedStyle()
  );
};

export const getComponentCss = (listType: ListType, orderType: OrderType, isNestedList: boolean): string => {
  const baseComponentStyle: JssStyle = {
    position: 'relative',
    display: 'list-item',
    color: 'inherit',
    listStyleType: 'none',
    paddingLeft: pxToRemWithUnit(24),
    '&:before': {
      position: 'absolute',
    },
  };

  return getCss({
    ':host': addImportantToEachRule(
      mergeDeep(
        baseComponentStyle,
        getTypeStyle(listType, orderType, isNestedList),
        getNestedListStyle(isNestedList, listType)
      )
    ),
  });
};
