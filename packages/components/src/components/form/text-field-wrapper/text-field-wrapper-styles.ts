import {
  addImportantToEachRule,
  buildGlobalStyles,
  buildSlottedStyles,
  getBaseSlottedStyles,
  getCss,
  pxToRemWithUnit,
} from '../../../utils';
import { UnitPositionType } from './text-field-wrapper-utils';
import { JssStyle } from 'jss';

export const getSlottedCss = (host: HTMLElement): string => {
  return getCss(
    buildSlottedStyles(host, {
      ...getBaseSlottedStyles(),
      '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button, & input[type="search"]::-webkit-search-decoration':
        {
          WebkitAppearance: 'none',
          appearance: 'none',
        },
      '& input[type="text"]': {
        '&::-webkit-contacts-auto-fill-button, &::-webkit-credentials-auto-fill-button': {
          marginRight: '2.4375rem',
        },
      },
    })
  );
};
const getUnitStyles = (unitPosition: UnitPositionType, unitElementWidth?: number): JssStyle => {
  return {
    '::slotted(input[type="number"])': {
      ...(unitPosition === 'prefix'
        ? {
            paddingLeft: pxToRemWithUnit(unitElementWidth),
          }
        : { paddingRight: pxToRemWithUnit(unitElementWidth) }),
    },
  };
};

export const getComponentCss = (unit: string, unitPosition: UnitPositionType, unitElementWidth?: number) => {
  return getCss({
    ...buildGlobalStyles(
      addImportantToEachRule({
        '::slotted(input)': {
          padding: pxToRemWithUnit(11),
        },
        ...(unit && getUnitStyles(unitPosition, unitElementWidth)),
      })
    ),
  });
};
