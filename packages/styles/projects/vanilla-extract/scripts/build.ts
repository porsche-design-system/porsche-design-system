import fs from 'node:fs';
import path from 'node:path';
import * as prettier from 'prettier';
import { buildVanillaExtractDeprecationsMeta, renderVanillaExtractDeprecationsMeta } from './deprecations';

const target = path.join(__dirname, '..', 'vanillaExtractMeta', 'deprecations.ts');

export const buildVanillaExtractDeprecations = async () => {
  const source = renderVanillaExtractDeprecationsMeta(buildVanillaExtractDeprecationsMeta());
  fs.writeFileSync(
    target,
    await prettier.format(source, { ...(await prettier.resolveConfig(target)), parser: 'typescript' })
  );
  console.log('Built vanillaExtractMeta/deprecations.ts');
};

buildVanillaExtractDeprecations();
