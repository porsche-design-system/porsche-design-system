import { TagName } from '@porsche-design-system/shared';
import { addImportantToEachRule } from '../common-styles';
import { Styles } from 'jss';

export const tagNamesWithSlottedImageArray: TagName[] = ['p-table'];

export const getSlottedImageStyles = (tagName: TagName): Styles => ({
  '@global': {
    [`${tagName} img`]: addImportantToEachRule({
      verticalAlign: 'middle',
    }),
  },
});
