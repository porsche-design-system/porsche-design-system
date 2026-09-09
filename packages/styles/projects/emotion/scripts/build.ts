import fs from 'node:fs';
import path from 'node:path';
import * as prettier from 'prettier';
import { buildEmotionDeprecations, renderEmotionDeprecations } from './deprecations';

const target = path.join(__dirname, '..', 'emotionMeta', 'deprecations.ts');

const writeEmotionDeprecations = async () => {
  const source = renderEmotionDeprecations(buildEmotionDeprecations());
  fs.writeFileSync(
    target,
    await prettier.format(source, { ...(await prettier.resolveConfig(target)), parser: 'typescript' })
  );
  console.log('Built emotionMeta/deprecations.ts');
};

writeEmotionDeprecations();
