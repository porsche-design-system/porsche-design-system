import {
  addImportantToEachRule,
  getAnimation,
  hostHiddenStyles,
  preventFoucOfNestedElementsStyles,
} from '../../../styles';
import {
  fontPorscheNext,
  fontWeightSemibold,
  leadingNormal,
  spacingFluidLg,
  spacingFluidMd,
  spacingFluidSm,
  spacingFluidXs,
  spacingStaticMd,
  typescaleSm,
} from '../../../styles/css-variables';
import { getCss } from '../../../utils';
import {
  cssVarColorBackgroundBase,
  cssVarColorBackgroundScroller,
  cssVarColorPrimary,
  cssVariableGap,
  cssVariableGridTemplate,
  mediaQueryDesktop,
  mediaQueryMobile,
  scrollerWidthDesktop,
} from '../drilldown/drilldown-styles';

export const getComponentCss = (isPrimary: boolean, isSecondary: boolean, isCascade: boolean): string => {
  return getCss({
    '@global': {
      '@keyframes slide-up-mobile': {
        from: { transform: `translate3d(0,${spacingFluidMd},0)` },
        to: { transform: 'translate3d(0,0,0)' },
      },
      '@keyframes slide-up-desktop-primary': {
        from: { marginBlockStart: spacingFluidMd },
        to: { marginBlockStart: '0px' },
      },
      '@keyframes slide-up-desktop-secondary': {
        from: { marginBlockStart: spacingFluidMd },
        to: { marginBlockStart: '0px' },
      },
      ':host': {
        display: 'contents',
        ...addImportantToEachRule({
          ...hostHiddenStyles,
        }),
      },
      ...preventFoucOfNestedElementsStyles,
      slot: {
        '&[name="header"]': {
          display: 'none',
          [mediaQueryMobile]: {
            ...(isSecondary && {
              gridArea: '2/3',
              display: 'grid',
              placeItems: 'center',
              zIndex: 2,
            }),
          },
        },
        '&[name="button"]': {
          ...((isPrimary || isCascade) && {
            display: 'none',
          }),
          [mediaQueryMobile]: {
            ...(isSecondary && {
              display: 'none',
            }),
          },
        },
        '&:not([name])': {
          display: 'none',
          [mediaQueryMobile]: {
            ...(isSecondary && {
              gridArea: '4/2/auto/-2',
              zIndex: 0,
              display: 'grid',
              gridTemplate: `var(${cssVariableGridTemplate},auto/auto)`,
              gap: `var(${cssVariableGap},${spacingFluidXs})`,
              alignContent: 'start',
              alignItems: 'start',
              boxSizing: 'border-box',
              minHeight: '100%',
              height: 'fit-content', // ensures padding bottom is added instead of subtracted because of grid context
              paddingBlockEnd: spacingFluidLg,
              animation: getAnimation('slide-up-mobile', 'moderate', 'base'),
            }),
            ...((isPrimary || isCascade) && {
              display: 'contents',
            }),
          },
          [mediaQueryDesktop]: {
            ...((isPrimary || isSecondary) && {
              gridArea: '3/2/auto/-2',
              display: 'grid',
              gridTemplate: `var(${cssVariableGridTemplate},auto/auto)`,
              gap: `var(${cssVariableGap},${spacingFluidXs})`,
              alignContent: 'start',
              alignItems: 'start',
              boxSizing: 'border-box',
              minHeight: '100%',
              height: 'fit-content', // ensures padding bottom is added instead of subtracted because of grid context
              paddingBlockEnd: spacingFluidLg,
              animation: getAnimation(`slide-up-desktop-${isPrimary ? 'primary' : 'secondary'}`, 'moderate', 'base'),
            }),
            ...(isSecondary && {
              gridArea: '2/2/auto/-2',
              paddingBlockEnd: spacingFluidLg,
            }),
            ...(isCascade && {
              display: 'contents',
            }),
          },
        },
      },
      h2: {
        display: 'none',
        [mediaQueryMobile]: {
          ...(isSecondary && {
            font: `${fontWeightSemibold} ${typescaleSm} / ${leadingNormal} ${fontPorscheNext}`,
            display: 'block',
            gridArea: '2/3',
            placeSelf: 'center',
            zIndex: 2,
            margin: 0,
            paddingInline: spacingStaticMd,
            maxWidth: '100%',
            boxSizing: 'border-box',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            color: `var(${cssVarColorPrimary})`, // enables color inheritance for slotted content
          }),
        },
      },
      // If cascade we need to hide all children which are not primary or another cascade (e.g. all siblings of the primary or cascade item)
      ...(isCascade && {
        '::slotted(*:not([primary],[cascade]))': addImportantToEachRule({
          display: 'none',
        }),
      }),
      ...(isPrimary && {
        '::slotted(*:not([secondary]))': addImportantToEachRule({
          [mediaQueryMobile]: {
            display: 'none',
          },
        }),
      }),
      '::slotted(*)': {
        [cssVariableGridTemplate]: 'auto/auto', // reset css variable to prevent inheritance
        [cssVariableGap]: spacingFluidXs, // reset css variable to prevent inheritance
      },
    },
    // drawer subgrid in combination with scroller grid ensures no content squeezing during slide up animation, potentially caused by scrollbar
    drawer: {
      [mediaQueryMobile]: {
        display: 'none',
        ...((isPrimary || isSecondary || isCascade) && {
          display: 'contents',
        }),
      },
      [mediaQueryDesktop]: {
        display: 'none',
        ...(isSecondary && {
          position: 'absolute', // enables to break out of scroll area
          inset: 0,
          insetInlineStart: scrollerWidthDesktop,
          display: 'grid',
          gridTemplate: `${spacingFluidMd} minmax(0, 1fr)/${spacingFluidLg} minmax(0, 1fr) ${spacingFluidLg}`,
        }),
        ...((isPrimary || isCascade) && {
          display: 'contents',
        }),
      },
    },
    scroller: {
      display: 'none',
      overflow: 'hidden auto',
      // scrollBehavior: 'smooth', // when defined, `.scrollTo()` isn't applied immediately
      // overscrollBehaviorY: 'none', // when defined, rubber band scroll effect is getting lost on iOS Safari
      // WebkitOverflowScrolling: 'touch', // when defined, secondary scroller might not be show in iOS Safari on iPhone only
      background: `var(${cssVarColorBackgroundScroller})`,
      [mediaQueryMobile]: {
        ...(isSecondary && {
          display: 'grid',
          gridTemplateRows: 'subgrid',
          gridTemplateColumns: 'subgrid',
          gridArea: '1/1/-1/-1',
          '&::before': {
            zIndex: 1,
            content: '""',
            position: 'sticky',
            top: 0,
            gridArea: '1/1/4/-1',
            background: `linear-gradient(180deg,var(${cssVarColorBackgroundBase}) 0%,var(${cssVarColorBackgroundBase}) 65%,transparent 100%)`,
          },
        }),
        ...((isPrimary || isCascade) && {
          display: 'contents',
        }),
      },
      [mediaQueryDesktop]: {
        ...(isSecondary && {
          gridArea: '1/1/-1/-1',
          display: 'grid',
          gridTemplateRows: 'subgrid',
          gridTemplateColumns: 'subgrid',
        }),
        ...((isPrimary || isCascade) && {
          display: 'contents',
        }),
      },
    },
    button: {
      ...((isPrimary || isCascade) && {
        display: 'none',
      }),
      [mediaQueryMobile]: {
        ...(isSecondary && {
          display: 'none',
        }),
      },
      ...(!isPrimary &&
        !isCascade && {
          // TODO: not sure if this is ideal, since the consumer won't be able to change it when used with a custom
          //  grid-template, maybe <p-drilldown-button slot="button" /> would be an option, similar to <p-drilldown-link />
          gridColumn: '1/-1',
          padding: spacingFluidSm,
          margin: `0 calc(${spacingFluidSm} * -1)`,
        }),
    },
    back: {
      ...(!isPrimary && {
        display: 'none',
      }),
      ...(isPrimary && {
        [mediaQueryMobile]: {
          gridArea: '2/2',
          marginTop: '2px', // compensate negative margin of ::pseudo background of button-pure
          width: 'fit-content',
          height: 'fit-content',
          placeSelf: 'start',
          zIndex: 2,
        },
        [mediaQueryDesktop]: {
          gridArea: '2/2',
          marginBottom: spacingFluidMd,
          width: 'fit-content',
          height: 'fit-content',
          marginInlineStart: '-4px', // improve visual alignment and compensate white space of arrow-left icon
        },
      }),
    },
  });
};
