import type { JssStyle } from 'jss';
import type { ListType, OrderType } from '../text-list/text-list-utils';
import { getCss } from '../../../utils';
import { addImportantToEachRule, pxToRemWithUnit } from '../../../styles';
import { textSmall } from '@porsche-design-system/utilities-v2';

const cssVariableOrderedSuffix = '--pds-text-list-item-ordered-suffix';
const cssVariableUnorderedWidth = '--pds-text-list-item-unordered-width';
const cssVariableUnorderedHeight = '--pds-text-list-item-unordered-height';
const cssVariableUnorderedTop = '--pds-text-list-item-unordered-top';

export const getComponentCss = (listType: ListType, orderType: OrderType): string => {
  const isOrdered = listType === 'ordered';
  const beforeJssStyles: JssStyle = {
    position: 'absolute',
    left: 0,
  };

  return getCss({
    '@global': {
      '::slotted(*)': {
        [cssVariableOrderedSuffix]: '""',
        [cssVariableUnorderedWidth]: pxToRemWithUnit(8),
        [cssVariableUnorderedHeight]: '1px',
        [cssVariableUnorderedTop]: 'calc(1.5em / 2)',
      },
      ':host': addImportantToEachRule({
        position: 'relative',
        display: 'list-item',
        color: 'inherit',
        listStyleType: 'none',
        paddingLeft: pxToRemWithUnit(isOrdered ? 40 : 24),
        '&:before': isOrdered
          ? {
              ...beforeJssStyles,
              content: `counters(section,".",${
                orderType === 'numbered' ? 'decimal' : 'lower-latin'
              }) var(${cssVariableOrderedSuffix},".")`,
              top: 0,
              width: pxToRemWithUnit(24),
              height: 'auto',
              counterIncrement: 'section',
              textAlign: 'right',
              backgroundColor: 'transparent',
              ...textSmall,
            }
          : {
              ...beforeJssStyles,
              content: '""',
              width: `var(${cssVariableUnorderedWidth},${pxToRemWithUnit(4)})`,
              height: `var(${cssVariableUnorderedHeight},${pxToRemWithUnit(4)})`,
              top: `var(${cssVariableUnorderedTop},calc(1.5em / 2 - 0.125em))`,
              backgroundColor: 'currentColor',
            },
      }),
    },
  });
};
