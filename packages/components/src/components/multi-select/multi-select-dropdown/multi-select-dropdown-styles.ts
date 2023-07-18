import type { Theme } from '../../../types';
import { getCss } from '../../../utils';
import { addImportantToEachRule, getThemedColors, getTransition } from '../../../styles';
import { borderRadiusSmall, spacingStaticSmall, textSmallStyle } from '../../../../../utilities/projects/utilities';
import { OPTION_HEIGHT } from '../../select-wrapper/select-wrapper/select-wrapper-styles';
import { SelectDropdownDirectionInternal } from '../../../utils/select/select-dropdown';

export const getComponentCss = (isOpen: boolean, direction: SelectDropdownDirectionInternal, theme: Theme): string => {
  const isDirectionDown = direction === 'down';
  const { primaryColor, backgroundColor } = getThemedColors(theme);

  return getCss({
    '@global': addImportantToEachRule({
      ul: {
        position: 'absolute',
        margin: '0',
        display: isOpen ? 'flex' : 'none',
        flexDirection: 'column',
        gap: spacingStaticSmall,
        padding: '6px',
        background: backgroundColor,
        ...textSmallStyle,
        zIndex: 10,
        left: 0,
        right: 0,
        [isDirectionDown ? 'top' : 'bottom']: '100%',
        boxSizing: 'border-box',
        maxHeight: `${8.5 * (OPTION_HEIGHT + 8) + 6 + 2}px`, // 8px = gap, 6px = padding, 2px = border
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch',
        scrollBehavior: 'smooth',
        border: `2px solid ${primaryColor}`,
        [isDirectionDown ? 'borderTop' : 'borderBottom']: 'none',
        borderRadius: borderRadiusSmall,
        [isDirectionDown ? 'borderTopLeftRadius' : 'borderBottomLeftRadius']: 0,
        [isDirectionDown ? 'borderTopRightRadius' : 'borderBottomRightRadius']: 0,
        scrollbarWidth: 'thin', // firefox
        scrollbarColor: 'auto', // firefox
        transition: getTransition('border-color'),
        transform: 'translate3d(0,0,0)', // fix iOS bug if less than 5 items are displayed
      },
    }),
  });
};
