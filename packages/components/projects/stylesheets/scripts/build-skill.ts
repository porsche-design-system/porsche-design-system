import fs from 'node:fs';
import * as prettier from 'prettier';
import { getStylesheetsSkill } from '../skill/skill';

// Separate build that prepares the global-styles portion of the future Porsche Design System docs
// skill. The hand-authored skill sources live in `./skill` (`intro.md`, `how-to-use.md`, the
// `skill.ts` markdown serializer); this script regenerates the derived markdown into
// `./skill/generated`. Only `./skill/generated` is wiped and rebuilt, so the checked-in skill
// sources survive. Kept independent from `build:css`, which publishes the npm package.
//
// TODO: shipping the generated CSS files (regenerated from `globalStylesMeta` + `renderCss`) beside
// the markdown for exact values is a deliberate follow-up; only the markdown is emitted for now.
export const buildStylesheetsSkill = async (): Promise<void> => {
  const targetPath = './skill/generated';
  const docs = await prettier.format(getStylesheetsSkill(), { parser: 'markdown' });

  fs.rmSync(targetPath, { force: true, recursive: true });
  fs.mkdirSync(targetPath, { recursive: true });
  fs.writeFileSync(`${targetPath}/stylesheets.md`, docs);

  console.log('Built Global Styles skill assets (skill/generated/stylesheets.md)');
};

buildStylesheetsSkill();
