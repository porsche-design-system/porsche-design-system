import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import * as yaml from 'js-yaml';
import SVGO = require('svgo');
import globby from 'globby';
import { paramCase, camelCase } from 'change-case';

interface Manifest {
  [name: string]: string;
}

const toHash = (str: string): string => {
  return crypto
    .createHash('md5')
    .update(str, 'utf8')
    .digest('hex');
};

const createManifestAndOptimizeIcons = async (cdn: string, files: string[], config: SVGO.Options): Promise<void> => {
  fs.rmdirSync(path.normalize('./dist'), {recursive: true});
  fs.mkdirSync(path.normalize('./dist/icons'), {recursive: true});

  const manifest: Manifest = {};
  const svgo = new SVGO(config);

  for (const file of files) {
    const svgRawPath = path.normalize(file);
    const svgRawName = path.basename(svgRawPath, '.svg');
    const svgRawData = fs.readFileSync(svgRawPath, {encoding: 'utf8'});
    const svgOptimizedData = (await svgo.optimize(svgRawData)).data;
    const svgOptimizedHash = toHash(svgOptimizedData);
    const svgOptimizedFilename = `${paramCase(svgRawName)}.min.${svgOptimizedHash}.svg`;
    const svgOptimizedPath = path.normalize(`./dist/icons/${svgOptimizedFilename}`);

    if (svgRawName !== paramCase(svgRawName)) throw new Error(`Icon name "${svgRawName}" does not fit naming convention »kebab-case«.`);
    if (svgRawName in manifest) throw new Error(`Icon name "${svgRawName}" is not unique.`);

    const nameKey = camelCase(svgRawName);
    manifest[nameKey] = svgOptimizedFilename;

    fs.writeFileSync(svgOptimizedPath, svgOptimizedData, {encoding: 'utf8'});

    const svgRawSize = fs.statSync(svgRawPath).size;
    const svgOptimizedSize = fs.statSync(svgOptimizedPath).size;
    const svgSizeDiff = svgOptimizedSize - svgRawSize;

    console.log(`Icon "${svgRawName}" optimized: ${svgSizeDiff < 0 ? svgSizeDiff : '+'+ svgSizeDiff} bytes (size: ${svgOptimizedSize} bytes)`);

    if (svgOptimizedSize > 3000) throw new Error(`Icon "${svgRawName}" is too large.`);
  }

  fs.writeFileSync(path.normalize('./index.ts'),
`export const cdn = "${cdn}";
export const icons = ${JSON.stringify(manifest)};`
  );

  console.log('Created icons manifest.');
};

(async (): Promise<void> => {
  const cdn = 'https://cdn.ui.porsche.com/porsche-design-system/icons';
  const files = await globby('./src/**/*.svg');
  const config = yaml.safeLoad(fs.readFileSync(path.normalize('./.svgo.yml'), {encoding: 'utf8'}));

  await createManifestAndOptimizeIcons(cdn, files, config).catch(e => {
    console.error(e);
    process.exit(1);
  });
})();
