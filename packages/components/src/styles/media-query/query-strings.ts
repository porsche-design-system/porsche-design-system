import { css } from '../../utils/css';

export const forcedColorsMediaQueryCss = (styles: string): string => css`
  @media (forced-colors: active) {
    ${styles}
  }
`;

export const hoverMediaQueryCss = (styles: string): string => css`
  @media (hover: hover) {
    ${styles}
  }
`;

export const overlayTransitionSupportsQueryCss = (styles: string): string => css`
  @supports (overlay: auto) and (transition-behavior: allow-discrete) {
    ${styles}
  }
`;
