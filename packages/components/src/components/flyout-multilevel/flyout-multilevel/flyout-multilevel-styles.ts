import {
  getMediaQueryMin,
  spacingFluidSmall,
  spacingFluidXSmall,
  spacingStaticSmall,
} from '@porsche-design-system/styles';
import { css, unsafeCSS } from 'lit';
import { getThemedColors } from '../../../styles';
import type { Theme } from '../../../utils';

export const cssVariableVisibility = '--p-internal-flyout-multilevel-visibility';
export const cssVariableVisibilityTransitionDuration = '--p-internal-flyout-multilevel-visibility-transition-duration';

export const scrollerWidthEnhancedView = 'clamp(338px, 10.52vw + 258px, 460px)';
export const mediaQueryEnhancedView = getMediaQueryMin('s');

export const getComponentCss = (
  isDialogOpen: boolean,
  isPrimary: boolean,
  isSecondaryScrollerVisible: boolean,
  theme: Theme
): string => {
  const { backgroundColor, backgroundShadingColor } = getThemedColors(theme);
  const { backgroundColor: backgroundColorDark, backgroundShadingColor: backgroundShadingColorDark } =
    getThemedColors('dark');

  const style = css`
    :host {
      ${unsafeCSS(isDialogOpen ? '' : css`--p-internal-flyout-multilevel-visibility: hidden;`)}
      display: block;
      color-scheme: light dark;

      &([hidden]) {
        display: none;
      }

      &:not(:defined,[data-ssr]) {
        visibility: hidden;
      }
    }

    slot {
      ${unsafeCSS(isPrimary ? css`--_p-flyout-multilevel-button: block` : '')};
      display: grid;
      overflow: hidden auto;
      background: ${unsafeCSS(backgroundColor)};
      ${unsafeCSS(
        isPrimary
          ? css`
            gap: ${unsafeCSS(spacingFluidXSmall)};
            grid-area: 1/1`
          : css`
            grid-template-columns: subgrid;
            grid-area: 1/1/1/3`
      )};
      visibility: var(${unsafeCSS(cssVariableVisibility)},${unsafeCSS(isSecondaryScrollerVisible ? 'hidden' : 'inherit')});

      @media (prefers-color-scheme: dark) {
        background: ${unsafeCSS(backgroundColorDark)};
      }

      @media(min-width:760px) {
        visibility: inherit;
      }
    }

    dialog {
      position: fixed;
      height: 100dvh;
      max-height: 100dvh;
      margin: 0;
      padding: 0;
      border: 0;
      visibility: inherit;
      outline: 0;
      transform: translate3d(-100%, 0, 0);
      opacity: 0;
      inset: 0;
      display: grid;
      overflow: visible;
      width: auto;
      max-width: 100vw;
      background: none;
      transition: opacity 1.5s, transform 1.5s, overlay 1.5s, display 1.5s;
      transition-behavior: allow-discrete;

      &::backdrop {
        background: ${unsafeCSS(backgroundShadingColor)};
        opacity: 0;
        -webkit-backdrop-filter: blur(0px);
        backdrop-filter: blur(0px);
        transition: display 1.5s, overlay 1.5s, opacity 1.5s, backdrop-filter 1.5s, -webkit-backdrop-filter 1.5s;
        transition-behavior: allow-discrete;

        @media (prefers-color-scheme: dark) {
          background: ${unsafeCSS(backgroundShadingColorDark)};
        }
      }

      &[open] {
        transform: translate3d(0, 0, 0);
        opacity: 1;

        &::backdrop {
          opacity: 1;
          -webkit-backdrop-filter: blur(32px);
          backdrop-filter: blur(32px);
        }
      }

      @media(min-width:760px) {
        grid-template-columns: repeat(${isSecondaryScrollerVisible ? 2 : 1}, ${unsafeCSS(scrollerWidthEnhancedView)}) auto;
        grid-template-rows: 100vh;
        inset-inline-end: auto;
      }
    }

    @starting-style {
      dialog[open] {
        transform: translate3d(-100%, 0, 0);
        opacity: 0;

        &::backdrop {
          opacity: 0;
          -webkit-backdrop-filter: blur(0px);
          backdrop-filter: blur(0px);
        }
      }
    }

    .dismiss {
      padding: ${unsafeCSS(spacingFluidSmall)};
      @media(min-width:760px) {
        --p-internal-icon-filter: invert(1);
        margin: ${unsafeCSS(spacingFluidSmall)};
        padding: ${unsafeCSS(spacingStaticSmall)};
      }
    }
  `;

  return style.cssText;
};
