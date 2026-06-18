import fs from 'node:fs';
import * as prettier from 'prettier';
import { getScssSkill } from '../skill/skill';
import { renderScssFile, scssFileMeta } from '../src/scss';

export const buildScssSkill = async () => {
  const targetPath = './skill/generated';
  const docs = await prettier.format(getScssSkill(), { parser: 'markdown' });

  fs.rmSync(targetPath, { force: true, recursive: true });
  fs.mkdirSync(targetPath, { recursive: true });
  fs.writeFileSync(`${targetPath}/scss.md`, docs);

  // Ship an exact copy of the meta-generated partials beside the markdown for precise values.
  for (const fileMeta of scssFileMeta) {
    const formatted = await prettier.format(renderScssFile(fileMeta), { parser: 'scss' });
    fs.writeFileSync(`${targetPath}/${fileMeta.file}`, formatted);
  }

  console.log('Built SCSS skill assets (skill/generated/scss.md + partials)');
};

buildScssSkill();
