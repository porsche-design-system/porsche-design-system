import fs from 'node:fs';
import * as prettier from 'prettier';
import { getEmotionSkill } from '../skill/skill';

/**
 * Separate build that prepares the Emotion portion of the Porsche Design System docs skill. The
 * hand-authored skill sources live in `./skill` (`intro.md`, `how-to-use.md`, the markdown
 * serializer `skill.ts`); this script regenerates the derived asset into `./skill/generated`:
 *
 * - `emotion.md` — the markdown package overview (intro, how-to-use and a grouped reference of every
 *   documented token and utility), derived purely from `emotionMeta`.
 *
 * Only `./skill/generated` is wiped and rebuilt, so the checked-in skill sources survive. Kept
 * independent from `build:bundle`/`build:bundle:meta`, which publish the npm package.
 */
export const buildEmotionSkill = async () => {
  const targetPath = './skill/generated';
  const docs = await prettier.format(getEmotionSkill(), { parser: 'markdown' });

  fs.rmSync(targetPath, { force: true, recursive: true });
  fs.mkdirSync(targetPath, { recursive: true });
  fs.writeFileSync(`${targetPath}/emotion.md`, docs);

  console.log('Built Emotion skill assets (skill/generated/emotion.md)');
};

buildEmotionSkill();