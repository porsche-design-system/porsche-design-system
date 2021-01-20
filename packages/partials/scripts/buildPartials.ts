import * as fs from 'fs';
import * as path from 'path';
import { TAG_NAMES } from '@porsche-design-system/components/src/tags';
import { minifyHTML } from './utils';
import { CDN_BASE_URL, CDN_BASE_URL_CN, CDN_BASE_PATH_STYLES } from '../../../cdn.config';

const generatePartials = async (): Promise<void> => {
  const targetDirectory = path.normalize('./src/lib');
  const targetFile = path.normalize(`${targetDirectory}/partials.ts`);
  const generatedUtilitiesPackage = fs.readFileSync(require.resolve('@porsche-design-system/utilities'), 'utf8');
  const hashedFontFaceCssFiles = generatedUtilitiesPackage.match(/(font-face\.min[\w\d\.]*)/g);

  const newContent = `
type Options = {
  cdn?: 'auto' | 'cn';
  withoutTags?: boolean;
  prefix?: string;
};

export const getFontFaceStylesheet = (opts?: Pick<Options, 'cdn' | 'withoutTags'>): string => {
  const url = \`\${opts?.cdn === 'cn'
    ? '${CDN_BASE_URL_CN}'
    : '${CDN_BASE_URL}'
  }/${CDN_BASE_PATH_STYLES}/\${opts?.cdn === 'cn'
    ? '${hashedFontFaceCssFiles?.find((x) => x.includes('.cn.'))}'
    : '${hashedFontFaceCssFiles?.find((x) => !x.includes('.cn.'))}'
  }\`;

  return opts?.withoutTags
    ? url
    : \`${minifyHTML('<link rel="stylesheet" href="$URL">').replace('$URL', '${url}')}\`;
}

export const getInitialStyles = (opts?: Pick<Options, 'withoutTags' | 'prefix'>): string => {
  const tagNames = [${TAG_NAMES.map((x) => `'${x}'`).join(', ')}];
  const styleInnerHtml = tagNames.map((x) => opts?.prefix
    ? \`\${opts.prefix}-\${x}\`
    : x
  ).join(',') + '{visibility:hidden}';

  return opts?.withoutTags
    ? styleInnerHtml
    : \`<style>\${styleInnerHtml}</style>\`;
};
`;

  fs.mkdirSync(path.resolve(targetDirectory), { recursive: true });
  fs.writeFileSync(targetFile, newContent.trimStart());
};

generatePartials().catch((e) => {
  console.error(e);
  process.exit(1);
});
