import fs from 'node:fs';
import path from 'node:path';
import * as prettier from 'prettier';
import { buildEmotionDeprecationsMeta, renderEmotionDeprecationsMeta } from './deprecations';

const target = path.join(__dirname, '..', 'emotionMeta', 'deprecations.ts');

export const buildEmotionDeprecations = async () => {
  const source = renderEmotionDeprecationsMeta(buildEmotionDeprecationsMeta());
  fs.writeFileSync(
    target,
    await prettier.format(source, { ...(await prettier.resolveConfig(target)), parser: 'typescript' })
  );
  console.log('Built emotionMeta/deprecations.ts');
};

buildEmotionDeprecations();
