import * as fs from 'fs';
import * as path from 'path';
import { color, font, FONT_FACE_CDN_URL } from '@porsche-design-system/utilities';
import { TAG_NAMES } from '@porsche-design-system/components/src/tags';
import { minifyHTML, minifyCSS } from './utils';

const updateContent = (oldContent: string, newContent: string): string => {
  const separator = '/* Auto Generated Below */';
  const separatorPosition = oldContent.indexOf(separator);
  return `${oldContent.substr(0, separatorPosition >= 0 ? separatorPosition : undefined)}${separator}
  ${newContent}`;
};

const generateStylesPartials = async (): Promise<void> => {
  const targetFile = path.normalize('./src/styles.ts');

  const oldContent = fs.readFileSync(targetFile, 'utf8');
  const newContent = `
type Options = { withoutTags: boolean };

export const getFontFaceCSS = (options?: Options): string =>
  options?.withoutTags ? '${FONT_FACE_CDN_URL}' : '${minifyHTML(
    `<link rel="stylesheet" href="${FONT_FACE_CDN_URL}">`
  )}';

export const getPorscheDesignSystemCoreStyles = (options?: Options): string => {
  const styleInnerHtml = '${minifyCSS(`${TAG_NAMES.join(',')} { visibility: hidden }`)}';
  return options?.withoutTags ? styleInnerHtml : \`<style>\${styleInnerHtml}</style>\`;
};`;

  fs.writeFileSync(targetFile, updateContent(oldContent, newContent));
};

const generateFontLoaderPartials = async (): Promise<void> => {
  const targetFile = path.normalize('./src/font-loader.ts');

  const CLASS_NAME = 'loader';

  const baseLoaderStyles = `
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

  const oldContent = fs.readFileSync(targetFile, 'utf8');
  const newContent = `
export const getLoader = (options?: { all?: boolean; thin?: boolean; semibold?: boolean; bold?: boolean }): string => {
  let loaderStyles = '';
  if (options) {
    if (options.thin || options.all) {
      loaderStyles = '${minifyCSS(`
        .${CLASS_NAME}::before {
        content: "";
        font-weight: ${font.weight.thin};
      }`)}';
    }
    if (options.semibold || options.all) {
      loaderStyles += '${minifyCSS(`
        .${CLASS_NAME}::after {
        content: "";
        font-weight: ${font.weight.semibold};
      }`)}';
    }
    if (options.bold || options.all) {
      loaderStyles += '${minifyCSS(`
        .${CLASS_NAME}::first-line {
        content: "";
        font-weight: ${font.weight.bold};
      }`)}';
    }
  }

  const output = '${minifyHTML(`
    <div class="${CLASS_NAME}" id="pdsLoader">
      <style>
        ${baseLoaderStyles}
      </style>
      <div class="spinner">
        <svg viewBox="0 0 32 32">
          <circle class="fg" cx="16" cy="16" r="9" />
          <circle class="bg" cx="16" cy="16" r="9" />
        </svg>
      </div>
    </div>`)}'.replace(/(<\\/style>)/, \`\${loaderStyles}$1\`);
  return output;
}`;

  fs.writeFileSync(targetFile, updateContent(oldContent, newContent));
};

(async (): Promise<void> => {
  await generateStylesPartials().catch((e) => {
    console.error(e);
    process.exit(1);
  });
  await generateFontLoaderPartials().catch((e) => {
    console.error(e);
    process.exit(1);
  });
})();
