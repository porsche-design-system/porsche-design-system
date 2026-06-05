import { ref, spacingStaticSm } from '@porsche-design-system/stylesheets';
import { addImportantToEachRule, hostHiddenStyles, preventFoucOfNestedElementsStyles } from '../../../styles';
import { getCss } from '../../../utils';

export const getComponentCss = (): string => {
  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule({
          ...hostHiddenStyles,
        }),
      },
      ...preventFoucOfNestedElementsStyles,
    },
    root: {
      marginBottom: ref(spacingStaticSm),
    },
  });
};
