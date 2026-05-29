import * as fs from 'node:fs';
import { globalStylesCss, renderCss } from '@porsche-design-system/global-styles-meta';
import * as prettier from 'prettier';

// Generic build step for every stylesheet modeled in `globalStylesCss`.
// Each key is the published file name and its value is the `CssNode` tree to
// render, so a single loop replaces the previously duplicated per-file scripts.
// Note: `font-face.css` is intentionally not handled here (see buildFontFaceCss.ts).
export const buildGlobalStylesCss = async (): Promise<void> => {
  const targetPath = './dist';
  fs.mkdirSync(targetPath, { recursive: true });

  for (const [targetFile, cssNodes] of Object.entries(globalStylesCss)) {
    const styles = await prettier.format(renderCss(cssNodes), { parser: 'css' });
    fs.writeFileSync(`${targetPath}/${targetFile}`, styles);
  }

  console.log(`Built Global Styles CSS: ${Object.keys(globalStylesCss).join(', ')}`);
};

(async () => {
  await buildGlobalStylesCss();
})();

