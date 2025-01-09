import * as fs from 'fs';
import { globbySync } from 'globby';

const frameworks = ['js', 'angular', 'react', 'vue'] as const;
type Framework = (typeof frameworks)[number];

const targetPath = 'public/porsche-design-system';

fs.rmSync(targetPath, { force: true, recursive: true });

// read local file contents of components-js/angular/react/vue builds and output them in a json file per framework
// which is dynamically requested by our storefront upon clicking `Edit in StackBlitz` button and then sent
// together with the actual example code and config to StackBlitz via http POST
// this is important for local testing and issue branches, where we don't have a stable release on npm, yet
const generateComponentsBundleForStackBlitz = (framework: Framework): void => {
  const targetFile = `${targetPath}/components-${framework}.json`;
  const bundle: { [path: string]: string } = {};
  const distSubFolder = framework === 'js' ? 'components-wrapper' : `${framework}-wrapper`;

  // file size matters, if too large, stackblitz will run into a 500
  // hence, removing irrelevant sub-packages and unused builds is necessary
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

  // stackblitz with EngineBlock environment doesn't use esm builds (.mjs) files, so we can ignore them
  // which also results in smaller json manifest and faster stackblitz
  // however, vue with vite using WebContainers environment uses esm builds, therefore we have conditional globby
  // where components-js is included with cjs and mjs
  // components-vue is mjs and others are in cjs
  // https://developer.stackblitz.com/platform/api/javascript-sdk-options#projecttemplate
  const esmOrCjsFileExtension = framework === 'js' ? 'cjs,mjs' : framework === 'vue' ? 'mjs' : 'cjs';
  const files = globbySync(
    `../components-${framework}/dist/${distSubFolder}/**/*.{js,${esmOrCjsFileExtension},d.ts,json,scss,css}`
  ).filter(
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
