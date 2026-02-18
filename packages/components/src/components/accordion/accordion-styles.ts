import { frostedGlassStyle } from '@porsche-design-system/emotion';
import {
  addImportantToEachRule,
  cssVariableTransitionDuration,
  forcedColorsMediaQuery,
  getFocusBaseStyles,
  getTransition,
  hostHiddenStyles,
  hoverMediaQuery,
  motionDurationMap,
} from '../../styles';
import {
  colorCanvas,
  colorFrosted,
  colorPrimary,
  colorSurface,
  fontPorscheNext,
  fontWeightSemibold,
  leadingNormal,
  legacyRadiusSmall,
  radiusFull,
  radiusXl,
  typescaleSm,
} from '../../styles/css-variables';
import { getCss } from '../../utils';
import { getInlineSVGBackgroundImage } from '../../utils/svg/getInlineSVGBackgroundImage';
import type { AccordionAlignMarker, AccordionBackground } from './accordion-utils';

/**
 * @css-variable {"name": "--p-accordion-summary-top", "description": "Controls the sticky top position when `sticky` is enabled.", "defaultValue": "0px"}
 */
const cssVarSummaryTop = '--p-accordion-summary-top';
const cssVarSummaryTopDeprecated = '--p-accordion-position-sticky-top'; // deprecated

/**
 * @css-variable {"name": "--p-accordion-px", "description": "Horizontal padding of the accordion.", "defaultValue": "16px"}
 */
const cssVarPaddingInline = '--p-accordion-px';

/**
 * @css-variable {"name": "--p-accordion-py", "description": "Vertical padding of the accordion.", "defaultValue": "16px"}
 */
const cssVarPaddingBlock = '--p-accordion-py';

// CSS Variable defined in fontHyphenationStyle
/**
 * @css-variable {"name": "--p-hyphens", "description": "Sets the CSS `hyphens` property for text elements, controlling whether words can break and hyphenate automatically.", "defaultValue": "auto"}
 */

const icon = getInlineSVGBackgroundImage(
  `<path d="m12 15.125h-.001l-.005-.006-6.494-5.476.642-.768 5.858 4.94 5.858-4.94.642.769-6.497 5.477z"/>`
);

const backgroundMap: Record<AccordionBackground, string> = {
  canvas: colorCanvas,
  surface: colorSurface,
  frosted: colorFrosted,
  none: 'transparent',
};

// as soon as CSS selector `:has-slotted` works cross-browser we can simplify the styles a lot and remove all the complexity regarding the summary-before and summary-after slots
export const getComponentCss = (
  alignMarker: AccordionAlignMarker,
  background: AccordionBackground,
  isCompact: boolean,
  isOpen: boolean,
  isSticky: boolean,
  hasSummaryBefore: boolean,
  hasSummaryAfter: boolean
): string => {
  const duration = isOpen ? 'moderate' : 'short';
  const easing = isOpen ? 'in' : 'out';

  const compactFactor = isCompact ? 0.64285714 : 1;

  const paddingBlock = `calc(28px * (${compactFactor} - 0.64285714) + 6px)`;
  const paddingInline = `calc(11.2px * (${compactFactor} - 0.64285714) + 12px)`;
  const gap = `calc(11.2px * (${compactFactor} - 0.64285714) + 4px)`;
  const marginTop = `calc(28px * (${compactFactor} - 0.64285714) + 6px)`;

  const isIconAlignedStart = alignMarker === 'start';

  return getCss({
    '@global': {
      '@keyframes overflow-hidden': {
        from: { overflow: 'hidden' },
        to: { overflow: 'hidden' },
      },
      ':host': {
        display: 'block',
        ...addImportantToEachRule({
          ...hostHiddenStyles,
        }),
      },
      slot: {
        display: 'block',
        '&[name="summary-before"]': {
          gridArea: `1/${isIconAlignedStart ? '2' : '1'}`,
          zIndex: 2, // ensures stacking to be above the summary section
        },
        '&[name="summary"]': {
          gridArea: `1/${hasSummaryBefore && isIconAlignedStart ? '3' : hasSummaryBefore || isIconAlignedStart ? '2' : '1'}`,
        },
        '&[name="summary-after"]': {
          gridArea: `1/${hasSummaryBefore && isIconAlignedStart ? '4' : hasSummaryBefore || isIconAlignedStart ? '3' : '2'}`,
          zIndex: 2, // ensures stacking to be above the summary section
        },
        '&:not([name])': {
          // as soon as all browsers support calc-size(auto) to be transitionable, we can remove the overflow rule and animation
          overflow: 'hidden',
          'details[open] &': {
            overflow: 'visible',
            // fix potential overflow issues
            animation: `overflow-hidden var(${cssVariableTransitionDuration},${motionDurationMap[duration]})`,
          },
        },
      },
      'h1,h2,h3,h4,h5,h6': {
        gridArea: `1/${hasSummaryBefore && isIconAlignedStart ? '3' : hasSummaryBefore || isIconAlignedStart ? '2' : '1'}`,
        all: 'unset',
        font: 'inherit',
        fontWeight: fontWeightSemibold,
      },
      details: {
        all: 'unset',
        font: `${typescaleSm} / ${leadingNormal} ${fontPorscheNext}`, // enables font inheritance for slotted content
        color: colorPrimary, // enables color inheritance for slotted content
        display: 'grid',
        gridTemplate: `repeat(2, auto) / ${hasSummaryBefore ? 'auto ' : ''}${isIconAlignedStart ? 'auto minmax(0, 1fr)' : 'minmax(0, 1fr) auto'}${hasSummaryAfter ? ' auto ' : ''}`,
        columnGap: gap,
        alignItems: 'center',
        padding: `var(${cssVarPaddingBlock}, ${background === 'none' ? '0' : paddingBlock}) var(${cssVarPaddingInline}, ${background === 'none' ? '0' : paddingInline})`,
        background: backgroundMap[background],
        ...(background === 'frosted' && frostedGlassStyle),
        borderRadius: `var(${legacyRadiusSmall}, ${radiusXl})`,
        ...forcedColorsMediaQuery({
          outline: '1px solid CanvasText',
          outlineOffset: background === 'none' ? '0' : '-1px',
          padding: `var(${cssVarPaddingBlock}, ${paddingBlock}) var(${cssVarPaddingInline}, ${paddingInline})`,
        }),
        '&::details-content': addImportantToEachRule({
          display: 'contents', // allows <details> to be used as grid layout
          contentVisibility: 'visible', // we need to overwrite it to support cross-browser animation, we take care of content-visibility on our own to be a11y compliant
        }),
        '& > div': {
          gridArea: '2/1/auto/-1',
          zIndex: 0, // ensures stacking to be below the summary section
          display: 'grid',
          opacity: 0,
          marginTop: '0px',
          gridTemplateRows: '0fr',
          visibility: 'hidden', // since `::details-content` and `allow-discrete` transition doesn't work in Safari we need to take care ourselves for visibility state to be a11y compliant
          // as soon as all browsers are supporting `allow-discrete` reliable, visibility transition shouldn't be necessary anymore
          transition: `visibility 0s linear var(${cssVariableTransitionDuration}, ${motionDurationMap[duration]}), ${getTransition('grid-template-rows', duration, easing)}, ${getTransition('margin-top', duration, easing)}, ${getTransition('opacity', duration, easing)}`,
        },
        '&[open]': {
          '& > div': {
            opacity: 1,
            marginTop,
            // as soon as all browsers support calc-size(auto) to be transitionable, we can remove the grid-template-rows rule and animation
            gridTemplateRows: '1fr',
            visibility: 'inherit', // since `::details-content` and `allow-discrete` transition doesn't work in Safari we need to take care ourselves for visibility state to be a11y compliant
            // as soon as all browsers are supporting `allow-discrete` reliable, visibility transition shouldn't be necessary anymore
            transition: `visibility 0s linear 0s, ${getTransition('grid-template-rows', duration, easing)}, ${getTransition('margin-top', duration, easing)}, ${getTransition('opacity', duration, easing)}`,
          },
        },
      },
      summary: {
        all: 'unset',
        gridArea: '1/1/auto/-1',
        zIndex: 1, // ensures stacking to be above the details content
        display: 'grid',
        gridTemplateColumns: 'subgrid',
        alignItems: 'center',
        cursor: 'pointer',
        padding: `var(${cssVarPaddingBlock}, ${background === 'none' ? '0' : paddingBlock}) var(${cssVarPaddingInline}, ${background === 'none' ? '0' : paddingInline})`,
        margin: `calc(-1 * var(${cssVarPaddingBlock}, ${background === 'none' ? '0' : paddingBlock})) calc(-1 * var(${cssVarPaddingInline}, ${background === 'none' ? '0' : paddingInline}))`,
        ...(isSticky &&
          (background === 'canvas' || background === 'surface') && {
            position: 'sticky',
            top: `var(${cssVarSummaryTop}, var(${cssVarSummaryTopDeprecated}, 0px))`,
            background: `linear-gradient(180deg,${backgroundMap[background]} 0%,${backgroundMap[background]} 90%,transparent 100%)`,
            borderRadius: `var(${legacyRadiusSmall}, ${radiusXl})`,
          }),
        '&:focus-visible::before': getFocusBaseStyles(),
        ...hoverMediaQuery({
          '&:hover::before': {
            background: colorFrosted,
          },
        }),
        '&::before': {
          gridArea: `1/${isIconAlignedStart ? '1' : hasSummaryBefore && hasSummaryAfter ? '4' : hasSummaryBefore || hasSummaryAfter ? '3' : '2'}`,
          placeSelf: 'center',
          content: '""',
          width: '1.5rem',
          height: '1.5rem',
          pointerEvents: 'none',
          borderRadius: radiusFull,
          background: 'transparent',
          transition: getTransition('background-color'),
          ...forcedColorsMediaQuery({
            backgroundColor: 'LinkText',
          }),
        },
        '&::after': {
          gridArea: `1/${isIconAlignedStart ? '1' : hasSummaryBefore && hasSummaryAfter ? '4' : hasSummaryBefore || hasSummaryAfter ? '3' : '2'}`,
          placeSelf: 'center',
          content: '""',
          width: '1rem',
          height: '1rem',
          pointerEvents: 'none',
          WebkitMask: `${icon} center/contain no-repeat`, // necessary for Sogou browser support :-)
          mask: `${icon} center/contain no-repeat`,
          background: colorPrimary,
          transform: 'rotate3d(0)',
          transition: getTransition('transform', duration, easing),
          ...forcedColorsMediaQuery({
            backgroundColor: 'LinkText',
          }),
          'details[open] &': {
            transform: 'rotate3d(0,0,1,180deg)',
          },
        },
      },
    },
  });
};
