import * as fs from 'node:fs';
import * as path from 'node:path';
import * as prettier from 'prettier';
import { globalStylesMeta } from '../src/css';
import { renderCss } from '../src/helpers';

// Generic build step for every stylesheet modeled in `globalStylesMeta`.
// Each entry provides the published `file` name and the `meta` (`CssNode` tree)
// to render, so a single loop replaces the previously duplicated per-file scripts.
// Note: `font-face.css` is intentionally not handled here (see buildFontFaceCss.ts).
export const buildStylesheetsCss = async (): Promise<void> => {
  // Resolved from this file so the output cannot follow the caller's working directory.
  const targetPath = path.resolve(__dirname, '..', 'lib');
  fs.mkdirSync(targetPath, { recursive: true });

  const stylesheets = Object.values(globalStylesMeta);

  for (const { file, meta } of stylesheets) {
    const styles = await prettier.format(renderCss(meta), { parser: 'css' });
    fs.writeFileSync(path.join(targetPath, file), styles);
  }

  console.log(`Built Global Styles CSS: ${stylesheets.map(({ file }) => file).join(', ')}`);
};

(async () => {
  await buildStylesheetsCss();
})();
