import fs from 'node:fs';
import path from 'node:path';
import * as prettier from 'prettier';
import { buildVanillaExtractDeprecations, renderVanillaExtractDeprecations } from './deprecations';

const target = path.join(__dirname, '..', 'vanillaExtractMeta', 'deprecations.ts');

const writeVanillaExtractDeprecations = async () => {
  const source = renderVanillaExtractDeprecations(buildVanillaExtractDeprecations());
  fs.writeFileSync(
    target,
    await prettier.format(source, { ...(await prettier.resolveConfig(target)), parser: 'typescript' })
  );
  console.log('Built vanillaExtractMeta/deprecations.ts');
};

writeVanillaExtractDeprecations();
