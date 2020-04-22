import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import * as yaml from 'js-yaml';
import SVGO = require('svgo');
import globby from 'globby';

const toHash = (str: string): string => {
  return crypto
    .createHash('md5')
    .update(str, 'utf8')
    .digest('hex');
};

const toKebabCase = (str: string): string => {
  return str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)!
    .map(x => x.toLowerCase())
    .join('-');
};

const createManifestAndOptimizeSVG = async (cdn: string, files: string[], config: SVGO.Options): Promise<void> => {
  fs.rmdirSync(path.normalize('./dist'), {recursive: true});
  fs.mkdirSync(path.normalize('./dist/icons'), {recursive: true});

  const manifest: {[key: string]: string} = {};
  const svgo = new SVGO(config);

  for (let file of files) {
    const svgRawPath = path.normalize(file);
    const svgRawName = path.basename(svgRawPath, '.svg');
    const svgRawData = fs.readFileSync(svgRawPath, 'utf8');
    const svgOptimizedData = (await svgo.optimize(svgRawData)).data;
    const svgOptimizedHash = toHash(svgOptimizedData);
    const svgOptimizedFilename = `${svgRawName}.min.${svgOptimizedHash}.svg`;
    const svgOptimizedPath = path.normalize(`./dist/icons/${svgOptimizedFilename}`);

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
`export const cdn = "${cdn}";
export const icons = ${JSON.stringify(manifest)};`
  );
};

(async (): Promise<void> => {
  const cdn = 'https://cdn.ui.porsche.com/porsche-design-system/icons';
  const files = await globby('./src/**/*.svg');
  const config = yaml.safeLoad(fs.readFileSync(path.normalize('./.svgo.yml'), 'utf8'));

  await createManifestAndOptimizeSVG(cdn, files, config).catch(e => {
    console.error(e);
    process.exit(1);
  });
})();
