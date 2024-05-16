import { TagName } from '@porsche-design-system/shared';
import { addImportantToEachRule } from '../common-styles';
import { Styles } from 'jss';

export const tagNamesWithSlottedInputIndicatorArray: TagName[] = ['p-text-field-wrapper'];

export const getSlottedInputIndicatorStyles = (tagName: TagName): Styles => ({
  '@global': {
    [`${tagName} input`]: {
      // unfortunately we can´t use :is() for ::-webkit pseudo selectors in Chrome for unknown reasons
      '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button, &::-webkit-search-decoration, &::-webkit-search-cancel-button, &::-webkit-calendar-picker-indicator':
        addImportantToEachRule({
          display: 'none',
        }),
      // for type="date" and type="time" we need to override some mobile safari user agent styles
      // https://stackoverflow.com/questions/37457097/input-type-date-text-alignright-ios-devices
      '&::-webkit-date-and-time-value': addImportantToEachRule({
        display: 'inline-block',
        textAlign: 'inherit', // for LTR/RTL
        verticalAlign: 'middle',
      }),
    },
  },
});
