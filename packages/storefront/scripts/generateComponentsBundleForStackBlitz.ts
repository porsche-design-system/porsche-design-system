import * as fs from 'fs';
import { globbySync } from 'globby';

const frameworks = ['js', 'angular', 'react'] as const;
type Framework = (typeof frameworks)[number];

const targetPath = 'public/porsche-design-system';

fs.rmSync(targetPath, { force: true, recursive: true });

const generateComponentsBundleForStackBlitz = (framework: Framework): void => {
  const targetFile = `${targetPath}/components-${framework}.json`;
  const bundle: { [path: string]: string } = {};
  const distSubFolder = framework === 'js' ? 'components-wrapper' : `${framework}-wrapper`;

  const ignoredSubPackages = [
    'bin',
    'ssr',
    'jsdom-polyfill',
    'partials',
    'testing',
    'esm2020', // angular builds are irrelevant since the package can't be loaded from local package
    'fesm2015', // so we just initialize components-js manually
    'fesm2020',
  ];
  const files = globby
    // stackblitz doesn't use esm builds (.mjs) files, so we can ignore them
    // which also results in smaller json manifest and faster stackblitz
    .sync(`../components-${framework}/dist/${distSubFolder}/**/*.{js,cjs,d.ts,json,scss}`)
    .filter(
      (filePath) =>
        !ignoredSubPackages.some((subPackage) =>
          filePath.includes(`components-${framework}/dist/${distSubFolder}/${subPackage}`)
        )
    );

  // at least package.json is usually there
  if (files.length <= 3) {
    throw new Error(`No build found for @porsche-design-system/components-${framework}`);
  }

  for (const file of files) {
    // TODO: could get rid of whitespace
    // Define filename/path as it should be structured in StackBlitz
    const path = file.replace(
      new RegExp(`\\.\\.\\/components-${framework}\\/dist\\/${distSubFolder}`),
      `@porsche-design-system/components-${framework}`
    );
    // Update components-js package imports to local and relative ones since no components-js package will be installed from npm in StackBlitz
    bundle[path] = fs
      .readFileSync(file, 'utf8')
      .replace(
        /(?<!"name": ")@porsche-design-system\/components-js/g,
        `./${'../'.repeat((file.match(/\//g) || []).length - 3)}components-js`
      );
  }

  fs.mkdirSync(targetPath, { recursive: true });
  fs.writeFileSync(targetFile, JSON.stringify(bundle));

  console.log(`Write @porsche-design-system/components-${framework} bundle for StackBlitz into "${targetFile}"`);
};

frameworks.forEach(generateComponentsBundleForStackBlitz);
