import {
  borderRadiusSmall,
  fontLineHeight,
  fontSizeTextMedium,
  fontSizeTextSmall,
  fontSizeTextXXSmall,
  fontWeightSemiBold,
  frostedGlassStyle,
  motionDurationShort,
  spacingStaticSmall,
  textSmallStyle,
} from '@porsche-design-system/styles';
import {
  addImportantToEachRule,
  colorSchemeStyles,
  cssVariableTransitionDuration,
  getFocusJssStyle,
  getThemedColors,
  getTransition,
  hostHiddenStyles,
  hoverMediaQuery,
  prefersColorSchemeDarkMediaQuery,
  preventFoucOfNestedElementsStyles,
} from '../../styles';
import type { BreakpointCustomizable, Theme } from '../../types';
import { buildResponsiveStyles, getCss, mergeDeep } from '../../utils';
import type { AccordionSize } from './accordion-utils';

export const getComponentCss = (
  size: BreakpointCustomizable<AccordionSize>,
  compact: boolean,
  open: boolean,
  theme: Theme,
  sticky: boolean
): string => {
  const { primaryColor, frostedColor, contrast20Color, canvasColor } = getThemedColors(theme);
  const {
    primaryColor: primaryColorDark,
    frostedColor: frostedColorDark,
    contrast20Color: contrast20ColorColorDark,
    canvasColor: canvasColorDark,
  } = getThemedColors('dark');
  const cssVariablePositionStickyTop = '--p-accordion-position-sticky-top';
  const positionStickyTopFallback = '0';

  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule({
          ...(compact
            ? { transform: 'translate3d(0,0,0)' } // relevant for custom click-area in compact variant
            : {
                borderBottom: `1px solid ${contrast20Color}`,
                ...prefersColorSchemeDarkMediaQuery(theme, {
                  borderColor: contrast20ColorColorDark,
                }),
              }),
          '&(:only-of-type)': { borderBottom: 0 },
          ...colorSchemeStyles,
          ...hostHiddenStyles,
        }),
      },
      ...preventFoucOfNestedElementsStyles,
      button: {
        display: 'flex',
        position: 'relative',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        textDecoration: 'none',
        border: 0,
        margin: 0, // Removes default button margin on safari 15
        gap: '24px',
        background: 'transparent',
        cursor: 'pointer',
        textAlign: 'start',
        zIndex: 0,
        color: primaryColor,
        ...prefersColorSchemeDarkMediaQuery(theme, {
          color: primaryColorDark,
        }),
        ...textSmallStyle,
        fontWeight: fontWeightSemiBold,
        ...buildResponsiveStyles(size, (s: AccordionSize) => ({
          fontSize: s === 'medium' ? fontSizeTextMedium : fontSizeTextSmall,
          padding: `${compact ? '4px' : s === 'medium' ? '20px' : '15px'} 0`,
        })),
        // mergeDeep needed because of hoverMediaQuery in certain modes not wrapping keys and therefore overriding "&::before" key
        ...mergeDeep(
          {
            '&::before': {
              content: '""',
              zIndex: -1,
              position: 'absolute',
              borderRadius: borderRadiusSmall,
              left: '-4px',
              right: '-4px',
              ...(compact
                ? {
                    top: '2px',
                    bottom: '2px',
                  }
                : {
                    top: '6px',
                    bottom: '6px',
                  }),
            },
          },
          hoverMediaQuery({
            '&::before': {
              transition: getTransition('background-color'),
            },
            '&:hover::before': {
              ...frostedGlassStyle,
              background: frostedColor,
              ...prefersColorSchemeDarkMediaQuery(theme, {
                background: frostedColorDark,
              }),
            },
          })
        ),
        ...getFocusJssStyle(theme, { pseudo: true, offset: '-2px' }),
      },
    },
    heading: {
      margin: 0,
      ...(sticky && {
        position: 'sticky',
        top: `var(${cssVariablePositionStickyTop}, ${positionStickyTopFallback})`,
        zIndex: 1, // to be on top of the collapsible
        backgroundColor: canvasColor,
        ...prefersColorSchemeDarkMediaQuery(theme, {
          backgroundColor: canvasColorDark,
        }),
      }),
    },
    'icon-container': {
      height: fontLineHeight,
      width: fontLineHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    icon: {
      width: fontLineHeight,
      height: fontLineHeight,
      fontSize: fontSizeTextXXSmall,
      transform: open ? 'rotate3d(0)' : 'rotate3d(0,0,1,90deg)',
      transition: getTransition('transform'),
    },
    collapsible: {
      color: primaryColor, // enables color inheritance for slotted content
      ...prefersColorSchemeDarkMediaQuery(theme, {
        color: primaryColorDark,
      }),
      display: 'grid',
      ...(sticky && {
        position: 'relative',
        zIndex: 0, // to be below the heading
      }),
      ...(open
        ? {
            gridTemplateRows: '1fr',
            visibility: 'inherit',
            transition: getTransition('grid-template-rows'),
            paddingBottom: compact ? spacingStaticSmall : '24px',
          }
        : {
            gridTemplateRows: '0fr',
            visibility: 'hidden',
            transition: `${getTransition(
              'grid-template-rows'
            )}, visibility 0s linear var(${cssVariableTransitionDuration}, ${motionDurationShort})`,
          }),
      '& div': {
        overflow: open ? 'visible' : 'hidden',
        // Fix overflow issues for overlapping content (e.g. select dropdown)
        animation: open ? `$overflow var(${cssVariableTransitionDuration},${motionDurationShort})` : 'none',
        // Necessary to make focus outlines fully visible
        padding: '4px',
        margin: '-4px',
        // Fix scrollbar issues when slotted content includes .sr-only styles (see issue #3042)
        transform: 'translate3d(0,0,0)',
        zIndex: 1,
      },
    },
    '@keyframes overflow': {
      from: { overflow: 'hidden' },
      to: { overflow: 'hidden' },
    },
  });
};
