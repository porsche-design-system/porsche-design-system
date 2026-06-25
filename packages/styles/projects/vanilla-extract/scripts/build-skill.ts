import fs from 'node:fs';
import * as prettier from 'prettier';
import { getVanillaExtractSkill } from '../skill/skill';

/**
 * Separate build that prepares the Vanilla Extract portion of the Porsche Design System docs skill.
 * The hand-authored skill sources live in `./skill` (`intro.md`, `how-to-use.md`, the markdown
 * serializer `skill.ts`); this script regenerates the derived asset into `./skill/generated`:
 *
 * - `vanilla-extract.md` — the markdown package overview (intro, how-to-use and a grouped reference of
 *   every documented token and utility), derived purely from `vanillaExtractMeta`.
 *
 * Only `./skill/generated` is wiped and rebuilt, so the checked-in skill sources survive. Kept
 * independent from `build:bundle`/`build:bundle:meta`, which publish the npm package.
 */
export const buildVanillaExtractSkill = async () => {
  const targetPath = './skill/generated';
  const docs = await prettier.format(getVanillaExtractSkill(), { parser: 'markdown' });

  fs.rmSync(targetPath, { force: true, recursive: true });
  fs.mkdirSync(targetPath, { recursive: true });
  fs.writeFileSync(`${targetPath}/vanilla-extract.md`, docs);

  console.log('Built Vanilla Extract skill assets (skill/generated/vanilla-extract.md)');
};

buildVanillaExtractSkill();
