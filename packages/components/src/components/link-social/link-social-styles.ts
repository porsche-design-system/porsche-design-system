import { getCss } from '../../utils';
import { addImportantToEachRule } from '../../styles';
import { hostHiddenStyles } from '../../styles/host-hidden-styles';

export const getComponentCss = (): string => {
  return getCss({
    '@global': {
      ':host': addImportantToEachRule({
        ...hostHiddenStyles,
        display: 'inline-block',
        verticalAlign: 'top',
        outline: 0, // custom element is able to delegate the focus
      }),
    },
  });
};
