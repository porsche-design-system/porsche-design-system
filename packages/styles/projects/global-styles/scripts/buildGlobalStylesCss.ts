import * as fs from 'node:fs';
import { globalStylesMeta, renderCss } from '@porsche-design-system/global-styles-meta';
import * as prettier from 'prettier';

// Generic build step for every stylesheet modeled in `globalStylesMeta`.
// Each entry provides the published `file` name and the `meta` (`CssNode` tree)
// to render, so a single loop replaces the previously duplicated per-file scripts.
// Note: `font-face.css` is intentionally not handled here (see buildFontFaceCss.ts).
export const buildGlobalStylesCss = async (): Promise<void> => {
  const targetPath = './dist';
  fs.mkdirSync(targetPath, { recursive: true });

  const stylesheets = Object.values(globalStylesMeta);

  for (const { file, meta } of stylesheets) {
    const styles = await prettier.format(renderCss(meta), { parser: 'css' });
    fs.writeFileSync(`${targetPath}/${file}`, styles);
  }

  console.log(`Built Global Styles CSS: ${stylesheets.map(({ file }) => file).join(', ')}`);
};

(async () => {
  await buildGlobalStylesCss();
})();

