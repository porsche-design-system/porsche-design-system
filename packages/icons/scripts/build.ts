import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';
import { getFiles, toHash, toKebabCase } from './utils';
import SVGO = require('svgo');

const createManifestAndOptimizeSVG = async (cdn: string, files: string[], config: SVGO.Options): Promise<void> => {
  fs.rmdirSync(path.normalize('./dist'), {recursive: true});
  fs.mkdirSync(path.normalize('./dist/svg'), {recursive: true});

  const manifest: {[key: string]: string} = {};
  const svgo = new SVGO(config);

  for (let file of files) {
    const svgRawPath = path.normalize(file);
    const svgRawName = path.basename(svgRawPath, '.svg');
    const svgRawData = fs.readFileSync(svgRawPath, 'utf8');
    const svgOptimizedData = (await svgo.optimize(svgRawData)).data;
    const svgOptimizedHash = toHash(svgOptimizedData);
    const svgOptimizedFilename = `${svgRawName}.min.${svgOptimizedHash}.svg`;
    const svgOptimizedPath = path.normalize(`./dist/svg/${svgOptimizedFilename}`);

    if (svgRawName !== toKebabCase(svgRawName)) throw new Error(`Icon name "${svgRawName}" does not fit naming convention »kebab-case«.`);
    if (svgRawName in manifest) throw new Error(`Icon name "${svgRawName}" is not unique.`);

    manifest[svgRawName] = svgOptimizedFilename;
    fs.writeFileSync(svgOptimizedPath, svgOptimizedData);

    const svgRawSize = fs.statSync(svgRawPath).size;
    const svgOptimizedSize = fs.statSync(svgOptimizedPath).size;
    const svgSizeDiff = svgOptimizedSize - svgRawSize;

    console.log(`${svgRawName}: ${svgSizeDiff < 0 ? svgSizeDiff : '+'+ svgSizeDiff} bytes (size: ${svgOptimizedSize} bytes)`);

    if (svgOptimizedSize > 3000) throw new Error(`Icon "${svgRawName}" is too large.`);
  }

  fs.writeFileSync(path.normalize('./index.ts'),
`export const CDN_BASE_URL = "${cdn}";
export const SVG_MANIFEST = ${JSON.stringify(manifest)};`
  );
};

(async (): Promise<void> => {
  const cdn = 'https://cdn.ui.porsche.com/porsche-design-system/icons';
  const files = getFiles(path.normalize('./src'), '.svg');
  const config = yaml.safeLoad(fs.readFileSync(path.normalize('./.svgo.yml'), 'utf8'));

  await createManifestAndOptimizeSVG(cdn, files, config).catch(e => {
    console.error(e);
    process.exit(1);
  });
})();
