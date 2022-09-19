import fs from 'fs';
import * as globby from 'globby';

const generateComponentsBundleForStackBlitz = (framework: 'js' | 'angular' | 'react'): void => {
  const targetPath = 'src/lib/porsche-design-system';
  const targetFile = `${targetPath}/components-${framework}.json`;
  const bundle: { [path: string]: string } = {};
  const files = globby.sync(`../components-${framework}/dist/components-wrapper/**/*.{js,mjs,ts,json}`);

  for (const file of files) {
    // Define filename/path as it should be structured in StackBlitz
    const path = file.replace(new RegExp(`\\.\\.\\/components-${framework}\\/dist\\/components-wrapper`), `@porsche-design-system/components-${framework}`);
    // Update components-js package imports to local and relative ones since no components-js package will be installed from npm in StackBlitz
    bundle[path] = `${fs.readFileSync(file, 'utf-8').replace(/(?<!"name": ")@porsche-design-system\/components-js/g, `./${'../'.repeat((file.match(/\//g) || []).length - 3)}components-js`)}`;
  }

  fs.mkdirSync(targetPath, {recursive: true});
  fs.writeFileSync(targetFile, JSON.stringify(bundle));

  console.log(`Write @porsche-design-system/components-${framework} bundle for StackBlitz into "${targetFile}"`);
};

generateComponentsBundleForStackBlitz('js');
generateComponentsBundleForStackBlitz('react');
generateComponentsBundleForStackBlitz('angular');
