import type { JssStyle } from 'jss';
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

const getTypeStyle = (listType: ListType, orderType: OrderType, isNestedList: boolean): JssStyle => {
  return listType === 'ordered'
    ? {
        paddingLeft: pxToRemWithUnit(40),
        '&:before': {
          content: `counters(section, ".", ${orderType === 'numbered' ? 'decimal' : 'lower-latin'}) ${
            isNestedList ? '' : '"."'
          }`,
          right: 'calc(100% - 24px)',
          top: 0,
          width: 'auto',
          height: 'auto',
          counterIncrement: 'section',
          textAlign: 'right',
          backgroundColor: 'transparent',
          ...textSmall,
        },
      }
    : {
        '&:before': {
          content: '""',
          left: 0,
          top: 'calc(1.5em / 2 - 0.125em)',
          width: pxToRemWithUnit(4),
          height: pxToRemWithUnit(4),
          backgroundColor: 'currentColor',
        },
      };
};

export const getComponentCss = (listType: ListType, orderType: OrderType, isNestedList: boolean): string => {
  return getCss({
    '@global': {
      ':host': addImportantToEachRule(
        mergeDeep(
          {
            position: 'relative',
            display: 'list-item',
            color: 'inherit',
            listStyleType: 'none',
            paddingLeft: pxToRemWithUnit(24),
            '&:before': {
              position: 'absolute',
            },
          },
          getTypeStyle(listType, orderType, isNestedList),
          getNestedListStyle(isNestedList, listType)
        )
      ),
    },
  });
};
