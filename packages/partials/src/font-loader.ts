import { color, font } from '@porsche-design-system/utilities';

const CLASS_NAME = 'loader';

const defaultLoaderStyles = `
.${CLASS_NAME} {
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
  let loaderStyles = '';
  if (options) {
    if (options.thin || options.all) {
      loaderStyles = `
        .${CLASS_NAME}::before {
          content: '';
          font-weight: ${font.weight.thin};
        }`;
    }
    if (options.semibold || options.all) {
      loaderStyles += `
        .${CLASS_NAME}::after {
          content: '';
          font-weight: ${font.weight.semibold};
        }`;
    }
    if (options.bold || options.all) {
      loaderStyles += `
        .${CLASS_NAME}::first-line {
          content: '';
          font-weight: ${font.weight.bold};
        }`;
    }
  }
  return `
  <div class="${CLASS_NAME}" id="pdsLoader">
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
