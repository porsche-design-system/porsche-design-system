import { addImportantToRule } from './common-styles';

export const hostHiddenStyles = {
  ':host([hidden])': {
    display: addImportantToRule('none'),
  },
} as const;
