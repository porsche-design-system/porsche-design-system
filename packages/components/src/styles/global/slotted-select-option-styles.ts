import { addImportantToEachRule } from '../common-styles';
import { getThemedColors } from '../colors';
import type { Styles } from 'jss';
import type { TagName } from '@porsche-design-system/shared';

/*
 * This is a bug fix Windows when using a touch device or the native property where the <option> elements are not visible in dark mode.
 * We set the styles explicitly regardless of theme as a workaround to avoid dynamic stylesheet manipulation.
 * These styles will be ignored in most iOS and Android browsers anyway.
 */
export const getSlottedSelectOptionStyles = (tagName: TagName): Styles => {
  const { primaryColor, backgroundColor } = getThemedColors('light');
  return {
    '@global': {
      [`${tagName} select > option`]: addImportantToEachRule({
        color: primaryColor,
        backgroundColor,
      }),
    },
  };
};
