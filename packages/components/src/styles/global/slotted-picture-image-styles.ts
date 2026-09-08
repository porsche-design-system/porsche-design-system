import type { TagName } from '@porsche-design-system/shared';
import type { Styles } from 'jss';
import { addImportantToEachRule } from '../common-styles';

export const tagNamesWithSlottedPictureImageArray: TagName[] = ['p-button-tile', 'p-link-tile', 'p-link-tile-product'];

export const getSlottedPictureImageStyles = (tagName: TagName): Styles => ({
  '@global': {
    [`${tagName} picture img`]: addImportantToEachRule({
      height: '100%',
      width: '100%',
      objectFit: 'cover',
    }),
  },
});
