import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';
import * as SVGO from 'svgo';
import { getFiles, toHash, toKebabCase } from './utils';

const createManifestAndOptimizeSVG = async (cdn: string, files: string[], config: SVGO.Options): Promise<void> => {
  fs.rmdirSync('./dist', {recursive: true});
  fs.mkdirSync('./dist/svg', {recursive: true});

  const manifest = {};
  const svgo = new SVGO(config);

  for (let file of files) {
    const name = path.basename(file, '.svg');

    if (name !== toKebabCase(name)) throw new Error(`Icon name "${name}" does not fit naming convention »kebab-case«.`);
    if (name in manifest) throw new Error(`Icon name "${name}" is not unique.`);

    const buffer = fs.readFileSync(file);
    const svg = (await svgo.optimize(buffer.toString())).data;
    const hash = toHash(svg);
    const filename = `${name}.min.${hash}.svg`;

    manifest[name] = filename;
    fs.writeFileSync(`./dist/svg/${filename}`, svg);
  }

  fs.writeFileSync('./dist/index.js', `
module.exports.cdn = "${cdn}";
module.exports.manifest = ${JSON.stringify(manifest)};
`.trim());
};

(async () => {
  const cdn = 'https://cdn.ui.porsche.com/porsche-design-system/icons';
  const files = getFiles('./src', '.svg');
  const config = yaml.safeLoad(fs.readFileSync('./.svgo.yml', 'utf8'));

  // build icon types
  // use hashed icons in icon.tsx
  // create json database
  // deploy icon set to cdn by ci/cd when release will be made (check if package version of pds is available on artifactory)
  // deploy json database to icon platform when release will be made (only reflects latest icons)
  await createManifestAndOptimizeSVG(cdn, files, config).catch(e => {
    console.error(e);
    process.exit(1);
  });
})();
