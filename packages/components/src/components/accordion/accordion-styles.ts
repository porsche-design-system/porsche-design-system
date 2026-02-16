import {
  addImportantToEachRule,
  addImportantToRule,
  cssVariableTransitionDuration,
  getFocusBaseStyles,
  getTransition,
  hostHiddenStyles,
  hoverMediaQuery,
  motionDurationMap,
  preventFoucOfNestedElementsStyles,
} from '../../styles';
import {
  colorCanvas,
  colorFrosted,
  colorPrimary,
  fontPorscheNext,
  leadingNormal,
  legacyRadiusSmall,
  radiusFull,
  radiusXl,
  spacingStaticSm,
  typescaleSm,
} from '../../styles/css-variables';
import { getCss } from '../../utils';
import { getInlineSVGBackgroundImage } from '../../utils/svg/getInlineSVGBackgroundImage';
import type { AccordionAlignIcon, AccordionBackground } from './accordion-utils';

/**
 * @css-variable {"name": "--p-accordion-summary-top", "description": "In case prop `sticky` is set to true, it's possible to control the sticky top position of the internally used `<summary>` element.", "defaultValue": "0"}
 */
const cssVarSummaryTop = '--p-accordion-summary-top';

/**
 * @css-variable {"name": "--p-accordion-px", "description": "Defines the logical inline start and end padding of the accordion.", "defaultValue": "16px"}
 */
const cssVarPaddingInline = '--p-accordion-px';

/**
 * @css-variable {"name": "--p-accordion-px", "description": "Defines the logical block start and end padding of the accordion.", "defaultValue": "16px"}
 */
const cssVarPaddingBlock = '--p-accordion-py';

// CSS Variable defined in fontHyphenationStyle
/**
 * @css-variable {"name": "--p-hyphens", "description": "Sets the CSS `hyphens` property for text elements, controlling whether words can break and hyphenate automatically.", "defaultValue": "auto"}
 */

const icon = getInlineSVGBackgroundImage(
  `<path d="m12 15.125h-.001l-.005-.006-6.494-5.476.642-.768 5.858 4.94 5.858-4.94.642.769-6.497 5.477z"/>`
);

export const getComponentCss = (
  alignIcon: AccordionAlignIcon,
  background: AccordionBackground,
  isCompact: boolean,
  isOpen: boolean,
  isSticky: boolean
): string => {
  const duration = isOpen ? 'moderate' : 'short';
  const easing = isOpen ? 'in' : 'out';

  const compactFactor = isCompact ? 0.64285714 : 1;

  // TODO: should be done smarter and ensure that it's in sync with button/link
  const paddingBlock = `calc(28px * (${compactFactor} - 0.64285714) + 6px)`;
  const paddingInline = `calc(33.6px * (${compactFactor} - 0.64285714) + 16px)`;
  const gap = `calc(11.2px * (${compactFactor} - 0.64285714) + 4px)`;

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
      ...preventFoucOfNestedElementsStyles,
      slot: {
        display: 'block',
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
      details: {
        all: 'unset',
        font: `${typescaleSm} / ${leadingNormal} ${fontPorscheNext}`,
        color: colorPrimary, // enables color inheritance for slotted content
        display: 'block',
        padding: `var(${cssVarPaddingBlock}, ${background === 'none' ? '0' : paddingBlock}) var(${cssVarPaddingInline}, ${background === 'none' ? '0' : paddingInline})`,
        background: background === 'none' ? 'transparent' : background === 'canvas' ? colorCanvas : colorFrosted,
        borderRadius: `var(${legacyRadiusSmall}, ${radiusXl})`,
        '&::details-content': {
          contentVisibility: addImportantToRule('visible'), // we need to overwrite it to support cross-browser animation, we take care of content-visibility on our own to be a11y compliant
        },
        '& > div': {
          ...(isSticky && {
            position: 'relative',
            zIndex: 0, // ensures stacking to be below the summary content
          }),
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
            marginTop: spacingStaticSm,
            // as soon as all browsers support calc-size(auto) to be transitionable, we can remove the grid-template-rows rule and animation
            gridTemplateRows: '1fr',
            visibility: 'visible', // since `::details-content` and `allow-discrete` transition doesn't work in Safari we need to take care ourselves for visibility state to be a11y compliant
            // as soon as all browsers are supporting `allow-discrete` reliable, visibility transition shouldn't be necessary anymore
            transition: `visibility 0s linear 0s, ${getTransition('grid-template-rows', duration, easing)}, ${getTransition('margin-top', duration, easing)}, ${getTransition('opacity', duration, easing)}`,
          },
        },
      },
      summary: {
        all: 'unset',
        ...(isSticky && {
          position: 'sticky',
          top: `var(${cssVarSummaryTop}, 0px)`,
          zIndex: 1, // ensures stacking to be above the details content
        }),
        display: 'flex',
        justifyContent: 'space-between',
        ...(alignIcon === 'start' && {
          flexDirection: 'row-reverse',
          justifyContent: 'flex-end',
        }),
        alignItems: 'center',
        gap,
        cursor: 'pointer',
        padding: `var(${cssVarPaddingBlock}, ${background === 'none' ? '0' : paddingBlock}) var(${cssVarPaddingInline}, ${background === 'none' ? '0' : paddingInline})`,
        margin: `calc(-1 * var(${cssVarPaddingBlock}, ${background === 'none' ? '0' : paddingBlock})) calc(-1 * var(${cssVarPaddingInline}, ${background === 'none' ? '0' : paddingInline}))`,
        ...(isSticky &&
          background === 'canvas' && {
            background: colorCanvas,
            borderRadius: `var(${legacyRadiusSmall}, ${radiusXl})`,
          }),
        '&:focus-visible > span': getFocusBaseStyles(),
        ...hoverMediaQuery({
          '&:hover > span': {
            background: colorFrosted,
          },
        }),
        '& > span': {
          flexShrink: 0,
          display: 'grid',
          width: '1.5rem',
          height: '1.5rem',
          [alignIcon === 'start' ? 'marginInlineStart' : 'marginInlineEnd']: '-5px', // compensate white space of svg icon and optimize visual alignment
          borderRadius: radiusFull,
          background: 'transparent',
          transition: getTransition('background-color'),
          '&::before': {
            content: '""',
            WebkitMask: `${icon} center/contain no-repeat`, // necessary for Sogou browser support :-)
            mask: `${icon} center/contain no-repeat`,
            background: colorPrimary,
            transform: 'rotate3d(0)',
            transition: getTransition('transform', duration, easing),
            'details[open] &': {
              transform: 'rotate3d(0,0,1,180deg)',
            },
          },
        },
      },
    },
  });
};
