import {
  fontFamily,
  fontLineHeight,
  fontSizeTextMedium,
  fontSizeTextSmall,
  fontWeightSemiBold,
  frostedGlassStyle,
  motionDurationShort,
  spacingStaticSmall,
  textSmallStyle,
} from '@porsche-design-system/emotion';
import {
  addImportantToEachRule,
  cssVariableTransitionDuration,
  getFocusBaseStyles,
  getTransition,
  hostHiddenStyles,
  hoverMediaQuery,
  preventFoucOfNestedElementsStyles,
} from '../../styles';
import {
  colorCanvas,
  colorContrastLower,
  colorFrostedSoft,
  colorPrimary,
  legacyRadiusSmall,
  radiusSm,
} from '../../styles/css-variables';
import type { BreakpointCustomizable } from '../../types';
import { buildResponsiveStyles, getCss, mergeDeep } from '../../utils';
import type { AccordionSize } from './accordion-utils';

const cssVariablePositionStickyTop = '--p-accordion-position-sticky-top';
const positionStickyTopFallback = '0';

// CSS Variable defined in fontHyphenationStyle
/**
 * @css-variable {"name": "--p-hyphens", "description": "Sets the CSS `hyphens` property for text elements, controlling whether words can break and hyphenate automatically.", "defaultValue": "auto"}
 */
export const getComponentCss = (
  size: BreakpointCustomizable<AccordionSize>,
  compact: boolean,
  open: boolean,
  sticky: boolean
): string => {
  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule({
          ...(compact
            ? { transform: 'translate3d(0,0,0)' } // relevant for custom click-area in compact variant
            : {
                borderBottom: `1px solid ${colorContrastLower}`,
              }),
          '&(:only-of-type)': { borderBottom: 0 },
          ...hostHiddenStyles,
        }),
      },
      ...preventFoucOfNestedElementsStyles,
      button: {
        all: 'unset',
        display: 'flex',
        position: 'relative',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        gap: '24px',
        cursor: 'pointer',
        zIndex: 0,
        color: colorPrimary,
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
              borderRadius: `var(${legacyRadiusSmall}, ${radiusSm})`,
              insetInline: '-4px',
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
              background: colorFrostedSoft,
            },
          })
        ),
        '&:focus-visible::before': getFocusBaseStyles(),
      },
    },
    heading: {
      margin: 0,
      ...(sticky && {
        position: 'sticky',
        top: `var(${cssVariablePositionStickyTop}, ${positionStickyTopFallback})`,
        zIndex: 1, // to be on top of the collapsible
        background: colorCanvas,
      }),
    },
    'icon-container': {
      height: fontLineHeight,
      width: fontLineHeight,
      font: `inherit ${fontFamily}`, // needed for correct calculations based on ex-unit
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    icon: {
      transform: open ? 'rotate3d(0)' : 'rotate3d(0,0,1,90deg)',
      transition: getTransition('transform'),
    },
    collapsible: {
      color: colorPrimary, // enables color inheritance for slotted content
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
