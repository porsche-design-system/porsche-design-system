import { getMinifiedCss } from '@porsche-design-system/shared';
import { fontFamily, fontLineHeight } from '@porsche-design-system/styles';
import fs from 'fs';
import type { Styles } from 'jss';

export const buildNormalizeCss = (): string => {
  const normalizeStyles: Styles = {
    '@global': {
      'html, body': {
        margin: 0,
        padding: 0,
        fontFamily,
        lineHeight: fontLineHeight,
        letterSpacing: 'normal',
        textSizeAdjust: 'none',
        WebkitTextSizeAdjust: 'none', // stop iOS safari from adjusting font size when screen rotation is changing
      },
    },
  };

  const styles = `${getMinifiedCss(normalizeStyles)}`;

  const targetPath = './dist';
  const targetFile = 'normalize.css';

  fs.mkdirSync(targetPath, { recursive: true });
  fs.writeFileSync(`./${targetPath}/${targetFile}`, styles);
};

buildNormalizeCss();
