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
    const name = path.basename(path.normalize(file), '.svg');

    if (name !== toKebabCase(name)) throw new Error(`Icon name "${name}" does not fit naming convention »kebab-case«.`);
    if (name in manifest) throw new Error(`Icon name "${name}" is not unique.`);

    const svgRaw = fs.readFileSync(path.normalize(file), 'utf8');
    const svgOptimized = (await svgo.optimize(svgRaw)).data;
    const hash = toHash(svgOptimized);
    const filename = `${name}.min.${hash}.svg`;

    manifest[name] = filename;
    fs.writeFileSync(path.normalize(`./dist/svg/${filename}`), svgOptimized);
  }

  fs.writeFileSync(path.normalize('./index.ts'),
`export const cdn = "${cdn}";
export const svg = ${JSON.stringify(manifest)};`
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
