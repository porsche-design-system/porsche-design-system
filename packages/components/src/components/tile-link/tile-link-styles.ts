import { getCss } from '../../utils';
import { addImportantToEachRule, pxToRemWithUnit } from '../../styles';
import { textSmall } from '../../../../utilities/projects/utilities';
import { getFontWeight } from '../../styles/font-weight-styles';
import { getThemedTextColor } from '../../styles/text-icon-styles';
import { ThemeExtendedElectric } from '../../utils/theme';
import { TileLinkAlign, TileLinkWeight } from './tile-link-utils';

export const getComponentCss = (
  theme: ThemeExtendedElectric,
  isInherit: boolean,
  weight: TileLinkWeight,
  align: TileLinkAlign,
  hasGradient: boolean,
  isCompact: boolean
): string => {
  const isTopAligned = align === 'top' && isCompact;

  return getCss({
    '@global': {
      ':host': addImportantToEachRule({
        display: 'inline-block',
        verticalAlign: 'top',
      }),
      slot: {
        display: 'block',
        position: 'absolute',
        top: '50%',
        left: '50%',
        minHeight: '100%',
        minWidth: '100%',
        maxHeight: '100%',
        maxWidth: '100%',
        transform: 'translate(-50%, -50%)',
      },
      p: {
        position: 'relative',
        color: getThemedTextColor(theme, 'default'),
        ...textSmall,
        ...(isInherit && { fontSize: 'inherit' }),
        fontWeight: getFontWeight(weight),
        padding: 0,
        margin: 0,
      },
    },
    root: {
      display: 'flex',
      position: 'relative',
      alignItems: isTopAligned ? 'start' : 'end',
      height: pxToRemWithUnit(400),
      width: pxToRemWithUnit(320),
      overflow: 'hidden',
    },
    content: {
      display: 'flex',
      padding: pxToRemWithUnit(24),
      flexDirection: 'column',
      alignItems: 'start',
      height: 'fit-content',
      gap: pxToRemWithUnit(24),
      ...(hasGradient && {
        background: isTopAligned
          ? 'linear-gradient(180deg, #1E1E1E 0%, rgba(30, 30, 30, 0.991353) 6.67%, rgba(30, 30, 30, 0.96449) 13.33%, rgba(31, 31, 31, 0.91834) 20%, rgba(31, 31, 31, 0.852589) 26.67%, rgba(32, 32, 32, 0.768225) 33.33%, rgba(33, 33, 33, 0.668116) 40%, rgba(34, 34, 34, 0.557309) 46.67%, rgba(35, 35, 35, 0.442691) 53.33%, rgba(36, 36, 36, 0.331884) 60%, rgba(37, 37, 37, 0.231775) 66.67%, rgba(38, 38, 38, 0.147411) 73.33%, rgba(39, 39, 39, 0.0816599) 80%, rgba(39, 39, 39, 0.03551) 86.67%, rgba(39, 39, 39, 0.0086472) 93.33%, rgba(39, 39, 39, 0) 100%);'
          : 'linear-gradient(180deg, rgba(26, 27, 29, 0) 0%, rgba(26, 27, 29, 0.0086472) 6.67%, rgba(26, 27, 29, 0.03551) 13.33%, rgba(26, 27, 29, 0.0816599) 20%, rgba(26, 27, 29, 0.147411) 26.67%, rgba(26, 27, 29, 0.231775) 33.33%, rgba(26, 27, 29, 0.331884) 40%, rgba(26, 27, 29, 0.442691) 46.67%, rgba(26, 27, 29, 0.557309) 53.33%, rgba(26, 27, 29, 0.668116) 60%, rgba(26, 27, 29, 0.768225) 66.67%, rgba(26, 27, 29, 0.852589) 73.33%, rgba(26, 27, 29, 0.91834) 80%, rgba(26, 27, 29, 0.96449) 86.67%, rgba(26, 27, 29, 0.991353) 93.33%, #1A1B1D 100%)',
      }),
      zIndex: 1,
    },
    },
  });
};
