import type { Theme } from '../../../types';
import { getCss } from '../../../utils';
import { addImportantToEachRule, addImportantToRule, getThemedColors, getTransition } from '../../../styles';
import { DropdownDirectionInternal } from '../../select-wrapper/select-wrapper/select-wrapper-utils';
import { borderRadiusSmall, spacingStaticSmall, textSmallStyle } from '../../../../../utilities/projects/utilities';
import { OPTION_HEIGHT } from '../../select-wrapper/select-wrapper/select-wrapper-styles';

const dropdownPositionVar = '--p-internal-dropdown-position';

export const getComponentCss = (isOpen: boolean, direction: DropdownDirectionInternal, theme: Theme): string => {
  const isDirectionDown = direction === 'down';
  const { primaryColor, backgroundColor, contrastMediumColor } = getThemedColors(theme);

  return getCss({
    '@global': addImportantToEachRule({
      ul: {
        margin: '-4px 0 0 0',
        display: isOpen ? 'flex' : 'none',
        flexDirection: 'column',
        gap: spacingStaticSmall,
        position: `var(${dropdownPositionVar})`, // for vrt tests
        padding: '6px',
        background: backgroundColor,
        ...textSmallStyle,
        zIndex: 10,
        left: 0,
        right: 0,
        [isDirectionDown ? 'top' : 'bottom']: 'calc(100% - 2px)', // 2px border + 2px safety for rounded corners
        boxSizing: 'border-box',
        maxHeight: `${8.5 * (OPTION_HEIGHT + 8) + 6 + 2}px`, // 8px = gap, 6px = padding, 2px = border
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch',
        scrollBehavior: 'smooth',
        border: `2px solid ${primaryColor}`,
        [isDirectionDown ? 'borderTop' : 'borderBottom']: addImportantToRule(`1px solid ${contrastMediumColor}`),
        ...(isDirectionDown
          ? ['borderBottomLeftRadius', 'borderBottomRightRadius']
          : ['borderTopLeftRadius', 'borderTopRightRadius']
        ).reduce((result, curr) => ({ ...result, [curr]: borderRadiusSmall }), {}),
        scrollbarWidth: 'thin', // firefox
        scrollbarColor: 'auto', // firefox
        transition: getTransition('border-color'),
        transform: 'translate3d(0,0,0)', // fix iOS bug if less than 5 items are displayed
      },
    }),
  });
};
