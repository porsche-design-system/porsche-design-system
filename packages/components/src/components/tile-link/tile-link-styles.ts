import { buildSlottedStyles, getCss } from '../../utils';
import { addImportantToEachRule, pxToRemWithUnit } from '../../styles';
import { textSmall } from '../../../../utilities/projects/utilities';
import { getFontWeight } from '../../styles/font-weight-styles';
import { getThemedTextColor } from '../../styles/text-icon-styles';
import { AspectRatio, TileLinkAlign, TileLinkWeight } from './tile-link-utils';

const aspectRatioPaddingTop: { [key in AspectRatio]: string } = {
  '1:1': '100%',
  '4:3': '75%',
  '3:4': '133.33%',
  '16:9': '56.25%',
  '9:16': '177.75%',
};

const getGradientBackground = (isCompact: boolean, isTopAligned: boolean): string => {
  return isCompact
    ? isTopAligned
      ? 'linear-gradient(180deg, #1E1E1E 0%, rgba(30, 30, 30, 0.991353) 6.67%, rgba(30, 30, 30, 0.96449) 13.33%, rgba(31, 31, 31, 0.91834) 20%, rgba(31, 31, 31, 0.852589) 26.67%, rgba(32, 32, 32, 0.768225) 33.33%, rgba(33, 33, 33, 0.668116) 40%, rgba(34, 34, 34, 0.557309) 46.67%, rgba(35, 35, 35, 0.442691) 53.33%, rgba(36, 36, 36, 0.331884) 60%, rgba(37, 37, 37, 0.231775) 66.67%, rgba(38, 38, 38, 0.147411) 73.33%, rgba(39, 39, 39, 0.0816599) 80%, rgba(39, 39, 39, 0.03551) 86.67%, rgba(39, 39, 39, 0.0086472) 93.33%, rgba(39, 39, 39, 0) 100%);'
      : 'linear-gradient(180deg, rgba(26, 27, 29, 0) 0%, rgba(26, 27, 29, 0.0086472) 6.67%, rgba(26, 27, 29, 0.03551) 13.33%, rgba(26, 27, 29, 0.0816599) 20%, rgba(26, 27, 29, 0.147411) 26.67%, rgba(26, 27, 29, 0.231775) 33.33%, rgba(26, 27, 29, 0.331884) 40%, rgba(26, 27, 29, 0.442691) 46.67%, rgba(26, 27, 29, 0.557309) 53.33%, rgba(26, 27, 29, 0.668116) 60%, rgba(26, 27, 29, 0.768225) 66.67%, rgba(26, 27, 29, 0.852589) 73.33%, rgba(26, 27, 29, 0.91834) 80%, rgba(26, 27, 29, 0.96449) 86.67%, rgba(26, 27, 29, 0.991353) 93.33%, #1A1B1D 100%);'
    : 'linear-gradient(180deg, rgba(26, 27, 29, 0) 0%, rgba(26, 27, 29, 0.0086472) 6.67%, rgba(26, 27, 29, 0.03551) 13.33%, rgba(26, 27, 29, 0.0816599) 20%, rgba(26, 27, 29, 0.147411) 26.67%, rgba(26, 27, 29, 0.231775) 33.33%, rgba(26, 27, 29, 0.331884) 40%, rgba(26, 27, 29, 0.442691) 46.67%, rgba(26, 27, 29, 0.557309) 53.33%, rgba(26, 27, 29, 0.668116) 60%, rgba(26, 27, 29, 0.768225) 66.67%, rgba(26, 27, 29, 0.852589) 73.33%, rgba(26, 27, 29, 0.91834) 80%, rgba(26, 27, 29, 0.96449) 86.67%, rgba(26, 27, 29, 0.991353) 93.33%, #1A1B1D 100%);';
};

export const getComponentCss = (
  aspectRatio: AspectRatio,
  isInherit: boolean,
  weight: TileLinkWeight,
  align: TileLinkAlign,
  isCompact: boolean
): string => {
  const isTopAligned = align === 'top' && isCompact;
  const gradientHeight = isCompact ? '50%' : '20%';

  return getCss({
    '@global': {
      ':host': addImportantToEachRule({
        display: 'block',
        height: 'fit-content',
      }),
      '::slotted(*:not(a))': {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
      },
      p: {
        color: getThemedTextColor('dark', 'default'),
        ...textSmall,
        ...(isInherit && { fontSize: 'inherit' }),
        fontWeight: getFontWeight(weight),
        maxWidth: pxToRemWithUnit(550),
        padding: 0,
        margin: 0,
      },
    },
    'aspect-ratio-container': {
      height: 0,
      paddingTop: aspectRatioPaddingTop[aspectRatio],
      position: 'relative',
      overflow: 'hidden',
    },
    'aspect-ratio-box': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      transform: 'translate3d(0,0,0)',
      minWidth: '96px',
    },
    gradient: {
      position: 'absolute',
      left: 0,
      right: 0,
      ...(isTopAligned
        ? {
            top: 0,
            bottom: gradientHeight,
          }
        : {
            top: gradientHeight,
            bottom: 0,
          }),
      background: getGradientBackground(isCompact, isTopAligned),
    },
    content: {
      position: 'absolute',
      ...(isTopAligned ? { top: 0 } : { bottom: 0 }),
      left: 0,
      right: 0,
      display: 'flex',
      margin: isTopAligned
        ? ` ${pxToRemWithUnit(24)} ${pxToRemWithUnit(24)} 0`
        : `0 ${pxToRemWithUnit(24)}  ${pxToRemWithUnit(24)}`,
      alignItems: isCompact ? 'center' : 'start',
      gap: pxToRemWithUnit(24),
      flexDirection: isCompact ? 'row' : 'column',
      ...(isCompact && {
        justifyContent: 'space-between',
      }),
    },
    link: {
      '&::before': {
        content: '""',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      },
    },
  });
};

export const getSlottedCss = (host: HTMLElement): string => {
  return getCss(
    buildSlottedStyles(host, {
      '::slotted(a)::before': {
        content: '""',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      },
    })
  );
};
