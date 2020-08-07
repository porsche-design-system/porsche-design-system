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

export const getLoader = (options?: { all?: boolean; thin?: boolean; semibold?: boolean; bold?: boolean }) => {
  let loaderClasses = '';
  let loaderStyles = '';
  if (options) {
    if (options.all) {
      loaderStyles = `
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
    }`;
      loaderClasses = 'loader--all';
    } else {
      if (options.thin) {
        loaderStyles = `
          .loader--thin::before {
            content:'';
            font-weight: ${font.weight.thin};
          }`;
        loaderClasses = 'loader--thin';
      }
      if (options.semibold) {
        loaderStyles = `
          .loader--semibold::after {
            content:'';
            font-weight: ${font.weight.semibold};
          }`;
        loaderClasses = 'loader--semibold';
      }
      if (options.bold) {
        loaderStyles = `
          .loader--bold::first-line {
            content:'';
            font-weight: ${font.weight.bold};
          }`;
        loaderClasses = 'loader--bold';
      }
    }
  }
  return `
  <div class="loader ${loaderClasses}" id="pdsLoader">
  <style>
    ${defaultLoaderStyles}
    ${loaderStyles}
  </style>
    <div class="spinner">
      <svg viewBox="0 0 32 32">
        <circle class="fg" cx="16" cy="16" r="9" />
        <circle class="bg" cx="16" cy="16" r="9" />
      </svg>
    </div>
  </div>`;
};

export const fontFaceCssElement = `<link rel="stylesheet" href="${FONT_FACE_STYLE_CDN_URL}">`;

// Needs to be extended everytime a new component gets added
export const waitForPDSComponents = `<style> p-marque,p-button,p-button-pure,p-checkbox-wrapper,p-link,p-link-pure,p-link-social,p-select-wrapper,
p-text-field-wrapper,p-pagination,p-radio-button-wrapper,p-textarea-wrapper,p-content-wrapper,p-divider,p-fieldset-wrapper,p-flex,p-flex-item,p-grid,
p-grid-item,p-headline,p-marque,p-text-list,p-text-list-item,p-spinner,p-icon,p-text { visibility: hidden }</style>`;
