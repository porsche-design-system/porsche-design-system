import * as fs from 'fs';
import * as path from 'path';
import * as svgo from 'svgo';
import { getFiles, toHash, toKebabCase } from './utils';

const svgOptimizer = new svgo({
  plugins: [
    {
      addAttributesToSVGElement: {
        attributes: [
          {width: '100%' /* ensures optimal scaling behaviour */},
          {height: '100%' /* ensures optimal scaling behaviour */},
          {focusable: false /* disables focus in IE11 */}
        ]
      }
    }
  ]
});

const createManifestAndOptimizeSVG = async (cdn: string, files: string[]): Promise<void> => {
  let manifest = {};

  fs.rmdirSync('./dist', { recursive: true });
  fs.mkdirSync('./dist/svg', { recursive: true });

  for (let file of files) {
    const name = path.basename(file, '.svg');

    if (name !== toKebabCase(name)) throw new Error(`Icon name "${name}" does not fit naming convention »kebab-case«.`);
    if (name in manifest) throw new Error(`Icon name "${name}" is not unique.`);

    const buffer = fs.readFileSync(file);
    const svg = (await svgOptimizer.optimize(buffer.toString())).data;
    const hash = toHash(svg);
    const filename = `${name}.min.${hash}.svg`;

    manifest[name] = filename;
    fs.writeFileSync(`./dist/svg/${filename}`, svg);
  }

  fs.writeFileSync('./dist/index.js', `
export const cdn = "${cdn}";
export const manifest = ${JSON.stringify(manifest)};
`.trim());
};

(async () => {
  const cdn = 'https://cdn.ui.porsche.com/porsche-design-system/icons';
  const files = getFiles('./src', '.svg');
  await createManifestAndOptimizeSVG(cdn, files).catch(e => {
    console.error(e);
    process.exit(1);
  });
})();
