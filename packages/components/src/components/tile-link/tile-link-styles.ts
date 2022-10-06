import { getCss } from '../../utils';
import { addImportantToEachRule, pxToRemWithUnit } from '../../styles';
import { textSmall } from '../../../../utilities/projects/utilities';
import { getFontWeight } from '../../styles/font-weight-styles';
import { getThemedTextColor } from '../../styles/text-icon-styles';
import { ThemeExtendedElectric } from '../../utils/theme';

export const getComponentCss = (theme: ThemeExtendedElectric): string => {
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
        fontWeight: getFontWeight('regular'),
        padding: 0,
        margin: 0,
      },
    },
    root: {
      display: 'flex',
      position: 'relative',
      height: pxToRemWithUnit(400),
      width: pxToRemWithUnit(320),
      overflow: 'hidden',
    },
    content: {
      display: 'flex',
      margin: pxToRemWithUnit(24),
      flexDirection: 'column',
      justifyContent: 'end',
      alignItems: 'start',
      gap: pxToRemWithUnit(24),
      background:
        'linear-gradient(180deg, rgba(26, 27, 29, 0) 0%, rgba(26, 27, 29, 0.0086472) 6.67%, rgba(26, 27, 29, 0.03551) 13.33%, rgba(26, 27, 29, 0.0816599) 20%, rgba(26, 27, 29, 0.147411) 26.67%, rgba(26, 27, 29, 0.231775) 33.33%, rgba(26, 27, 29, 0.331884) 40%, rgba(26, 27, 29, 0.442691) 46.67%, rgba(26, 27, 29, 0.557309) 53.33%, rgba(26, 27, 29, 0.668116) 60%, rgba(26, 27, 29, 0.768225) 66.67%, rgba(26, 27, 29, 0.852589) 73.33%, rgba(26, 27, 29, 0.91834) 80%, rgba(26, 27, 29, 0.96449) 86.67%, rgba(26, 27, 29, 0.991353) 93.33%, #1A1B1D 100%)',
    },
  });
};
