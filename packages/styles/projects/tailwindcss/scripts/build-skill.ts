import fs from 'node:fs';
import * as prettier from 'prettier';
import { getTailwindcssSkill } from '../skill/skill';
import { getTailwindcssTheme, tailwindCssMeta } from '../src';

/**
 * Separate build that prepares the Tailwind portion of the future Porsche Design System
 * docs skill. The hand-authored skill sources live in `./skill` (e.g. `docs.ts`, the
 * markdown serializer); this script regenerates the derived assets into
 * `./skill/generated`:
 *
 * - `tailwindcss.md` — the markdown theme overview (intro, how-to-use and a grouped
 *   reference of every documented theme variable and utility).
 * - `index.css` — the complete generated theme, regenerated here (not copied from `dist`)
 *   so it stays byte-identical to the published stylesheet without depending on a prior
 *   `build:css` run.
 *
 * Only `./skill/generated` is wiped and rebuilt, so the checked-in skill sources survive.
 * Kept independent from `build:css`/`build:package`, which publish the npm package.
 */
export const buildTailwindcssSkill = async () => {
  const targetPath = './skill/generated';
  const docs = await prettier.format(getTailwindcssSkill(), { parser: 'markdown' });
  const theme = await prettier.format(getTailwindcssTheme(), { parser: 'css' });

  fs.rmSync(targetPath, { force: true, recursive: true });
  fs.mkdirSync(targetPath, { recursive: true });
  fs.writeFileSync(`${targetPath}/tailwindcss.md`, docs);
  fs.writeFileSync(`${targetPath}/${tailwindCssMeta.file}`, theme);

  console.log('Built Tailwind CSS skill assets (skill/generated/tailwindcss.md + index.css)');
};

buildTailwindcssSkill();
