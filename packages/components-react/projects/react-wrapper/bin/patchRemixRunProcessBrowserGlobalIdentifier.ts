import * as path from 'path';
import * as fs from 'fs';

export const patchRemixRunProcessBrowserGlobalIdentifier = (): void => {
  const packageEntry = require.resolve('@remix-run/dev');

  const compilerDirPaths = [
    path.resolve(packageEntry, '../compiler'),
    path.resolve(packageEntry, '../compiler/js'), // since 1.16.0 the file was moved into js sub-folder
  ].filter(fs.existsSync);

  const filePaths = compilerDirPaths
    .map((compilerDirPath) => fs.readdirSync(compilerDirPath).map((fileName) => `${compilerDirPath}/${fileName}`))
    .flat()
    // file is currently called compileBrowser.js, but the other part is compilerServer.js
    // that's why we also consider compilerBrowser.js to be on the safe side
    // since 1.16.0 the file is called compiler.js
    .filter((fileName) => fileName.match(/(?:compileBrowser|compiler)\.js$/));

  filePaths.forEach((filePath) => {
    const filePathBackup = filePath.replace(/\.js$/, '-original$&');

    if (!fs.existsSync(filePathBackup)) {
      fs.copyFileSync(filePath, filePathBackup);
    } else {
      fs.copyFileSync(filePathBackup, filePath);
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');

    // we want to extend the define config
    // https://github.com/remix-run/remix/blob/main/packages/remix-dev/compiler/js/compiler.ts#L221-L226
    if (fileContent.match(/define: \{/)) {
      // prepending should be safer than appending because JSON.stringify() might be multiline like in source
      // https://github.com/remix-run/remix/blob/05ffb6e2db8f2a0e09caffad6e9b3c897c34cb7d/packages/remix-dev/compiler/compileBrowser.ts#L159-L163
      const newFileContent = fileContent.replace(
        /"process\.env\.NODE_ENV": JSON\.stringify\(.*/,
        '"process.browser": "true", // added by Porsche Design System\'s patchRemixRunProcessBrowserGlobalIdentifier.js\n      $&'
      );

      const prettyFilePath = filePath.replace(packageEntry.substring(0, packageEntry.indexOf('/node_modules')), '.');
      if (newFileContent.includes('"process.browser": "true"')) {
        console.log(`Successfully patched ${prettyFilePath}`);
      } else {
        console.error(`Patching ${prettyFilePath} failed`);
      }

      fs.writeFileSync(filePath, newFileContent);
    }
  });
};

patchRemixRunProcessBrowserGlobalIdentifier();
