import { color, font, FONT_FACE_STYLE_CDN_URL } from '@porsche-design-system/utilities';

const defaultLoaderStyles = `
.loader {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: ${color.background.default};
      z-index: 10000;
      font-family: ${font.family};
    }
    .spinner {
      position: absolute;
      width: 72px;
      top: 50%;
      left: 50%;
      margin: -36px 0 0 -36px;
      fill: none;
      transform: translate3d(0, 0, 0);
      stroke-width: 1px;
      stroke: ${color.neutralContrast.high};
    }
    .fg {
      stroke-linecap: round;
      transform-origin: center center;
      stroke-dashoffset: 0;
      stroke-dasharray: 40, 200;
      animation: rotate 2s linear infinite, dash 2s ease-in-out infinite;
    }
    .bg {
      opacity: 0.4;
    }
    @keyframes rotate {
      100% {
        transform: rotate(360deg);
      }
    }
    @keyframes dash {
      0% {
        stroke-dasharray: 3, 1000;
      }
      50% {
        stroke-dasharray: 42, 1000;
      }
      100% {
        stroke-dasharray: 30, 1000;
        stroke-dashoffset: -52;
      }
    }
`;
export const loaderRegular = `
  <style id="pdsLoaderStyle">
    ${defaultLoaderStyles}
    .loader__thin {
      font-weight: ${font.weight.thin};
    }
    .loader__semibold {
      font-weight: ${font.weight.semibold};
    }
    .loader__bold {
      font-weight: ${font.weight.bold};
    }
  </style>
  <div class="loader" id="pdsLoader">
    <div class="spinner">
      <svg viewBox="0 0 32 32">
        <circle class="fg" cx="16" cy="16" r="9" />
        <circle class="bg" cx="16" cy="16" r="9" />
      </svg>
    </div>
  </div>
`;

export const loaderAllFonts = `<style id="pdsLoaderStyle">
    ${defaultLoaderStyles}
    .loader--all::before {
        content:'';
        font-weight: ${font.weight.thin};
    }
    .loader--all::after {
        content: '';
        font-weight: ${font.weight.semibold};
    }
    .loader--all::first-line {
        font-weight: ${font.weight.bold};
    }
  </style>
  <div class="loader loader--all" id="pdsLoader">
    <div class="spinner">
      <svg viewBox="0 0 32 32">
        <circle class="fg" cx="16" cy="16" r="9" />
        <circle class="bg" cx="16" cy="16" r="9" />
      </svg>
    </div>
  </div>`;

export const loaderThin = '<div class="loader loader__thin"></div>';
export const loaderSemibold = '<div class="loader loader__semibold"></div>';
export const loaderBold = '<div class="loader loader__bold"></div>';

export const fontFaceCssElement = `<link rel="stylesheet" href="http://localhost:3001/style/font-face.min.css">`;
